"""模型路由器：按工具的模型池执行调用，主模型失败自动降级到备用。

核心能力：
  - 有序模型池：主 -> 备1 -> 备2 ...
  - 每个模型内部重试(指数退避)
  - 命中 retry_on 关键字 / 空回复 / 异常 -> 判定失败，切下一个模型
  - 失败冷却：某模型失败后，在 failure_cooldown 秒内优先排到池尾(避免反复踩同一个坏模型)
  - 全程记录尝试轨迹(trace)，便于观测与测试
"""
from __future__ import annotations

import time
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

from openai import OpenAI

from .config import ModelSpec, OrchestratorConfig, ToolSpec


@dataclass
class Attempt:
    model: str
    ok: bool
    elapsed: float
    error: Optional[str] = None
    answered: bool = False


@dataclass
class ToolResult:
    tool: str
    ok: bool
    content: str
    model_used: Optional[str]
    attempts: List[Attempt] = field(default_factory=list)

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
    ) -> str:
        resp = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            timeout=timeout,
        )
        return resp.choices[0].message.content or ""

    # ------------------------------------------------------------------ #
    # 对外主入口
    # ------------------------------------------------------------------ #
    def run_tool(
        self,
        tool_name: str,
        messages: List[Dict[str, Any]],
    ) -> ToolResult:
        """用指定工具的模型池执行一次对话补全，自动故障转移。"""
        tool = self.cfg.tool(tool_name)
        attempts: List[Attempt] = []

        for spec in self._ordered_pool(tool):
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
                    content = self._call_once(
                        self._client, spec.model, messages, temperature, max_tokens, timeout
                    )
                    elapsed = time.time() - t0
                    if self._looks_failed(content, retry_on):
                        raise RuntimeError(f"判定失败(空回复或命中 retry_on): {content[:60]!r}")
                    attempts.append(Attempt(spec.model, True, elapsed, answered=True))
                    self._mark_success(spec.model)
                    return ToolResult(
                        tool=tool_name, ok=True, content=content,
                        model_used=spec.model, attempts=attempts,
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
