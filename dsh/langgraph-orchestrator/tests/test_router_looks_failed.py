"""router._looks_failed 回归：retry_on 关键字不得误判正常长文本（含 plan_review JSON）。

复现 bug：plan_review 审核 JSON 文本里含 "not available"/"timeout" 等词时，
旧实现整段子串匹配把有效回复判为失败，导致整池 ok:false / model_used=None。
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.router import RETRY_KEYWORD_MAX_LEN, ModelRouter
from src.config import DEFAULT_RETRY_ON


def _looks_failed(content):
    # 直接调静态语义（实例方法不依赖实例状态以外的东西）：用一个最小壳对象。
    return ModelRouter._looks_failed(object.__new__(ModelRouter), content, DEFAULT_RETRY_ON)


def test_long_json_with_keywords_not_failed():
    # 正常审核 JSON，长文本、含 "not available" 与 "timeout" -> 不应判失败
    content = (
        '{"verdict":"reject","score":0,"issues":['
        '{"level":"P0","text":"上游 not available，且 timeout 过短"}],'
        '"suggestions":["补充 not available 的兜底与 timeout 处理"],'
        '"summary":"' + "x" * 400 + '"}'
    )
    assert len(content) > RETRY_KEYWORD_MAX_LEN
    assert _looks_failed(content) is False


def test_short_error_body_failed():
    # DEFAULT_RETRY_ON 实际含 timeout / 502 / 429 等；"not available" 不在默认集，
    # 它由网关非 2xx 触发 SDK 异常被 except 捕获，不依赖关键字匹配。
    assert _looks_failed("request timeout") is True
    assert _looks_failed("502 bad gateway") is True
    assert _looks_failed("429 too many requests") is True
    assert _looks_failed("rate limit exceeded") is True


def test_empty_failed():
    assert _looks_failed("") is True
    assert _looks_failed("   ") is True


def test_short_normal_answer_not_failed():
    assert _looks_failed('{"verdict":"pass","score":90}') is False
