"""Pure local contract tests: no model/network calls."""
import json
from pathlib import Path

import pytest
from src.plan_versions import prepare, record, plan_sha


def test_api_reconstructs_full_plan_and_failed_model_cannot_pass(tmp_path, monkeypatch):
    from types import SimpleNamespace
    from src import api
    messages_seen = []
    response = SimpleNamespace(ok=True, content='{"verdict":"pass","score":90,"issues":[],"suggestions":[]}', attempts=[], tool='plan_reviewer', model_used='fake')
    def run_tool(tool, messages):
        messages_seen.append(messages)
        return response
    monkeypatch.setattr(api, 'load_config', lambda *_: object())
    monkeypatch.setattr(api, 'ModelRouter', lambda *_: SimpleNamespace(run_tool=run_tool))
    monkeypatch.setattr(api, '_append_costs', lambda *_: None)
    initial = api.run_plan_review('# Plan\nold text', workdir=str(tmp_path), session_id='session1')
    response.ok = False
    response.content = json.dumps({'verdict': 'pass', 'score': 90, 'issues': [{'level': 'P0', 'text': 'large text' * 10000}] * 10, 'suggestions': ['long suggestion' * 10000] * 10})
    revised = api.run_plan_review('', workdir=str(tmp_path), session_id='session1', base_sha=initial['plan_sha256'], base_version=initial['version'], delta=[{'old': 'old text', 'new': 'new text'}])
    assert '# Plan\nnew text' in messages_seen[-1][1]['content']
    assert revised['verdict'] == 'reject'
    assert revised['version'] == 2
    assert 'raw' not in revised
    assert revised['p0_count'] == 10
    assert revised['session_id'] == 'session1'
    assert len(revised['issues']) <= 3
    assert len(json.dumps(revised, ensure_ascii=False)) <= 4000
    state = json.loads((tmp_path / '.plan/_review.json').read_text())
    assert state['entries'][-1]['verdict'] == 'reject'


def test_unchanged_pass_reuses_without_router_or_round_increment(tmp_path, monkeypatch):
    from unittest.mock import Mock
    from src import api
    first = prepare(tmp_path, '', 'session1', '# Same plan')
    record(first, 'pass', 91)
    before = (tmp_path / '.plan/_review.json').read_bytes()
    router = Mock(side_effect=AssertionError('unchanged pass must not call router'))
    monkeypatch.setattr(api, 'ModelRouter', router)
    config = Mock(side_effect=AssertionError('unchanged pass must not load config'))
    monkeypatch.setattr(api, 'load_config', config)
    response = api.run_plan_review('# Same plan', workdir=str(tmp_path), session_id='session1')
    router.assert_not_called()
    config.assert_not_called()
    assert response['ok'] and response['reused'] and response['verdict'] == 'pass'
    assert response['code'] == 'PLAN_UNCHANGED_USE_REVIEW'
    assert response['plan_sha256'] == first['plan_sha256']
    assert response['version'] == 1 and response['score'] == 91
    assert response['session_id'] == 'session1' and response['p0_count'] == 0
    assert (tmp_path / '.plan/_review.json').read_bytes() == before


def test_unchanged_reject_does_not_reuse(tmp_path, monkeypatch):
    from unittest.mock import Mock
    from src import api
    first = prepare(tmp_path, '', 'session1', '# Same plan')
    record(first, 'reject', 10, 5)
    config = Mock(side_effect=RuntimeError('review must be invoked'))
    monkeypatch.setattr(api, 'load_config', config)
    with pytest.raises(RuntimeError, match='must be invoked'):
        api.run_plan_review('# Same plan', workdir=str(tmp_path), session_id='session1')
    config.assert_called_once()


def test_digest_approval_fields_and_line_endings():
    a = '---\nstatus: draft\nhuman_confirmed: false\nrisk: high\n---\nbody\n'
    b = a.replace('draft', 'approved').replace('false', 'true').replace('\n', '\r\n')
    assert plan_sha(a) == plan_sha(b)
    assert plan_sha(a) != plan_sha(a.replace('body', 'changed'))


def test_delta_version_and_conflict(tmp_path):
    first = prepare(tmp_path, '', 'session1', '# Plan\nold body\n')
    record(first, 'pass', 90)
    delta = [{'old': 'old body', 'new': 'new body'}]
    second = prepare(tmp_path, '', 'session1', '', first['plan_sha256'], 1, delta)
    assert second['version'] == 2
    assert second['plan_markdown'] == '# Plan\nnew body\n'
    record(second, 'reject', 20)
    with pytest.raises(ValueError, match='stale'):
        prepare(tmp_path, '', 'session1', '', first['plan_sha256'], 1, delta)
    state = json.loads((tmp_path / '.plan/_review.json').read_text())
    assert state['entries'][-1]['verdict'] == 'reject'
    assert state['entries'][0]['stale']


@pytest.mark.parametrize('delta', [[{'old': '', 'new': 'x'}], [{'old': 'a', 'new': 'x'}], [{'old': 'missing', 'new': 'x'}], [{'old': 'aa', 'new': 'x', 'extra': 1}]])
def test_delta_requires_unique_exact_match(tmp_path, delta):
    first = prepare(tmp_path, '', 'session1', 'aa')
    record(first, 'pass', 90)
    with pytest.raises(ValueError):
        prepare(tmp_path, '', 'session1', '', first['plan_sha256'], 1, delta)


@pytest.mark.parametrize('path', ['../outside.md', 'outside.md', '.plan/../../outside.md', '.plan/x.json'])
def test_path_boundary(tmp_path, path):
    with pytest.raises(ValueError):
        prepare(tmp_path, path, 'session1', 'text')


@pytest.mark.parametrize('directory,error', [('Z:/missing/p0-directory', 'WORKDIR_NOT_FOUND'), (__file__, 'WORKDIR_NOT_FOUND')])
def test_full_invalid_workdir_before_router(monkeypatch, directory, error):
    from src import api
    monkeypatch.setattr(api, 'load_config', lambda *_: pytest.fail('must not load config'))
    assert api.run_full('request', workdir=directory)['error'] == error


def test_full_explicit_workdir_resolution(monkeypatch, tmp_path):
    """显式 workdir（含相对路径）归一化后是目录 → 成功且 source=workdir。"""
    from src import api
    _stub_graph(monkeypatch)
    result = api.run_full('request', workdir='.', project_cwd=str(tmp_path))
    assert result['ok'] is True
    assert result['workdir_source'] == 'workdir'
    assert Path(result['workdir']).is_absolute()


def test_full_relative_workdir_uses_project_cwd_base(monkeypatch, tmp_path):
    """相对 workdir 以 project_cwd 为基准解析，而不是进程 cwd。"""
    from src import api
    sub = tmp_path / 'sub-repo'
    sub.mkdir()
    _stub_graph(monkeypatch)
    result = api.run_full('request', workdir='sub-repo', project_cwd=str(tmp_path))
    assert result['ok'] is True
    assert result['workdir_source'] == 'workdir'
    assert Path(result['workdir']).resolve() == sub.resolve()


@pytest.mark.parametrize('directory', [None, ''])
def test_full_missing_workdir_falls_back_to_project_cwd(monkeypatch, tmp_path, directory):
    """**回归原 bug**：未传/空 workdir 不得再返回 WORKDIR_REQUIRED，而是回落 project_cwd。"""
    from src import api
    _stub_graph(monkeypatch)
    kwargs = {} if directory is None else {'workdir': directory}
    result = api.run_full('request', project_cwd=str(tmp_path), **kwargs)
    assert result['ok'] is True
    assert result['workdir_source'] == 'project_cwd'
    assert Path(result['workdir']).resolve() == tmp_path.resolve()


@pytest.mark.parametrize('directory', [None, '', '   '])
def test_full_missing_workdir_falls_back_to_process_cwd(monkeypatch, directory):
    """未传 workdir 且 project_cwd 不可用 → 回落进程 cwd。"""
    from src import api
    _stub_graph(monkeypatch)
    kwargs = {} if directory is None else {'workdir': directory}
    result = api.run_full('request', project_cwd='', **kwargs)
    assert result['ok'] is True
    assert result['workdir_source'] == 'process_cwd'


def test_full_unusable_project_cwd_falls_through(monkeypatch, tmp_path):
    """project_cwd 指向不存在的目录时不报错，直接下洩到进程 cwd。"""
    from src import api
    _stub_graph(monkeypatch)
    bogus = tmp_path / 'no-such-dir'
    result = api.run_full('request', project_cwd=str(bogus))
    assert result['ok'] is True
    assert result['workdir_source'] == 'process_cwd'


def test_full_invalid_workdir_carries_hint(monkeypatch, tmp_path):
    """显式 workdir 不存在 → NOT_FOUND + hint，且不下洩到兜底。"""
    from src import api
    monkeypatch.setattr(api, 'load_config', lambda *_: pytest.fail('must not load config'))
    missing = str(tmp_path / 'nope-dir')
    result = api.run_full('request', workdir=missing, project_cwd=str(tmp_path))
    assert result['ok'] is False
    assert result['error'] == 'WORKDIR_NOT_FOUND'
    assert 'hint' in result and result['hint']


def _stub_graph(monkeypatch):
    """掉真实模型调用，只验证 workdir 解析与返回字段。"""
    from src import api
    monkeypatch.setattr(api, 'load_config', lambda *_: object())
    monkeypatch.setattr(api, 'ModelRouter', lambda *_: object())
    monkeypatch.setattr(api, 'build_graph', lambda *_: object())
    monkeypatch.setattr(api, 'load_environment', lambda *_: {'cwd': 'wrong', 'env': {}})
    monkeypatch.setattr(api, 'run_orchestration',
                        lambda app, request, start: {'final': 'ok', 'results': [{'ok': True}]})
    monkeypatch.setattr(api, '_append_costs', lambda *_: None)
    monkeypatch.setattr(api, 'save_environment', lambda *_: None)


def test_full_pins_cwd_and_failed_steps(monkeypatch, tmp_path):
    from src import api
    monkeypatch.setattr(api, 'load_config', lambda *_: object())
    monkeypatch.setattr(api, 'ModelRouter', lambda *_: object())
    monkeypatch.setattr(api, 'build_graph', lambda *_: object())
    monkeypatch.setattr(api, 'load_environment', lambda *_: {'cwd': 'wrong', 'env': {}})
    def execute(app, request, start):
        assert start['cwd'] == str(tmp_path.resolve())
        return {'final': 'looks successful', 'results': [{'ok': False}]}
    monkeypatch.setattr(api, 'run_orchestration', execute)
    monkeypatch.setattr(api, '_append_costs', lambda *_: None)
    monkeypatch.setattr(api, 'save_environment', lambda *_: pytest.fail('failed execution must not save environment'))
    assert api.run_full('request', workdir=str(tmp_path))['ok'] is False


def test_cross_session_and_concurrent_state(tmp_path):
    first = prepare(tmp_path, '.plan/shared.md', 'session1', 'text')
    record(first, 'pass', 90)
    with pytest.raises(ValueError):
        prepare(tmp_path, '.plan/shared.md', 'session2', '', first['plan_sha256'], 1, [{'old': 'text', 'new': 'x'}])
    pending = prepare(tmp_path, '.plan/shared.md', 'session1', 'next')
    record(prepare(tmp_path, '.plan/shared.md', 'session1', 'reject'), 'reject', 0)
    with pytest.raises(ValueError, match='changed'):
        record(pending, 'pass', 90)
