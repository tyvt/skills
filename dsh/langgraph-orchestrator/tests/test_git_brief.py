"""Git 摘要截断与冲突只回文件名。不调网关。"""
from src.graph import format_git_report, _sanitize_git_text


def test_status_and_diff_over_20_lines_truncated():
    status = "\n".join(f" M f{i}.txt" for i in range(15))
    diff = "\n".join(f" f{i}.txt | {i}" for i in range(15)) + "\n 15 files changed"
    out = format_git_report(status, diff)
    assert len(out.splitlines()) == 20
    assert out.splitlines()[-1].startswith("...[截断")
    assert "git status --short" in out
    assert "git diff --stat" in out


def test_rebase_conflict_returns_names_only():
    status = "UU src/a.py\nM  src/ok.py\nAA src/b.py"
    advice = "hint: Resolve all conflicts manually, mark them as resolved with git add."
    out = format_git_report(status + "\n" + advice, "huge diff", rebase=True)
    assert out.splitlines()[0] == "Conflict detected"
    assert "src/a.py" in out and "src/b.py" in out
    assert "src/ok.py" not in out
    assert "hint:" not in out
    assert "huge diff" not in out


def test_stash_conflict_does_not_echo_advice():
    raw = (
        "CONFLICT (content): Merge conflict in env/.env\n"
        "hint: Use 'git add <file>' to mark resolution.\n"
        "The stash entry is kept in case you need it again.\n"
    )
    out = _sanitize_git_text(raw)
    assert out.splitlines() == ["Conflict detected", "env/.env"]
