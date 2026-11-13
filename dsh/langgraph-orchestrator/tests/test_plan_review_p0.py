"""plan_review「仅 P0 阻断」归一化单元测试。

覆盖：P1/P2-only -> pass、含 P0 -> reject、混合等级、旧字符串格式、非 JSON fail-safe、
score 不参与判定。纯 assert，不依赖 pytest fixture（本机 pytest 采集器异常时也可直接运行）。
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.api import _normalize_review


def test_p1_p2_only_pass():
    obj = {"verdict": "reject", "score": 55, "issues": [
        {"level": "P1", "text": "验证偏弱"}, {"level": "P2", "text": "措辞可优化"}]}
    r = _normalize_review(obj, "")
    assert r["verdict"] == "pass", r
    assert r["p0_count"] == 0
    assert len(r["issues"]) == 2


def test_with_p0_reject():
    obj = {"verdict": "pass", "score": 90, "issues": [
        {"level": "P0", "text": "缺关键依赖必然失败"}]}
    r = _normalize_review(obj, "")
    assert r["verdict"] == "reject", r
    assert r["p0_count"] == 1


def test_mixed_levels():
    obj = {"issues": [
        {"level": "P1", "text": "a"}, {"level": "P0", "text": "b"}, {"level": "P2", "text": "c"}]}
    r = _normalize_review(obj, "")
    assert r["verdict"] == "reject"
    assert r["p0_count"] == 1
    assert len(r["issues"]) == 3  # P1/P2 仍保留展示


def test_legacy_string_issues_default_p1():
    obj = {"verdict": "reject", "issues": ["只是建议", "可优化"]}
    r = _normalize_review(obj, "")
    assert r["verdict"] == "pass", r
    assert all(i["level"] == "P1" for i in r["issues"])


def test_non_json_failsafe_reject():
    r = _normalize_review(None, "模型胡说八道")
    assert r["verdict"] == "reject"
    assert r["p0_count"] >= 1


def test_score_does_not_affect_verdict():
    obj = {"verdict": "reject", "score": 30, "issues": [{"level": "P2", "text": "小问题"}]}
    r = _normalize_review(obj, "")
    assert r["verdict"] == "pass", r  # 无 P0，score=30 也不 reject


if __name__ == "__main__":
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_") and callable(v)]
    fails = 0
    for fn in fns:
        try:
            fn()
            print(f"PASS {fn.__name__}")
        except AssertionError as e:
            fails += 1
            print(f"FAIL {fn.__name__}: {e}")
    print(f"\n{len(fns) - fails}/{len(fns)} passed")
    sys.exit(1 if fails else 0)
