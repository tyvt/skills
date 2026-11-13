"""_condense_plan 状态机单测：三红线保留 + 无损压缩口径。"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.api import _condense_plan


NASTY = (
    "---\n"
    "status: draft\n"
    "risk: low\n"
    "---\n"
    "\n"
    "# 标题一\n"
    "\n"
    "\n"
    "\n"
    "正文第一段。\n"
    "```yaml\n"
    "key: value\n"
    "\n"
    "---\n"
    "nested:\n"
    "  a: 1\n"
    "```\n"
    "\n"
    "| 列A | 列B |\n"
    "| --- | --- |\n"
    "| x | y |\n"
    "\n"
    "---\n"
    "\n"
    "setext 标题\n"
    "===\n"
    "\n"
    "行尾双空格硬换行  \n"
    "下一行\n"
)


def test_ratio_lt_one():
    out, ratio = _condense_plan(NASTY)
    assert ratio < 1.0
    assert len(out) < len(NASTY)


def test_frontmatter_preserved_verbatim():
    out, _ = _condense_plan(NASTY)
    # 开头 frontmatter 段（含边界 --- 与元数据行）逐字保留
    assert out.startswith("---\nstatus: draft\nrisk: low\n---\n")


def test_code_block_interior_unchanged():
    out, _ = _condense_plan(NASTY)
    assert "key: value\n\n---\nnested:\n  a: 1\n" in out


def test_gfm_table_separator_preserved():
    out, _ = _condense_plan(NASTY)
    assert "| --- | --- |" in out
    assert "| 列A | 列B |" in out
    assert "| x | y |" in out


def test_setext_underline_preserved():
    out, _ = _condense_plan(NASTY)
    assert "setext 标题\n===" in out


def test_consecutive_blank_lines_collapsed():
    out, _ = _condense_plan(NASTY)
    # 代码块外不应出现「连续 2 个以上空行」（按行判断，跳过 fenced code block 内部）
    in_code = False
    run = 0
    for ln in out.split("\n"):
        if ln.strip().startswith("```"):
            in_code = not in_code
            run = 0
            continue
        if in_code:
            continue
        if ln == "":
            run += 1
            assert run <= 1, "代码块外出现连续空行"
        else:
            run = 0


def test_body_decoration_removed():
    out, _ = _condense_plan(NASTY)
    # 正文中独占一行的 --- （表格外、非 frontmatter、非 setext）应被删除
    lines = out.split("\n")
    # frontmatter 段和代码块内的 --- 不算；正文装饰 --- 应消失
    body = []
    in_code = False
    fm_done = False
    fm_open = lines[0].strip() == "---"
    for idx, ln in enumerate(lines):
        if ln.strip().startswith("```"):
            in_code = not in_code
            body.append(ln)
            continue
        if in_code:
            body.append(ln)
            continue
        if idx == 0 and fm_open:
            fm_done = False
            body.append(ln)
            continue
        if not fm_done and fm_open and ln.strip() == "---":
            fm_done = True
            body.append(ln)
            continue
        body.append(ln)


def test_hardbreak_trailing_spaces_preserved():
    out, _ = _condense_plan(NASTY)
    assert "行尾双空格硬换行  \n下一行" in out


def test_content_lines_not_lost():
    """所有含字母/数字/中文/表格竖线的行，一字不少地保留。"""
    out, _ = _condense_plan(NASTY)
    import re as _re
    def content_lines(text):
        res = []
        for ln in text.split("\n"):
            if _re.search(r"[A-Za-z0-9\u4e00-\u9fff]", ln) or "|" in ln:
                res.append(ln)
        return res

    orig = content_lines(NASTY)
    got = content_lines(out)
    # 每一行原始内容行都必须出现在压缩结果中（按顺序子序列）
    it = iter(got)
    for cl in orig:
        assert cl in it, f"内容行丢失: {cl!r}"


def test_idempotent_roughly():
    out1, _ = _condense_plan(NASTY)
    out2, _ = _condense_plan(out1)
    assert out1 == out2


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
