"""Deterministic, shell-free execution and bounded redacted local logs."""
import codecs
import json
import hashlib
import math
import os
from pathlib import Path
import re
import subprocess
import shutil
import threading
import uuid

_ROOT = Path(__file__).resolve().parents[2]
LOG_ROOT = _ROOT.parent / '.task-state' / 'execution-logs'
_POLICY = _ROOT / 'shared' / 'p0-policy.json'
_LOCK = threading.Lock()
_READS = {}
_OWNERS = {}
_PROGRAMS = {'git', 'python', 'node', 'npm', 'pnpm', 'bun'}
_META = re.compile(r'[;&|<>`\r\n\x00]|\$\(|\$\{')
_SECRET = re.compile(r'''(?i)(["']?(?:authorization|api[_-]?key|token|password|secret)["']?\s*[:=]\s*["']?(?:bearer\s+)?)[^\s,;"']+''')


def _budgets():
    try:
        return json.loads(_POLICY.read_text(encoding='utf-8'))
    except (OSError, ValueError):
        return {}


def redact(text):
    text = _SECRET.sub(r'\1[REDACTED]', str(text))
    return re.sub(r'(https?://)[^/@\s]+:[^/@\s]+@', r'\1[REDACTED]@', text)


def _validate(workdir, execution):
    if not isinstance(workdir, str) or not workdir.strip() or not Path(workdir).is_absolute() or not Path(workdir).is_dir():
        raise ValueError('workdir must be an existing absolute directory')
    if not isinstance(execution, dict) or set(execution) - {'program', 'args', 'timeout'}:
        raise ValueError('execution requires program, args and optional timeout')
    program, args = execution.get('program'), execution.get('args')
    if program not in _PROGRAMS or not isinstance(args, list) or any(not isinstance(a, str) for a in args):
        raise ValueError('program/args is outside the structured whitelist')
    if any(_META.search(a) for a in args):
        raise ValueError('shell metacharacters are forbidden')
    if any(a.lower() in {'-c', '-e', '--eval', '--print', '-p', '--exec', '-exec', '--command'} for a in args):
        raise ValueError('inline code and command execution flags are forbidden')
    if program in {'npm', 'pnpm', 'bun'}:
        if args not in (['test'], ['build'], ['lint'], ['--version'], ['run', 'test'], ['run', 'build'], ['run', 'lint']):
            raise ValueError('package command/script is outside the whitelist')
    if program in {'python', 'python3'} and (len(args) < 2 or args[:2] != ['-m', 'pytest']):
        raise ValueError('python only supports -m pytest')
    if program == 'node' and args != ['--version']:
        raise ValueError('node only supports --version')
    if program == 'git' and (not args or args[0] not in {'status', 'diff', 'log', 'show', 'rev-parse', 'ls-files', '--version'}):
        raise ValueError('git command is outside the whitelist')
    if program == 'git' and any(a.startswith(('--ext-diff', '--textconv', '--output', '--config', '--exec-path')) for a in args):
        raise ValueError('git external execution/output flags are forbidden')
    timeout = execution.get('timeout', 120)
    if isinstance(timeout, bool) or not isinstance(timeout, (int, float)) or not math.isfinite(timeout) or not 0 < timeout <= 3600:
        raise ValueError('timeout must be finite and within 0..3600 seconds')
    argv = [program, *args]
    if os.name == 'nt' and program in {'npm', 'pnpm'}:
        launcher = shutil.which(program)
        node = shutil.which('node')
        relative = 'node_modules/npm/bin/npm-cli.js' if program == 'npm' else 'node_modules/pnpm/bin/pnpm.cjs'
        cli = Path(launcher).parent / relative if launcher else None
        if not node or cli is None or not cli.is_file():
            raise ValueError('package manager requires a known node CLI entrypoint')
        argv = [node, str(cli), *args]
    return argv, timeout


def _result(ok, text, **extra):
    policy = _budgets().get('result', {})
    cap = min(policy.get('successChars' if ok else 'failureChars', 800 if ok else 3200), 800 if ok else 3200)
    text = redact(text)
    if not ok:
        lines = text.splitlines()
        text = '\n'.join(lines if len(lines) <= 10 else lines[:2] + lines[-8:])
    return {'ok': ok, 'content': text[:cap], **extra}


def run_execution(workdir, execution, session_id):
    if not isinstance(workdir, str) or not workdir.strip():
        return {'mode': 'execution', **_result(False, 'workdir is required', code='WORKDIR_REQUIRED', cwd=workdir, exitCode=None, logRef=None)}
    if not Path(workdir).is_absolute() or not Path(workdir).is_dir():
        return {'mode': 'execution', **_result(False, 'workdir must be an existing absolute directory', code='WORKDIR_NOT_FOUND', cwd=workdir, exitCode=None, logRef=None)}
    try:
        result = _run_execution(workdir, execution, session_id)
    except (OSError, ValueError, TypeError) as exc:
        result = _result(False, str(exc), exitCode=None, logRef=None)
    return {'mode': 'execution', 'cwd': workdir, **result}


def _run_execution(workdir, execution, session_id):
    """Run a whitelisted argv without a shell; return real exit and opaque logRef."""
    try:
        argv, timeout = _validate(workdir, execution)
        if not isinstance(session_id, str) or not session_id.strip():
            raise ValueError('session_id is required')
    except (ValueError, OSError, TypeError) as exc:
        return _result(False, str(exc), exitCode=None, logRef=None)
    return _execute(argv, timeout, workdir, session_id)


def _execute(argv, timeout, workdir, session_id, env=None):
    """Internal streaming runner; callers must independently authorize argv."""
    if LOG_ROOT.resolve() != LOG_ROOT.absolute():
        return _result(False, 'invalid log root', exitCode=None, logRef=None)
    LOG_ROOT.mkdir(parents=True, exist_ok=True)
    if LOG_ROOT.is_symlink():
        return _result(False, 'log root cannot be a symlink', exitCode=None, logRef=None)
    ref = uuid.uuid4().hex
    path = LOG_ROOT / (ref + '.log')
    with _LOCK:
        _OWNERS[ref] = session_id
        (LOG_ROOT / (ref + '.owner')).write_text(session_id, encoding='utf-8')
    tail = ''
    timed_out = False
    try:
        with path.open('x', encoding='utf-8') as log:
            process = subprocess.Popen(argv, cwd=workdir, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=False)
            def consume():
                nonlocal tail
                decoder = codecs.getincrementaldecoder('utf-8')(errors='replace')
                pending = ''
                while True:
                    chunk = process.stdout.read(1024)
                    if not chunk:
                        pending += decoder.decode(b'', final=True)
                        break
                    pending += decoder.decode(chunk)
                    # Keep a bounded partial line so secrets split between reads are redacted together.
                    while '\n' in pending:
                        line, pending = pending.split('\n', 1)
                        safe = redact(line) + '\n'
                        log.write(safe)
                        tail = (tail + safe)[-6400:]
                    if len(pending) > 8192:
                        safe = '[oversized line omitted]\n'
                        log.write(safe)
                        tail = (tail + safe)[-6400:]
                        # Discard through newline, preventing partial secret disclosure.
                        while '\n' not in pending:
                            more = process.stdout.read(1024)
                            if not more:
                                pending = ''
                                break
                            pending = decoder.decode(more)
                        pending = pending.split('\n', 1)[-1] if '\n' in pending else ''
                    log.flush()
                if pending:
                    safe = redact(pending)
                    log.write(safe)
                    tail = (tail + safe)[-6400:]
            reader = threading.Thread(target=consume, daemon=True)
            reader.start()
            try:
                process.wait(timeout=timeout)
            except subprocess.TimeoutExpired:
                timed_out = True
                process.kill()
                process.wait()
            reader.join(timeout=5)
            if reader.is_alive():
                process.stdout.close()
                reader.join(timeout=1)
            code = process.returncode
        return _result(code == 0 and not timed_out, f'exit={code}\n' + ('TIMEOUT\n' if timed_out else '') + tail,
                       exitCode=code, logRef=ref, timedOut=timed_out)
    except OSError as exc:
        return _result(False, str(exc), exitCode=None, logRef=ref)


def read_log(log_ref, session_id, *, offset=0, limit=2000, max_lines=40):
    if not isinstance(session_id, str) or not session_id.strip():
        return {'mode': 'log_read', 'ok': False, 'content': '', 'error': 'session_id is required'}
    if LOG_ROOT.resolve() != LOG_ROOT.absolute():
        return {'mode': 'log_read', 'ok': False, 'content': '', 'error': 'invalid log root'}
    key = hashlib.sha256(session_id.encode()).hexdigest()
    lock_path = LOG_ROOT / (key + '.lock')
    try:
        LOG_ROOT.mkdir(parents=True, exist_ok=True)
        fd = os.open(str(lock_path), os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    except OSError:
        return {'mode': 'log_read', 'ok': False, 'content': '', 'error': 'log quota busy/unavailable'}
    try:
        result = _read_log(log_ref, session_id, offset=offset, limit=limit, max_lines=max_lines)
        return {'mode': 'log_read', **result}
    except (OSError, ValueError, TypeError) as exc:
        return {'mode': 'log_read', 'ok': False, 'content': '', 'error': redact(str(exc))[:200]}
    finally:
        os.close(fd)
        lock_path.unlink(missing_ok=True)


def _read_log(log_ref, session_id, *, offset=0, limit=2000, max_lines=40):
    """Read a session-owned opaque log reference within a shared session quota."""
    if not isinstance(log_ref, str) or not re.fullmatch(r'[0-9a-f]{32}', log_ref):
        return {'ok': False, 'error': 'invalid logRef', 'content': ''}
    if any(isinstance(v, bool) or not isinstance(v, int) for v in (offset, limit, max_lines)) or offset < 0 or not 0 < limit <= 2000 or not 0 < max_lines <= 40:
        return {'ok': False, 'error': 'invalid read bounds', 'content': ''}
    with _LOCK:
        owner_path = LOG_ROOT / (log_ref + '.owner')
        try:
            owner = owner_path.read_text(encoding='utf-8') if not owner_path.is_symlink() else None
        except OSError:
            owner = None
        if owner != session_id:
            return {'ok': False, 'error': 'logRef is not owned by session', 'content': ''}
        quota_path = LOG_ROOT / (hashlib.sha256(session_id.encode()).hexdigest() + '.quota')
        try:
            if quota_path.is_symlink():
                raise ValueError('invalid quota path')
            count, total = json.loads(quota_path.read_text(encoding='utf-8')) if quota_path.exists() else (0, 0)
        except (OSError, ValueError, TypeError):
            return {'ok': False, 'error': 'invalid log quota', 'content': ''}
        if count >= 3 or total >= 6000:
            return {'ok': False, 'error': 'session log quota exceeded', 'content': ''}
        path = LOG_ROOT / (log_ref + '.log')
        if path.is_symlink() or LOG_ROOT.is_symlink():
            return {'ok': False, 'error': 'invalid log path', 'content': ''}
        try:
            with path.open(encoding='utf-8') as stream:
                # offset counts decoded characters; never load the complete log.
                remaining = offset
                while remaining:
                    skipped = stream.read(min(remaining, 4096))
                    if not skipped:
                        break
                    remaining -= len(skipped)
                text = stream.read(min(limit, 6000 - total))
                text = ''.join(text.splitlines(keepends=True)[:max_lines])
        except OSError:
            return {'ok': False, 'error': 'log unavailable', 'content': ''}
        _READS[session_id] = (count + 1, total + len(text))
        quota_path.write_text(json.dumps(_READS[session_id]), encoding='utf-8')
    return {'ok': True, 'content': text, 'logRef': log_ref, 'nextOffset': offset + len(text)}
