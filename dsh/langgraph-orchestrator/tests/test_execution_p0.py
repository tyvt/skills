import io
import subprocess
import uuid

import pytest

from src import execution as ex
from src.graph import _run_pwsh


@pytest.fixture(autouse=True)
def local_logs(tmp_path, monkeypatch):
    monkeypatch.setattr(ex, 'LOG_ROOT', tmp_path / 'logs')
    ex._READS.clear()
    ex._OWNERS.clear()


def test_invalid_directory_fails_without_spawn(tmp_path, monkeypatch):
    monkeypatch.setattr(subprocess, 'Popen', lambda *a, **k: pytest.fail('spawned'))
    for cwd in ('', '.', str(tmp_path / 'missing')):
        assert not ex.run_execution(cwd, {'program': 'git', 'args': ['--version']}, 's')['ok']
    with pytest.raises(ValueError):
        _run_pwsh('pwd', str(tmp_path / 'missing'), {}, 1)


@pytest.mark.parametrize('spec', [
    {'program': 'pwsh', 'args': ['-Command', 'echo hi']},
    {'program': 'git', 'args': ['status;whoami']},
    {'program': 'git', 'args': ['status', '$(whoami)']},
    {'program': 'python', 'args': ['-c', 'print(1)']},
    {'program': 'git', 'args': ['status', '--output=x']},
    {'program': 'node', 'args': ['evil.js']},
    {'program': 'git', 'args': ['--version'], 'timeout': float('nan')},
])
def test_reject_injection(tmp_path, spec):
    assert not ex.run_execution(str(tmp_path), spec, 's')['ok']


class Process:
    def __init__(self, data, code=0, timeout=False):
        self.stdout = io.BytesIO(data)
        self.returncode = code
        self.timeout = timeout

    def wait(self, timeout=None):
        if self.timeout and timeout is not None:
            raise subprocess.TimeoutExpired('test', timeout)
        return self.returncode

    def kill(self):
        self.returncode = -9


@pytest.mark.parametrize('code,cap', [(0, 800), (7, 3200)])
def test_stream_budget_redaction_and_real_exit(tmp_path, monkeypatch, code, cap):
    data = ('password=supersecret\n' + ('x' * 100 + '\n') * 100).encode()
    def spawn(argv, **kwargs):
        assert kwargs['shell'] is False
        assert kwargs['cwd'] == str(tmp_path)
        return Process(data, code)
    monkeypatch.setattr(subprocess, 'Popen', spawn)
    result = ex.run_execution(str(tmp_path), {'program': 'git', 'args': ['status']}, 's')
    assert result['exitCode'] == code
    assert result['ok'] == (code == 0)
    assert len(result['content']) <= cap
    log = (ex.LOG_ROOT / (result['logRef'] + '.log')).read_text()
    assert 'supersecret' not in log
    assert '[REDACTED]' in log
    assert len(log) > cap
    assert not ex.read_log(result['logRef'], 'other')['ok']
    assert not ex.read_log('../escape', 's')['ok']
    assert not ex.read_log(result['logRef'], 's', limit=2001)['ok']
    for _ in range(3):
        read = ex.read_log(result['logRef'], 's')
        assert read['ok'] and len(read['content']) <= 2000
        assert len(read['content'].splitlines()) <= 40
    ex._READS.clear()
    ex._OWNERS.clear()
    assert not ex.read_log(result['logRef'], 's')['ok']
    assert result['mode'] == 'execution'
    assert ex.read_log('../escape', 's')['mode'] == 'log_read'


def test_timeout_is_failure(tmp_path, monkeypatch):
    monkeypatch.setattr(subprocess, 'Popen', lambda *a, **k: Process(b'ok', timeout=True))
    result = ex.run_execution(str(tmp_path), {'program': 'git', 'args': ['status'], 'timeout': 0.1}, 's')
    assert not result['ok'] and result['timedOut'] and result['exitCode'] == -9


def test_real_chinese_workdir(tmp_path):
    cwd = tmp_path / '中文目录'
    cwd.mkdir()
    result = ex.run_execution(str(cwd), {'program': 'git', 'args': ['--version']}, uuid.uuid4().hex)
    assert result['ok'] and result['exitCode'] == 0


def test_real_npm_build_without_network(tmp_path):
    (tmp_path / 'package.json').write_text('{"scripts":{"build":"node build.cjs"}}', encoding='utf-8')
    (tmp_path / 'build.cjs').write_text("console.log('isolated-build-ok')", encoding='utf-8')
    result = ex.run_execution(str(tmp_path), {'program': 'npm', 'args': ['run', 'build']}, 'npm-build')
    assert result['ok'], result
    assert 'isolated-build-ok' in result['content']
    assert not ex.run_execution(str(tmp_path), {'program': 'npm', 'args': ['run', 'arbitrary']}, 's')['ok']


def test_legacy_nonzero_is_failure(tmp_path, monkeypatch):
    monkeypatch.setattr(subprocess, 'Popen', lambda *a, **k: Process(b'failure', 9))
    with pytest.raises(subprocess.CalledProcessError) as error:
        _run_pwsh('exit 9', str(tmp_path), {}, 1)
    assert error.value.returncode == 9


@pytest.mark.parametrize('command', [
    'Set-Location Z:/missing; npm run build',
    'cd {target}; npm run build',
    'Write-Output ok; chdir {target}',
    'if ($true) {{ Push-Location {target} }}',
    'Pop-Location',
    '& "Set-Location" {target}',
    'Microsoft.PowerShell.Management\\Set-Location {target}',
])
def test_directory_commands_never_spawn(tmp_path, monkeypatch, command):
    monkeypatch.setattr(subprocess, 'Popen', lambda *a, **k: pytest.fail('directory command spawned'))
    with pytest.raises(ValueError, match='workdir'):
        _run_pwsh(command.format(target=str(tmp_path)), str(tmp_path), {}, 1)


@pytest.mark.parametrize('command', [
    'Write-Output "Set-Location Z:/missing; npm run build"',
    "Write-Output 'cd C:/other'",
    'Write-Output cd',
    '# Set-Location C:/other\nWrite-Output ok',
])
def test_directory_words_in_arguments_are_allowed(tmp_path, monkeypatch, command):
    monkeypatch.setattr(subprocess, 'Popen', lambda *a, **k: Process(b'ok', 0))
    assert 'ok' in _run_pwsh(command, str(tmp_path), {}, 1)
