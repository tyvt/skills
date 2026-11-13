"""off-task 检测与触发率日得回归。

背景：composer-2.5 在 code_edit_with_signal 首次冒烟中输出了与提问无关的博客成稿，
并凭空编造项目路径。重放 11 次全部 on-task，无法靠参数复现，所以靠日志在真实流量上统计。

本文件验收三件事：
  1. 检测器能认出 golden 偏题样本，且不误伤正常代码输出（保守正则、零误报）
  2. log_offtask 写出的 JSONL 字段可算触发率（hit / tool / model / chars）
  3. 只在代码类工具上记录，摘要类不记录
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src import graph as g

GOLDEN = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "..", "..", "cursor-model-routing", "results", "offtask-golden-composer-20261113.txt",
)


# ---------- 检测器 ----------

def test_detects_golden_offtask_sample():
    """人工确认的偏题样本必须命中（否则整个统计无意义）。"""
    path = os.path.normpath(GOLDEN)
    assert os.path.exists(path), f"golden 样本不存在: {path}"
    with open(path, encoding="utf-8") as f:
        text = f.read()
    matched = g.detect_offtask(text)
    assert matched, "golden 偏题样本未被识别"


def test_no_false_positive_on_normal_code():
    """正常代码输出不得误报（误报会抬高重跑率，比漏检更伤）。"""
    normal = [
        "def add(a, b):\n    return a + b\n\n\ndef test_add():\n    assert add(2, 3) == 5",
        "**`dict[key]` 在键不存在时抛 KeyError；`dict.get(k, d)` 返回默认值。**",
        "请把下面这段代码里的循环改成推导式。",
        "class Foo:\n    def bar(self):\n        return 42",
        "```python\nimport pytest\n```",
    ]
    for text in normal:
        assert g.detect_offtask(text) is None, f"误报了正常输出: {text[:60]!r}"


def test_empty_and_none_are_safe():
    assert g.detect_offtask("") is None
    assert g.detect_offtask(None) is None


def test_pattern_is_case_insensitive():
    """模型可能改写大小写，不能因此漏检。"""
    assert g.detect_offtask("written in MIKE DANE style") is not None
    assert g.detect_offtask("using blog_skill") is not None


# ---------- 日志 ----------

def test_log_offtask_writes_jsonl(tmp_path, monkeypatch):
    """写出的行要能算触发率：hit/tool/model/chars 必须齐。"""
    log = tmp_path / "offtask.jsonl"
    monkeypatch.setattr(g, "_OFFTASK_LOG", log)

    g.log_offtask(tool="code_edit_with_signal", model="cursor/composer-2.5",
                  matched="Mike Dane", content="x" * 500, instruction="do it",
                  session_id="s1")
    g.log_offtask(tool="code_editor", model="workbuddy/glm-5.3-flash",
                  matched=None, content="def f(): pass", instruction="g",
                  session_id="s1")

    rows = [json.loads(l) for l in log.read_text(encoding="utf-8").splitlines() if l.strip()]
    assert len(rows) == 2
    assert rows[0]["hit"] is True and rows[0]["matched"] == "Mike Dane"
    assert rows[1]["hit"] is False
    for r in rows:
        assert set(["ts", "session_id", "tool", "model", "hit", "chars", "head"]) <= set(r)
        assert r["chars"] > 0


def test_log_offtask_skips_non_code_tools(tmp_path, monkeypatch):
    """摘要类工具不记录，避免稀释分母。"""
    log = tmp_path / "offtask.jsonl"
    monkeypatch.setattr(g, "_OFFTASK_LOG", log)
    g.log_offtask(tool="file_reader", model="auto/deepseek-v4.1-flash",
                  matched=None, content="summary", instruction="x")
    assert not log.exists()


def test_log_offtask_never_raises(tmp_path, monkeypatch):
    """观测日志写入失败绝不能阻断业务。"""
    bad = tmp_path / "nodir" / "x" / "offtask.jsonl"
    monkeypatch.setattr(g, "_OFFTASK_LOG", bad)
    # 把 mkdir 弄成必失败，验证异常被吃掉
    monkeypatch.setattr(g.Path, "mkdir", lambda *a, **k: (_ for _ in ()).throw(OSError("boom")), raising=False)
    g.log_offtask(tool="code_editor", model="m", matched=None, content="c", instruction="i")


# ---------- 接入检查 ----------

def test_execute_node_calls_detect_and_log():
    """确保执行节点真的接上了检测+日志，而不是只定义了函数。"""
    import inspect

    src = inspect.getsource(g.build_graph)
    assert "detect_offtask(" in src
    assert "log_offtask(" in src
    assert "[OFFTASK]" in src
