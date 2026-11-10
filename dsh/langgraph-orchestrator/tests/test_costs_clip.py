import json

from src.api import _append_costs
from src.graph import _clip, _extract_json_array


def test_clip_keeps_head_and_tail():
    text = "H" * 2000 + "M" * 100 + "T" * 2000
    out = _clip(text, 2000, 2000)
    assert out.startswith("H" * 2000)
    assert out.endswith("T" * 2000)
    assert "已截断" in out
    assert _clip("short", 2000, 2000) == "short"


def test_plan_extract_still_parses_bare_json():
    raw = '[{"tool":"pwsh","instruction":"dir"},{"tool":"file_reader","instruction":"sum"}]'
    assert len(_extract_json_array(raw)) == 2


def test_append_costs_jsonl(tmp_path, monkeypatch):
    monkeypatch.setattr("src.api._STORE", tmp_path)
    _append_costs("sess-12345678", [{
        "role": "plan", "tool": "planner", "model": "openrouter/tencent/hy3-preview:free",
        "ok": True, "elapsed": 1.2,
        "usage": {"prompt_tokens": 10, "completion_tokens": 4, "total_tokens": 14},
    }])
    lines = (tmp_path / "sess-12345678.costs.jsonl").read_text(encoding="utf-8").splitlines()
    row = json.loads(lines[0])
    assert row["role"] == "plan"
    assert row["usage"]["completion_tokens"] == 4
