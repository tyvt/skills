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
class OrchestratorConfig:
    gateway: GatewayConfig
    defaults_temperature: float
    defaults_max_tokens: int
    tools: Dict[str, ToolSpec]

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
        if not models:
            raise ValueError(f"工具 {name!r} 未配置任何模型")
        tools[name] = ToolSpec(
            name=name,
            description=t.get("description", ""),
            models=models,
            temperature=t.get("temperature"),
            max_tokens=t.get("max_tokens"),
        )

    return OrchestratorConfig(
        gateway=gateway,
        defaults_temperature=dt,
        defaults_max_tokens=dm,
        tools=tools,
    )
