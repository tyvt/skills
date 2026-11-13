"""Offline end-to-end JSON bridge checks; no model calls."""
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def bridge(payload):
    proc = subprocess.run([sys.executable, '-m', 'src.jsonbridge'], cwd=ROOT,
                          input=json.dumps(payload), capture_output=True, text=True,
                          encoding='utf-8', timeout=20)
    return proc, json.loads(proc.stdout)


def test_fast_path_works_without_config_or_models(tmp_path):
    proc, result = bridge({'op': 'full', 'config': str(tmp_path / 'missing.yaml'),
                           'session_id': 'bridge-isolated', 'workdir': str(tmp_path),
                           'execution': {'program': 'node', 'args': ['--version']}})
    assert proc.returncode == 0
    assert result['mode'] == 'execution' and result['ok']
    assert result['exitCode'] == 0
    assert result['logRef']


def test_invalid_cwd_fails_before_model_or_spawn(tmp_path):
    proc, result = bridge({'op': 'full', 'config': str(tmp_path / 'missing.yaml'),
                           'session_id': 'bridge-isolated', 'workdir': str(tmp_path / 'missing'),
                           'execution': {'program': 'node', 'args': ['--version']}})
    assert proc.returncode != 0
    assert not result['ok'] and result['exitCode'] is None


def test_arbitrary_log_path_rejected():
    proc, result = bridge({'op': 'full', 'session_id': 'bridge-isolated', 'log_ref': '../../secret'})
    assert proc.returncode != 0 and not result['ok']
