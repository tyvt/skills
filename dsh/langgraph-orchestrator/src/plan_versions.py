"""Versioned plan reviews. No model calls; shared approval digest contract."""
import hashlib
import json
import os
import re
import tempfile
from pathlib import Path

APPROVAL_FIELDS = {'status', 'human_confirmed', 'review_verdict', 'review_score', 'reviewer', 'approved_sha256', 'approved_version', 'reviewed_at'}

# 镜像 api.PLAN_REVIEW_CLIP_CHARS（=16000）；此处独立定义避免 plan_versions<->api 循环导入。
# 用于 plan_path 从文件读入时的体积闸，与内联送审共用同一字符上限（按字符，非字节）。
MAX_PLAN_CHARS = 16000

# 计划全局根：默认 D:\plan，可用环境变量 DSH_PLAN_ROOT 覆盖（与 JS 侧一致）。
# 最终计划目录 = <PLAN_ROOT>/<工作区目录名>；_review.json 存于该目录。
PLAN_ROOT = Path(os.getenv('DSH_PLAN_ROOT', 'D:/plan'))


def plan_dir_for(root: Path) -> Path:
    return (PLAN_ROOT / Path(root).name).resolve()


def canonical_plan(text):
    text = str(text).lstrip('\ufeff').replace('\r\n', '\n').replace('\r', '\n')
    lines = text.split('\n')
    if lines and lines[0].strip() == '---':
        try:
            end = next(i for i in range(1, len(lines)) if lines[i].strip() == '---')
        except StopIteration:
            return text
        retained = [line for line in lines[1:end] if line.split(':', 1)[0].strip() not in APPROVAL_FIELDS]
        lines = [lines[0]] + retained + lines[end:] if any(line.strip() for line in retained) else lines[end + 1:]
    return '\n'.join(lines)


def plan_sha(text):
    return hashlib.sha256(canonical_plan(text).encode('utf-8')).hexdigest()


def resolve_plan(root, plan_path, session_id):
    if not session_id or not re.fullmatch(r'[A-Za-z0-9_-]{1,128}', session_id):
        raise ValueError('valid session_id required')
    root = Path(root).resolve(strict=True)
    if not root.is_dir():
        raise ValueError('workdir must be a directory')
    boundary = plan_dir_for(root)
    target = Path(plan_path) if plan_path else boundary / (session_id + '.md')
    if not target.is_absolute():
        # 兼容两类相对路径：相对 root（旧 .plan/x.md）与相对计划目录（新 x.md）。
        via_root = (root / target).resolve()
        target = via_root if via_root.is_relative_to(boundary) else (boundary / target).resolve()
    else:
        target = target.resolve()
    if not target.is_relative_to(boundary) or target == boundary or target.suffix.lower() != '.md':
        raise ValueError('plan_path must be a Markdown file within <planRoot>/<workspace>')
    # plan_key 相对「计划根」(boundary 的父目录)：新布局 = <workspace>/x.md，
    # 旧布局 = .plan/x.md，与 JS 侧 planKeyOf 的口径保持一致。
    return root, target, target.relative_to(boundary.parent).as_posix()


def load_state(root):
    path = plan_dir_for(root) / '_review.json'
    if not path.exists():
        return {'entries': []}
    state = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(state, dict) or not isinstance(state.get('entries'), list):
        raise ValueError('invalid review state')
    return state


def prepare(root, plan_path, session_id, text, base_sha='', base_version=None, delta=None):
    root, target, key = resolve_plan(root, plan_path, session_id)
    state = load_state(root)
    same = [e for e in state['entries'] if e.get('plan_key') == key and e.get('session_id') == session_id and e.get('schema_version') == 2]
    latest = same[-1] if same else None
    if delta is not None:
        if text or not latest or not base_sha or base_version is None:
            raise ValueError('delta requires an existing base_sha/version and no full plan')
        if latest['plan_sha256'] != base_sha or latest['version'] != base_version:
            raise ValueError('stale delta base')
        if not isinstance(delta, list) or not delta:
            raise ValueError('delta must be a nonempty list')
        text = latest['plan_markdown']
        for change in delta:
            if not isinstance(change, dict) or set(change) != {'old', 'new'}:
                raise ValueError('delta items require exactly old/new')
            old, new = change['old'], change['new']
            if not isinstance(old, str) or not old or not isinstance(new, str) or text.count(old) != 1:
                raise ValueError('delta old must match exactly once')
            text = text.replace(old, new, 1)
    elif base_sha or base_version is not None:
        raise ValueError('base fields require delta')
    # plan_path 契约：text 为空且无 delta 时，从 resolve_plan 解析出的 target 读文件（受 .plan 边界+.md 约束）。
    # digest 一致性：直接赋 read_text 原值，不 strip 不改写；plan_sha 内 canonical_plan 已统一 CRLF/BOM→\n，
    # 故「文件读入」与「内联同内容」digest 必然一致，approved_sha256 版本比对不漂移。
    if (not isinstance(text, str) or not text.strip()) and delta is None:
        if target.exists() and target.is_file():
            # 先按字节 stat 粗筛（避免大文件整读进内存），read 后再按字符数复核上限。
            if target.stat().st_size > MAX_PLAN_CHARS * 4:
                raise ValueError('plan exceeds review size limit; shorten before review')
            text = target.read_text(encoding='utf-8')
    if not isinstance(text, str) or not text.strip():
        raise ValueError('plan is empty')
    if len(text) > MAX_PLAN_CHARS:
        raise ValueError('plan exceeds review size limit; shorten before review')
    digest = plan_sha(text)
    version = (latest['version'] + (latest['plan_sha256'] != digest)) if latest else 1
    return {'root': str(root), 'target': str(target), 'plan_key': key, 'session_id': session_id,
            'plan_markdown': text, 'plan_sha256': digest, 'version': version,
            'parent_sha': latest['plan_sha256'] if latest else None, 'state': state, 'latest': latest}


def record(prepared, verdict, score, p0_count=0):
    state = load_state(prepared['root'])
    # Reject stale concurrent submissions rather than overwrite a newer review.
    if state != prepared['state']:
        raise ValueError('review state changed during review; retry')
    entries = state['entries']
    same = [e for e in entries if e.get('plan_key') == prepared['plan_key'] and e.get('session_id') == prepared['session_id']]
    entry = {k: v for k, v in prepared.items() if k not in {'state', 'root', 'target', 'latest'}}
    entry.update(schema_version=2, verdict=verdict, score=score, p0_count=p0_count, round=len(same) + 1, stale=False)
    for old in same:
        old['stale'] = True
    entries.append(entry)
    directory = Path(prepared['root']) / '.plan'
    directory.mkdir(exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix='_review.', suffix='.tmp', dir=directory)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as stream:
            json.dump(state, stream, ensure_ascii=False)
        os.replace(tmp, directory / '_review.json')
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)
    return entry
