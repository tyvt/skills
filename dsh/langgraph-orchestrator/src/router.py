"""模型路由器：按工具的模型池执行调用，主模型失败自动降级到备用。

核心能力：
  - 有序模型池：主 -> 备1 -> 备2 ...
  - 每个模型内部重试(指数退避)
  - 命中 retry_on 关键字 / 空回复 / 异常 -> 判定失败，切下一个模型
  - 失败冷却：某模型失败后，在 failure_cooldown 秒内优先排到池尾(避免反复踩同一个坏模型)
  - 全程记录尝试轨迹(trace)，便于观测与测试
"""
from __future__ import annotations

import sys
import time
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Dict, List, Optional

from openai import OpenAI

from .config import ModelSpec, OrchestratorConfig, ToolSpec

# 峰时降级只作用于这两个工具；其余工具保持配置顺序。
PEAK_GLM_TOOLS = {"file_reader", "code_editor"}
DEEPSEEK_FLASH = "deepseek-v4.1-flash"
GLM_FLASH = "glm-5.3-flash"


@dataclass
class Attempt:
    model: str
    ok: bool
    elapsed: float
    error: Optional[str] = None
    answered: bool = False


@dataclass
class Usage:
    """单次成功调用的 token 用量。网关不返回 usage 时全部为 None，不要用 0 冒充。"""
    prompt_tokens: Optional[int] = None
    completion_tokens: Optional[int] = None
    total_tokens: Optional[int] = None

    def as_dict(self) -> Dict[str, Optional[int]]:
        return {
            "prompt_tokens": self.prompt_tokens,
            "completion_tokens": self.completion_tokens,
            "total_tokens": self.total_tokens,
        }


@dataclass
class ToolResult:
    tool: str
    ok: bool
    content: str
    model_used: Optional[str]
    attempts: List[Attempt] = field(default_factory=list)
    usage: Optional[Usage] = None

    @property
    def failed_models(self) -> List[str]:
        return [a.model for a in self.attempts if not a.ok]


class ModelRouter:
    def __init__(self, cfg: OrchestratorConfig, client: Optional[OpenAI] = None):
        self.cfg = cfg
        self._client = client or OpenAI(
            base_url=cfg.gateway.base_url,
            api_key=cfg.gateway.api_key,
            timeout=cfg.gateway.request_timeout,
            max_retries=0,  # 重试由本路由器控制，避免 SDK 与业务重试叠加
        )
        # model_id -> 冷却截止时间戳
        self._cooldown: Dict[str, float] = {}

    # ------------------------------------------------------------------ #
    # 内部工具
    # ------------------------------------------------------------------ #
    @staticmethod
    def _parse_hhmm(text: str):
        hour, minute = text.split(":")
        return int(hour) * 60 + int(minute)

    def _is_deepseek_peak_time(self, now: Optional[datetime] = None) -> bool:
        """当前是否处于配置的 DeepSeek 峰时(本地时间)。"""
        peak = self.cfg.scheduling.deepseek_peak_hours
        now = now or datetime.now()
        if now.isoweekday() not in peak.weekdays:
            return False
        minutes = now.hour * 60 + now.minute
        for period in peak.peak_periods:
            start, end = period.split("-")
            if self._parse_hhmm(start) <= minutes < self._parse_hhmm(end):
                return True
        return False

    def _get_effective_models(
        self, tool_name: str, now: Optional[datetime] = None
    ) -> List[ModelSpec]:
        """返回本次调用实际使用的模型池。

        峰时且策略开启时，file_reader / code_editor 跳过 deepseek-v4.1-flash，
        并把 glm-5.3-flash 提到队首；谷时保持配置原序。
        """
        tool = self.cfg.tool(tool_name)
        models = list(tool.models)
        sched = self.cfg.scheduling
        if not (
            sched.peak_use_glm_as_fallback
            and tool_name in PEAK_GLM_TOOLS
            and self._is_deepseek_peak_time(now)
        ):
            return models
        kept = [m for m in models if DEEPSEEK_FLASH not in m.model]
        glm = [m for m in kept if GLM_FLASH in m.model]
        rest = [m for m in kept if GLM_FLASH not in m.model]
        return (glm + rest) or models

    def _ordered_pool(self, tool: ToolSpec) -> List[ModelSpec]:
        """把处于冷却期的模型排到队尾，但不剔除(允许兜底)。"""
        now = time.time()
        hot, cold = [], []
        for m in tool.models:
            if now < self._cooldown.get(m.model, 0):
                cold.append(m)
            else:
                hot.append(m)
        return hot + cold

    def _mark_failure(self, model: str) -> None:
        self._cooldown[model] = time.time() + self.cfg.gateway.failure_cooldown

    def _mark_success(self, model: str) -> None:
        self._cooldown.pop(model, None)

    def _looks_failed(self, content: str, retry_on: List[str]) -> bool:
        """内容为空，或命中失败关键字 -> 视为失败。"""
        if content is None or not content.strip():
            return True
        low = content.lower()
        return any(k.lower() in low for k in retry_on)

    def _call_once(
        self,
        client: OpenAI,
        model: str,
        messages: List[Dict[str, Any]],
        temperature: float,
        max_tokens: int,
        timeout: float,
    ) -> tuple:
        resp = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            timeout=timeout,
        )
        u = getattr(resp, "usage", None)
        usage = Usage(
            prompt_tokens=getattr(u, "prompt_tokens", None),
            completion_tokens=getattr(u, "completion_tokens", None),
            total_tokens=getattr(u, "total_tokens", None),
        ) if u is not None else None
        if usage is not None:
            print(
                f"[usage] model={model} prompt={usage.prompt_tokens} "
                f"completion={usage.completion_tokens} total={usage.total_tokens}",
                file=sys.stderr,
                flush=True,
            )
        return (resp.choices[0].message.content or ""), usage

    # ------------------------------------------------------------------ #
    # 对外主入口
    # ------------------------------------------------------------------ #
    def run_tool(
        self,
        tool_name: str,
        messages: List[Dict[str, Any]],
        force_model: Optional[str] = None,
        now: Optional[datetime] = None,
    ) -> ToolResult:
        """用指定工具的模型池执行一次对话补全，自动故障转移。

        force_model 给定时只调用该模型(规划质量兜底用)，不走池与降级。
        now 仅供测试注入时间；生产路径留空即取本地当前时间。
        """
        tool = self.cfg.tool(tool_name)
        attempts: List[Attempt] = []

        pool = self._get_effective_models(tool_name, now=now)
        if force_model:
            match = next((m for m in tool.models if m.model == force_model), None)
            pool = [match or ModelSpec(model=force_model)]
        now_ts = time.time()
        hot = [m for m in pool if now_ts >= self._cooldown.get(m.model, 0)]
        cold = [m for m in pool if m not in hot]

        for spec in hot + cold:
            temperature = (
                spec.temperature
                if spec.temperature is not None
                else (tool.temperature if tool.temperature is not None else self.cfg.defaults_temperature)
            )
            max_tokens = (
                spec.max_tokens
                if spec.max_tokens is not None
                else (tool.max_tokens if tool.max_tokens is not None else self.cfg.defaults_max_tokens)
            )
            timeout = spec.timeout or tool.timeout or self.cfg.gateway.request_timeout
            retry_on = spec.effective_retry_on()

            for retry in range(self.cfg.gateway.max_retries_per_model + 1):
                t0 = time.time()
                try:
                    content, usage = self._call_once(
                        self._client, spec.model, messages, temperature, max_tokens, timeout
                    )
                    elapsed = time.time() - t0
                    if self._looks_failed(content, retry_on):
                        raise RuntimeError(f"判定失败(空回复或命中 retry_on): {content[:60]!r}")
                    attempts.append(Attempt(spec.model, True, elapsed, answered=True))
                    self._mark_success(spec.model)
                    return ToolResult(
                        tool=tool_name, ok=True, content=content,
                        model_used=spec.model, attempts=attempts, usage=usage,
                    )
                except Exception as e:  # noqa: BLE001 —— 任一异常都视为本模型失败
                    elapsed = time.time() - t0
                    attempts.append(Attempt(spec.model, False, elapsed, error=str(e)[:200]))
                    if retry < self.cfg.gateway.max_retries_per_model:
                        time.sleep(min(2 ** retry, 4))  # 指数退避
            # 该模型内部重试仍失败 -> 冷却并切下一个模型
            self._mark_failure(spec.model)

        # 整个池子都失败
        return ToolResult(
            tool=tool_name, ok=False,
            content=f"所有候选模型均失败: {[a.model for a in attempts]}",
            model_used=None, attempts=attempts,
        )
