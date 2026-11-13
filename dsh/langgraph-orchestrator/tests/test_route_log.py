"""路由日志（[ROUTE-MISS] / route_source）回归。

为什么需要路由日志而不是只看 off-task 日志：
  - off-task 的分母 = 已选中的代码类工具调用数（只看到"选中的"，看不到"没选的"）
  - 路由的分母 = 每一次规划决策（能看到"该选没选"）
若只盯 off-task，可能永远等不到样本——因为工具压根没被选中。

本文件验收：
  1. route_source 三态能区分（planner / fallback_planner / unknown_tool），不混在一起
  2. route_miss 判据保守：只在明确该用 signal 却选了 code_editor/planner 时报 MISS
  3. log_route 写出的 JSONL 能算真实命中率
  4. 兜底路径不被误计为规划器的错
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src import graph as g


# ---------- expected_tool ----------

def test_expected_signal_for_verification_words():
    assert g.expected_tool("按方案改完并跑通 pytest") == g._SIGNAL_TOOL
    assert g.expected_tool("修一下这个报错，然后自测") == g._SIGNAL_TOOL
    assert g.expected_tool("实现功能并写单测") == g._SIGNAL_TOOL


def test_expected_code_editor_for_bare_code_request():
    assert g.expected_tool("写一个反转字符串的函数") == "code_editor"


def test_expected_none_for_non_code_request():
    assert g.expected_tool("今天天气怎么样") is None
    assert g.expected_tool("") is None


# ---------- route_miss 保守性 ----------

def test_miss_when_signal_expected_but_planner_chosen():
    """这是 2026-11-13 实测撞到的真实 case：写函数+pytest 断言却被分给 planner。"""
    miss = g.route_miss("写一个函数并给出 pytest 断言", "planner", g.ROUTE_PLANNER)
    assert miss is not None
    assert miss["expected"] == g._SIGNAL_TOOL
    assert miss["got"] == "planner"


def test_miss_when_signal_expected_but_code_editor_chosen():
    miss = g.route_miss("按方案改完并跑 tests", "code_editor", g.ROUTE_PLANNER)
    assert miss is not None and miss["got"] == "code_editor"


def test_no_miss_when_correct_tool_chosen():
    assert g.route_miss("跑 pytest 验证", g._SIGNAL_TOOL, g.ROUTE_PLANNER) is None
    assert g.route_miss("写个正则", "code_editor", g.ROUTE_PLANNER) is None


def test_fallback_route_never_counts_as_miss():
    """兜底强塞 planner 不算规划器的错，否则 MISS 率会被污染。"""
    req = "跑 pytest 验证"
    assert g.route_miss(req, "planner", g.ROUTE_FALLBACK_PLANNER) is None
    assert g.route_miss(req, "planner", g.ROUTE_UNKNOWN_TOOL) is None
    assert g.route_miss(req, "planner", g.ROUTE_FORCED) is None


def test_non_code_tool_not_judged():
    """pwsh/git 等本来就不是代码生成，不该判 MISS。"""
    assert g.route_miss("跑 pytest", "pwsh", g.ROUTE_PLANNER) is None


# ---------- log_route ----------

def test_log_route_writes_jsonl(tmp_path, monkeypatch):
    log = tmp_path / "route.jsonl"
    monkeypatch.setattr(g, "_ROUTE_LOG", log)

    g.log_route(user_request="跑 pytest", chosen_tool="planner",
                route_source=g.ROUTE_PLANNER, step_count=1,
                session_id="s1", miss={"expected": g._SIGNAL_TOOL, "got": "planner"})
    g.log_route(user_request="跑 pytest", chosen_tool=g._SIGNAL_TOOL,
                route_source=g.ROUTE_PLANNER, step_count=1, session_id="s1")
    g.log_route(user_request="x", chosen_tool="planner",
                route_source=g.ROUTE_FALLBACK_PLANNER, step_count=1, session_id="s1")

    rows = [json.loads(l) for l in log.read_text(encoding="utf-8").splitlines() if l.strip()]
    assert len(rows) == 3
    assert rows[0]["miss"] is True and rows[0]["expected"] == g._SIGNAL_TOOL
    assert rows[1]["miss"] is False
    assert rows[2]["route_source"] == g.ROUTE_FALLBACK_PLANNER
    for r in rows:
        assert set(["ts", "session_id", "route_source", "chosen", "miss",
                    "steps", "request_head"]) <= set(r)


def test_log_route_never_raises(tmp_path, monkeypatch):
    bad = tmp_path / "a" / "b" / "route.jsonl"
    monkeypatch.setattr(g, "_ROUTE_LOG", bad)
    monkeypatch.setattr(g.Path, "mkdir",
                        lambda *a, **k: (_ for _ in ()).throw(OSError("boom")),
                        raising=False)
    g.log_route(user_request="x", chosen_tool="planner",
                route_source=g.ROUTE_PLANNER, step_count=1)


# ---------- 接入检查 ----------

def test_plan_node_emits_route_log_and_source():
    import inspect

    src = inspect.getsource(g.build_graph)
    assert "log_route(" in src
    assert "ROUTE-MISS" in src
    assert "route_source" in src
