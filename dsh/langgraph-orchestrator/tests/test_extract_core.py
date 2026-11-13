"""_extract_core_for_review 有损抽取单测：正常 / 缺段 fail-safe / 空。"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.api import _extract_core_for_review


NORMAL_PLAN = """---
status: draft
---

# 某计划

## 前因后果
这是很长的背景科普。它有很多句废话。目标是把某功能修好。必须保留这条约束。这里又是凑字数的背景。
这一句又是无关信息。还有更多背景描述在凑长度。禁止绕过安全门。最后一句结尾。

## 现状与证据
- api.py:100 某函数
- config.yaml:28 某字段
```python
line1
line2
line3
line4
line5
line6
line7
line8
line9
line10
line11
line12
```

## 实施方案
1. 改 api.py 第 100 行
2. 改 config.yaml 第 28 行
这里每一步都要完整保留，不能被截断。

## 风险与回滚
一堆冗长的回滚推演，应该被丢弃。

## 验证计划
- 跑 pytest
- 检查输出
验证步骤必须逐字完整保留。
"""


def test_normal_keeps_core_drops_noise():
    out, extracted = _extract_core_for_review(NORMAL_PLAN)
    assert extracted is True
    # 保留核心段
    assert "实施方案" in out
    assert "验证计划" in out
    assert "前因后果" in out
    assert "现状与证据" in out
    # 丢弃风险回滚段
    assert "风险与回滚" not in out
    # 实施方案/验证计划逐字完整
    assert "改 api.py 第 100 行" in out
    assert "跑 pytest" in out
    assert "验证步骤必须逐字完整保留。" in out


def test_code_block_truncated_to_10_lines():
    out, _ = _extract_core_for_review(NORMAL_PLAN)
    # 代码块原有 12 行，应只保留前 10 行 + 省略提示
    assert "line10" in out
    assert "line11" not in out
    assert "line12" not in out
    assert "代码块超长" in out
    # 行号证据保留
    assert "api.py:100" in out


def test_foreword_keeps_constraint_sentences():
    out, _ = _extract_core_for_review(NORMAL_PLAN)
    # 含约束关键词（必须/禁止）的句子不截
    assert "必须保留这条约束。" in out
    assert "禁止绕过安全门。" in out


def test_failsafe_missing_verify_section_sends_full():
    plan = """## 前因后果
x
## 实施方案
1. 只写方案，没有验证计划段。
"""
    out, extracted = _extract_core_for_review(plan)
    assert extracted is False
    # 退化送全文：与原计划完全一致
    assert out == plan


def test_failsafe_missing_impl_section_sends_full():
    plan = """## 前因后果
x
## 验证计划
- 跑测试
"""
    out, extracted = _extract_core_for_review(plan)
    assert extracted is False
    assert out == plan


def test_empty_plan_sends_full():
    out, extracted = _extract_core_for_review("")
    assert extracted is False
    assert out == ""


def test_h2_inside_code_block_not_split():
    plan = """## 前因后果
背景
## 实施方案
1. 改这里
```md
## 这是代码块内的假标题，不应被当作分节
content
```
## 验证计划
- pytest
"""
    out, extracted = _extract_core_for_review(plan)
    assert extracted is True
    assert "假标题" in out  # 代码块内内容作为实施方案的一部分保留
    assert "pytest" in out


if __name__ == "__main__":
    import traceback
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    ok = 0
    for fn in fns:
        try:
            fn()
            print(f"PASS {fn.__name__}")
            ok += 1
        except Exception:
            print(f"FAIL {fn.__name__}")
            traceback.print_exc()
    print(f"\n{ok}/{len(fns)} passed")
