"""E1 最小版：绝对路径 Get-Content/Select-String 只读放行（_readonly_read_ok_abs / _whitelist_bypass）。

覆盖：repoRoots 边界、敏感名、UNC、通配、symlink、拼接符、-Path/-LiteralPath、
含空格、未知形参、env 开关、_DANGEROUS_CHARS 优先级。用 tmp_path 注入临时根，不硬编码路径。
"""
import os
import sys

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.graph import (  # noqa: E402
    _readonly_read_ok_abs,
    _whitelist_bypass,
    _is_sensitive_basename,
    _under_repo_roots,
    _DANGEROUS_CHARS,
)

DENY = []  # 无 deny 正则


def _mk(root, rel):
    p = root / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text("x", encoding="utf-8")
    return str(p)


# ---------- 正例 ----------
def test_abs_get_content_ok(tmp_path):
    f = _mk(tmp_path, "README.md")
    assert _readonly_read_ok_abs(f'Get-Content "{f}"'.replace('"', ""), [str(tmp_path)]) or \
        _readonly_read_ok_abs(f"Get-Content {f}", [str(tmp_path)])


def test_abs_select_string_ok(tmp_path):
    f = _mk(tmp_path, "src/index.js")
    cmd = f"Select-String -Path {f} -Pattern exports"
    assert _readonly_read_ok_abs(cmd, [str(tmp_path)])


def test_abs_with_encoding_ok(tmp_path):
    f = _mk(tmp_path, "a.txt")
    assert _readonly_read_ok_abs(f"Get-Content -Encoding utf8 {f}", [str(tmp_path)])


def test_not_sensitive_tokenizer_secretary(tmp_path):
    assert not _is_sensitive_basename("tokenizer.js")
    assert not _is_sensitive_basename("secretary.md")
    f1 = _mk(tmp_path, "tokenizer.js")
    assert _readonly_read_ok_abs(f"Get-Content {f1}", [str(tmp_path)])


# ---------- 负例 ----------
def test_outside_roots_rejected(tmp_path):
    outside = _mk(tmp_path / "inner", "x.txt")  # 放在子目录，用父目录做 root
    root = str(tmp_path / "root")
    os.makedirs(root, exist_ok=True)
    assert not _readonly_read_ok_abs(f"Get-Content {outside}", [root])


def test_sensitive_env_rejected(tmp_path):
    f = _mk(tmp_path, ".env.local")
    assert not _readonly_read_ok_abs(f"Get-Content {f}", [str(tmp_path)])
    f2 = _mk(tmp_path, "id_rsa")
    assert not _readonly_read_ok_abs(f"Get-Content {f2}", [str(tmp_path)])
    f3 = _mk(tmp_path, "mysecret.txt")
    assert not _readonly_read_ok_abs(f"Get-Content {f3}", [str(tmp_path)])
    f4 = _mk(tmp_path, "kubeconfig")
    assert not _readonly_read_ok_abs(f"Get-Content {f4}", [str(tmp_path)])


def test_unc_rejected(tmp_path):
    assert not _readonly_read_ok_abs(r"Get-Content \\server\share\x", [str(tmp_path)])


def test_wildcard_rejected(tmp_path):
    assert not _readonly_read_ok_abs(
        f"Get-Content {tmp_path}\\*.md", [str(tmp_path)]
    )


def test_pipe_rejected(tmp_path):
    f = _mk(tmp_path, "a.txt")
    assert not _readonly_read_ok_abs(f"Get-Content {f} ; rm x", [str(tmp_path)])


def test_literalpath_sensitive_rejected(tmp_path):
    f = _mk(tmp_path, ".env")
    assert not _readonly_read_ok_abs(f"Get-Content -LiteralPath {f}", [str(tmp_path)])


def test_space_unquoted_rejected(tmp_path):
    # 含空格且未正确引号（这里用两段）→ 回退
    assert not _readonly_read_ok_abs(
        f"Get-Content {tmp_path}\\a b.txt", [str(tmp_path)]
    )


def test_unknown_flag_rejected(tmp_path):
    f = _mk(tmp_path, "a.txt")
    assert not _readonly_read_ok_abs(f"Get-Content -Foo {f}", [str(tmp_path)])


def test_variable_path_rejected(tmp_path):
    # 变量路径 $p 不是绝对路径，回退不放行
    assert not _readonly_read_ok_abs("Get-Content $p", [str(tmp_path)])


@pytest.mark.skipif(not hasattr(os, "symlink"), reason="no symlink support")
def test_symlink_escape_rejected(tmp_path):
    real = tmp_path / "real"
    real.mkdir()
    secret = real / "x.txt"
    secret.write_text("x", encoding="utf-8")
    root = tmp_path / "root"
    root.mkdir()
    link = root / "link.txt"
    try:
        os.symlink(str(secret), str(link))
    except (OSError, NotImplementedError):
        pytest.skip("symlink creation not permitted")
    assert not _readonly_read_ok_abs(f"Get-Content {link}", [str(root)])


# ---------- env 开关 & 优先级 ----------
def test_env_switch_off_disables_abs(tmp_path, monkeypatch):
    f = _mk(tmp_path, "a.txt")
    monkeypatch.setenv("DSH_ORCH_READONLY_ALLOW_ABS", "0")
    roots = [str(tmp_path)]
    # abs 直接函数仍可判真（纯判定）；但 _whitelist_bypass 在开关关时不放行
    assert not _whitelist_bypass(f"Get-Content {f}", DENY, roots)


def test_env_switch_on_allows_abs(tmp_path, monkeypatch):
    f = _mk(tmp_path, "a.txt")
    monkeypatch.setenv("DSH_ORCH_READONLY_ALLOW_ABS", "1")
    roots = [str(tmp_path)]
    assert _whitelist_bypass(f"Get-Content {f}", DENY, roots)


def test_dangerous_chars_precedence(tmp_path, monkeypatch):
    f = _mk(tmp_path, "a.txt")
    monkeypatch.setenv("DSH_ORCH_READONLY_ALLOW_ABS", "1")
    roots = [str(tmp_path)]
    # 含管道 → 即便绝对路径只读也拒（_DANGEROUS_CHARS 最前）
    assert _DANGEROUS_CHARS.search(f"Get-Content {f} | more")
    assert not _whitelist_bypass(f"Get-Content {f} | more", DENY, roots)


def test_under_repo_roots_boundary(tmp_path):
    root = tmp_path / "a"
    root.mkdir()
    sibling = tmp_path / "abc"
    sibling.mkdir()
    f = sibling / "x.txt"
    f.write_text("x", encoding="utf-8")
    # /tmp/a 不应匹配 /tmp/abc
    assert not _under_repo_roots(str(f), [str(root)])
