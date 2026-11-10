"""配置加载与数据模型。YAML -> 强类型 dataclass。"""
from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Dict, List, Optional

import yaml

# 默认在「模型返回空回复」时视为失败并降级（对应 magpie 502 empty reply 场景）
DEFAULT_RETRY_ON: List[str] = [
    "empty reply",
    "502",
    "503",
    "429",
    "rate limit",
    "timeout",
    "connection error",
]


@dataclass
class ModelSpec:
    model: str
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    timeout: Optional[float] = None
    weight: float = 1.0
    retry_on: List[str] = field(default_factory=list)

    def effective_retry_on(self) -> List[str]:
        return self.retry_on or DEFAULT_RETRY_ON


@dataclass
class ToolSpec:
    name: str
    description: str
    models: List[ModelSpec]
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    # 工具级超时(秒)：该工具下所有模型默认用它，模型条目可再单独覆盖。
    # 未设置时回落到 gateway.request_timeout。
    timeout: Optional[float] = None
    local: bool = False

    def model_ids(self) -> List[str]:
        return [m.model for m in self.models]


@dataclass
class GatewayConfig:
    base_url: str = "http://127.0.0.1:3425/v1"
    api_key: str = "magpie"
    request_timeout: float = 120.0
    max_retries_per_model: int = 1
    failure_cooldown: float = 600.0


@dataclass
class SecurityConfig:
    guard_tool: str = "security_guard"
    fast_guard_tool: str = ""
    guarded_tools: List[str] = field(default_factory=lambda: ["pwsh", "db_write"])
    deny_regex: List[str] = field(default_factory=list)


@dataclass
class ExecutionConfig:
    mock_execution: bool = True
    pwsh_timeout: float = 30.0


@dataclass
class DeepSeekPeakHours:
    """DeepSeek 峰时窗口。weekdays 为 ISO 编号(周一=1 ... 周日=7)。"""
    weekdays: List[int] = field(default_factory=lambda: [1, 2, 3, 4, 5])
    peak_periods: List[str] = field(
        default_factory=lambda: ["09:00-12:00", "14:00-18:00"]
    )


@dataclass
class SchedulingConfig:
    """分时定价调度策略。"""
    deepseek_peak_hours: DeepSeekPeakHours = field(default_factory=DeepSeekPeakHours)
    planner_use_free_hy3: bool = False
    peak_use_glm_as_fallback: bool = False


@dataclass
class OrchestratorConfig:
    gateway: GatewayConfig
    defaults_temperature: float
    defaults_max_tokens: int
    tools: Dict[str, ToolSpec]
    security: SecurityConfig = field(default_factory=SecurityConfig)
    execution: ExecutionConfig = field(default_factory=ExecutionConfig)
    scheduling: SchedulingConfig = field(default_factory=SchedulingConfig)

    def tool(self, name: str) -> ToolSpec:
        if name not in self.tools:
            raise KeyError(f"未定义的工具: {name!r}. 可选: {list(self.tools)}")
        return self.tools[name]


def load_config(path: str) -> OrchestratorConfig:
    """从 YAML 文件加载编排配置。"""
    path = os.path.abspath(path)
    with open(path, "r", encoding="utf-8") as f:
        raw = yaml.safe_load(f)

    gw_raw = raw.get("gateway", {}) or {}
    gateway = GatewayConfig(
        base_url=gw_raw.get("base_url", "http://127.0.0.1:3425/v1"),
        api_key=gw_raw.get("api_key", "magpie"),
        request_timeout=float(gw_raw.get("request_timeout", 120)),
        max_retries_per_model=int(gw_raw.get("max_retries_per_model", 1)),
        failure_cooldown=float(gw_raw.get("failure_cooldown", 600)),
    )

    defaults = raw.get("defaults", {}) or {}
    dt = float(defaults.get("temperature", 0.2))
    dm = int(defaults.get("max_tokens", 2048))

    tools: Dict[str, ToolSpec] = {}
    for name, t in (raw.get("tools", {}) or {}).items():
        models = []
        for m in t.get("models", []):
            if isinstance(m, str):
                m = {"model": m}
            models.append(
                ModelSpec(
                    model=m["model"],
                    temperature=m.get("temperature"),
                    max_tokens=m.get("max_tokens"),
                    timeout=m.get("timeout"),
                    weight=float(m.get("weight", 1.0)),
                    retry_on=list(m.get("retry_on", [])),
                )
            )
        local = bool(t.get("local", False))
        if not models and not local:
            raise ValueError(f"工具 {name!r} 未配置任何模型")
        tools[name] = ToolSpec(
            name=name,
            description=t.get("description", ""),
            models=models,
            temperature=t.get("temperature"),
            max_tokens=t.get("max_tokens"),
            timeout=t.get("timeout"),
            local=local,
        )

    sec_raw = raw.get("security", {}) or {}
    security = SecurityConfig(
        guard_tool=str(sec_raw.get("guard_tool", "security_guard")),
        fast_guard_tool=str(sec_raw.get("fast_guard_tool", "")),
        guarded_tools=list(sec_raw.get("guarded_tools", ["pwsh", "db_write"])),
        deny_regex=list(sec_raw.get("deny_regex", [])),
    )

    ex_raw = raw.get("execution", {}) or {}
    execution = ExecutionConfig(
        mock_execution=bool(ex_raw.get("mock_execution", True)),
        pwsh_timeout=float(ex_raw.get("pwsh_timeout", 30)),
    )

    sch_raw = raw.get("scheduling", {}) or {}
    peak_raw = sch_raw.get("deepseek_peak_hours", {}) or {}
    strat = sch_raw.get("strategies", {}) or {}
    scheduling = SchedulingConfig(
        deepseek_peak_hours=DeepSeekPeakHours(
            weekdays=[int(d) for d in peak_raw.get("weekdays", [1, 2, 3, 4, 5])],
            peak_periods=[str(p) for p in peak_raw.get(
                "peak_periods", ["09:00-12:00", "14:00-18:00"]
            )],
        ),
        planner_use_free_hy3=bool(strat.get("planner_use_free_hy3", False)),
        peak_use_glm_as_fallback=bool(strat.get("peak_use_glm_as_fallback", False)),
    )

    return OrchestratorConfig(
        gateway=gateway,
        defaults_temperature=dt,
        defaults_max_tokens=dm,
        tools=tools,
        security=security,
        execution=execution,
        scheduling=scheduling,
    )
