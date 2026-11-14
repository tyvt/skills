"""内容快照哈希：把「被验证的文件路径列表 + 内容哈希」固化，供验证门禁复用。

设计要点（见 .plan/orchestrator-verification-gate-20261114.md）：
- 绑定的是「按固化 paths[] 的文件字节内容哈希」，与 HEAD/index/diff 无关；
  git add / commit / push 不改文件字节，故凭证全程有效。
- 生成时用 `git status --short -z` 采集路径（NUL 分隔）；重命名格式为
  `R  new\0old\0`，只取 new、跳过 old token；删除记哨兵。
- 传入 paths 时只按该列表读字节重算，**绝不重新采集 status**（commit 后文件
  离开 status，现算会得空即误拒）。
- `_review.json` 自身排除，避免自引用。
"""
from __future__ import annotations

import hashlib
import os
import subprocess
from typing import List, Optional, Tuple

REVIEW_FILE = "_review.json"
DELETED_SENTINEL = "<DELETED>"

# 需要排除、不参与哈希的文件（相对 workdir 的 basename 或路径）
_EXCLUDE_BASENAMES = {REVIEW_FILE}


def _status_paths(workdir: str, timeout: float = 15.0) -> List[str]:
    """解析 `git status --short -z` 得到改动文件路径（已解析重命名/删除）。"""
    try:
        out = subprocess.run(
            ["git", "-C", workdir, "status", "--short", "-z"],
            capture_output=True, timeout=timeout,
        )
    except (OSError, subprocess.TimeoutExpired):
        return []
    if out.returncode != 0:
        return []
    raw = out.stdout.decode("utf-8", errors="replace")
    tokens = raw.split("\0")
    paths: List[str] = []
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        if not tok:
            i += 1
            continue
        # 每个条目形如 "XY <path>"（XY 两字符状态码 + 空格）
        if len(tok) < 4:
            i += 1
            continue
        status = tok[:2]
        path = tok[3:]
        # 重命名/复制：R 或 C，紧跟的下一个 token 是 old path，需跳过
        if status[0] in ("R", "C") or status[1] in ("R", "C"):
            paths.append(path)  # new name
            i += 2  # 跳过 old name token
            continue
        paths.append(path)
        i += 1
    return paths


def _read_bytes(workdir: str, rel_path: str) -> bytes:
    full = os.path.join(workdir, rel_path)
    try:
        with open(full, "rb") as fh:
            return fh.read()
    except OSError:
        return DELETED_SENTINEL.encode("utf-8")


def _normalize(data: bytes) -> bytes:
    """文本做 LF 归一化（CRLF->LF）；二进制原样并加标记避免歧义。"""
    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        return b"\x00BIN\x00" + data
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    return text.encode("utf-8")


def compute_content_sha(workdir: str, paths: Optional[List[str]] = None) -> Tuple[List[str], str]:
    """返回 (paths, sha256)。

    - paths=None：用 git status 采集路径（排除 _review.json），落盘保存这份 paths。
    - 传入 paths：只按该固定列表读字节重算（不重新采集 status）。
    """
    if paths is None:
        collected = _status_paths(workdir)
        paths = [p for p in set(collected) if os.path.basename(p) not in _EXCLUDE_BASENAMES]
    else:
        # 无论来源，都排除 _review.json 自身（避免自引用）
        paths = [p for p in set(paths) if os.path.basename(p) not in _EXCLUDE_BASENAMES]
    paths = sorted(paths)
    h = hashlib.sha256()
    for p in paths:
        h.update(p.encode("utf-8"))
        h.update(b"\x1f")  # 分隔符，防路径/内容拼接歧义
        h.update(_normalize(_read_bytes(workdir, p)))
        h.update(b"\x1e")
    return paths, h.hexdigest()
