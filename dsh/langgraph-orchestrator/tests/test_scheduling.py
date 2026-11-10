"""分时定价与规划质量兜底测试。

时间是系统边界：测试通过注入 now 模拟峰时/谷时，不 mock 路由器自身。
"""
import sys
from datetime import datetime
from pathlib import Path
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.config import (
    DeepSeekPeakHours,
    GatewayConfig,
    ModelSpec,
    OrchestratorConfig,
    SchedulingConfig,
    ToolSpec,
)
from src.graph import plan_needs_fallback
from src.router import ModelRouter

PEAK = datetime(2026, 11, 10, 10, 0)   # 周二 10:00，落在 09:00-12:00
OFF = datetime(2026, 11, 10, 13, 0)    # 周二 13:00，午休谷时
WEEKEND = datetime(2026, 11, 14, 10, 0)  # 周六

FLASH = "auto/deepseek-v4.1-flash"
GLM = "workbuddy/glm-5.3-flash"
HY3 = "workbuddy-ai/hy3"
CURSOR = "cursor/deepseek-v41-flash-1017"


def scheduling(**over):
    base = dict(
        deepseek_peak_hours=DeepSeekPeakHours(
            weekdays=[1, 2, 3, 4, 5],
            peak_periods=["09:00-12:00", "14:00-18:00"],
        ),
        planner_use_free_hy3=True,
        peak_use_glm_as_fallback=True,
    )
    base.update(over)
    return SchedulingConfig(**base)


def reader_cfg(sched):
    tool = ToolSpec(
        name="file_reader", description="read",
        models=[ModelSpec(model=m) for m in (FLASH, GLM, HY3, CURSOR)],
    )
    return OrchestratorConfig(
        gateway=GatewayConfig(max_retries_per_model=0),
        defaults_temperature=0.2, defaults_max_tokens=64,
        tools={"file_reader": tool},
        scheduling=sched,
    )


class RecordingClient:
    def __init__(self):
        self.calls = []

        class Completions:
            def create(_, model, messages, temperature, max_tokens, timeout):
                self.calls.append(model)
                return SimpleNamespace(
                    choices=[SimpleNamespace(message=SimpleNamespace(content=f"OK::{model}"))]
                )

        self.chat = SimpleNamespace(completions=Completions())


def effective(cfg, tool, now):
    return [m.model for m in ModelRouter(cfg)._get_effective_models(tool, now=now)]


def test_peak_skips_deepseek_flash():
    models = effective(reader_cfg(scheduling()), "file_reader", PEAK)
    assert models[0] == GLM, models
    assert FLASH not in models, models
    assert models == [GLM, HY3, CURSOR], models


def test_offpeak_keeps_original_order():
    models = effective(reader_cfg(scheduling()), "file_reader", OFF)
    assert models == [FLASH, GLM, HY3, CURSOR], models


def test_weekend_is_offpeak():
    models = effective(reader_cfg(scheduling()), "file_reader", WEEKEND)
    assert models[0] == FLASH, models


def test_strategy_off_keeps_pool_at_peak():
    models = effective(
        reader_cfg(scheduling(peak_use_glm_as_fallback=False)), "file_reader", PEAK
    )
    assert models[0] == FLASH, models


def test_run_tool_uses_glm_at_peak():
    client = RecordingClient()
    router = ModelRouter(reader_cfg(scheduling()), client=client)
    res = router.run_tool(
        "file_reader", [{"role": "user", "content": "hi"}], now=PEAK
    )
    assert res.ok and res.model_used == GLM, (res.model_used, client.calls)
    assert client.calls == [GLM], client.calls


def test_force_model_bypasses_pool():
    client = RecordingClient()
    router = ModelRouter(reader_cfg(scheduling()), client=client)
    res = router.run_tool(
        "file_reader", [{"role": "user", "content": "hi"}],
        force_model="cursor/grok-4.7@256k", now=PEAK,
    )
    assert res.model_used == "cursor/grok-4.7@256k", res.model_used
    assert client.calls == ["cursor/grok-4.7@256k"], client.calls


def test_plan_fallback_triggers():
    assert plan_needs_fallback("", [], "改一下文案") is True          # 解析失败
    assert plan_needs_fallback("[not json", [], "任务") is True       # 解析失败
    assert plan_needs_fallback("[]", [], "任务") is True               # 0 步
    hard = "这个死锁问题需要深度推理"
    assert plan_needs_fallback(
        '[{"tool":"file_reader","instruction":"x"}]',
        [{"tool": "file_reader", "instruction": "x"}],
        hard,
    ) is True
    assert plan_needs_fallback(
        '[{"tool":"file_reader","instruction":"x"}]',
        [{"tool": "file_reader", "instruction": "x"}],
        "读一下 README",
    ) is False


def main():
    tests = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    for t in tests:
        t()
        print(f"[PASS] {t.__name__}")
    print(f"\nALL {len(tests)} SCHEDULING TESTS PASSED")


if __name__ == "__main__":
    main()
