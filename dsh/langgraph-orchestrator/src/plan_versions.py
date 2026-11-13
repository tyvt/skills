"""Versioned plan reviews. No model calls; shared approval digest contract."""
import hashlib
import json
import os
import re
import tempfile
from pathlib import Path

APPROVAL_FIELDS = {'status', 'human_confirmed', 'review_verdict', 'review_score', 'reviewer', 'approved_sha256', 'approved_version', 'reviewed_at'}


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
    boundary = (root / '.plan').resolve()
    if boundary.parent != root:
        raise ValueError('.plan must remain inside workdir')
    target = Path(plan_path) if plan_path else Path('.plan') / (session_id + '.md')
    target = (root / target).resolve() if not target.is_absolute() else target.resolve()
    if not target.is_relative_to(boundary) or target == boundary or target.suffix.lower() != '.md':
        raise ValueError('plan_path must be a Markdown file within .plan')
    return root, target, target.relative_to(root).as_posix()


def load_state(root):
    path = Path(root) / '.plan' / '_review.json'
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
    if not isinstance(text, str) or not text.strip():
        raise ValueError('plan is empty')
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
