"""故障转移单元测试：用假的 OpenAI 客户端模拟主模型失败 -> 备用接管。"""
import sys
from pathlib import Path
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.config import GatewayConfig, ModelSpec, OrchestratorConfig, ToolSpec
from src.router import ModelRouter


class FakeCompletions:
    """按脚本化行为返回或抛错。behaviors: {model: "ok" | "raise" | "empty"}"""
    def __init__(self, behaviors):
        self.behaviors = behaviors
        self.calls = []

    def create(self, model, messages, temperature, max_tokens, timeout):
        self.calls.append(model)
        b = self.behaviors.get(model, "ok")
        if b == "raise":
            raise RuntimeError("simulated 502 upstream down")
        content = "" if b == "empty" else f"ANSWER_FROM::{model}"
        return SimpleNamespace(
            choices=[SimpleNamespace(message=SimpleNamespace(content=content))]
        )


class FakeClient:
    def __init__(self, behaviors):
        self.chat = SimpleNamespace(completions=FakeCompletions(behaviors))


def make_cfg(models):
    tool = ToolSpec(
        name="t", description="test",
        models=[ModelSpec(model=m) for m in models],
    )
    return OrchestratorConfig(
        gateway=GatewayConfig(max_retries_per_model=0, failure_cooldown=600),
        defaults_temperature=0.2, defaults_max_tokens=64,
        tools={"t": tool},
    )


def run_case(name, behaviors, expect_model, expect_ok=True):
    cfg = make_cfg(["primary", "backup1", "backup2"])
    client = FakeClient(behaviors)
    router = ModelRouter(cfg, client=client)
    res = router.run_tool("t", [{"role": "user", "content": "hi"}])
    status = "PASS" if (res.ok == expect_ok and res.model_used == expect_model) else "FAIL"
    print(f"[{status}] {name}: used={res.model_used} ok={res.ok} calls={client.chat.completions.calls}")
    assert status == "PASS", f"{name} expected {expect_model}/{expect_ok}, got {res.model_used}/{res.ok}"


def main():
    # 1) 主模型正常
    run_case("primary ok", {"primary": "ok"}, "primary")
    # 2) 主模型抛错 -> 备1 接管
    run_case("primary raise -> backup1", {"primary": "raise", "backup1": "ok"}, "backup1")
    # 3) 主模型返回空 -> 备1 接管
    run_case("primary empty -> backup1", {"primary": "empty", "backup1": "ok"}, "backup1")
    # 4) 主+备1 都挂 -> 备2 接管
    run_case("two down -> backup2",
             {"primary": "raise", "backup1": "empty", "backup2": "ok"}, "backup2")
    # 5) 全挂 -> ok=False
    run_case("all down", {"primary": "raise", "backup1": "raise", "backup2": "raise"},
             None, expect_ok=False)
    print("\nALL ROUTER TESTS PASSED")


if __name__ == "__main__":
    main()
