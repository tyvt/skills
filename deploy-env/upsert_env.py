#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""upsert_env.py — 部署面板注册表写回（幂等，单事务 + 写锁）。

CLI:
  python upsert_env.py --project portal --env test --port 8092 \
      --frontend-url http://localhost:8092/ --backend-gateway http://127.0.0.1:8080/ \
      --login-user admin --role admin --role-label 管理员 --username admin \
      --secret-ref '{{ov_privacy:deploy_env/portal/test/admin/password}}'

硬约束：
- env ∈ local/dev/test/uat/prod
- port 全局唯一（排除同 project/env 自身，重复 upsert 幂等）
- secret_ref 必须是 {{ov_privacy:...}} 占位符；本脚本无 --password 参数，明文密码无处可传
- 单事务 BEGIN IMMEDIATE 拿写锁，避免并发竞态
- DB 路径可用 --db / DEPLOY_ENV_DB 注入，测试指向临时副本
"""
import argparse
import json
import os
import re
import sqlite3
import sys
from datetime import datetime

DEFAULT_DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'registry.sqlite')
ENVS = ('local', 'dev', 'test', 'uat', 'prod')
PLACEHOLDER_RE = re.compile(r'^\{\{ov_privacy:[^{}]+\}\}$')

PROJECT_FIELDS = ('display_name', 'aliases', 'status')
ENV_FIELDS = (
    'display_name', 'project', 'port', 'port_base', 'dist_root',
    'backend_gateway', 'frontend_url', 'login_user', 'login_selector',
    'secret_ref', 'status',
)
ACCOUNT_FIELDS = ('role_label', 'username', 'secret_ref', 'login_selector', 'sort_order')


class UpsertError(Exception):
    pass


def _validate(body):
    key = str(body.get('project_key') or body.get('project') or '').strip()
    env = str(body.get('env', '')).strip().lower()
    if not key:
        raise UpsertError('missing project_key')
    if env not in ENVS:
        raise UpsertError('bad env: %s (must be one of %s)' % (env, '/'.join(ENVS)))
    v = body.get('secret_ref')
    if v not in (None, '') and not PLACEHOLDER_RE.match(str(v)):
        raise UpsertError('secret_ref must be a {{ov_privacy:...}} placeholder')
    role = body.get('role')
    if role is not None:
        role = str(role).strip()
        if not role:
            raise UpsertError('empty role')
        body['role'] = role
    return key, env


def upsert_registry(body, db_path=DEFAULT_DB, actor='agent'):
    """返回 (ok, payload)。CLI 与看板 API 共用，校验逻辑单一来源。"""
    con = None
    try:
        key, env = _validate(body)
        con = sqlite3.connect(db_path)
        con.row_factory = sqlite3.Row
        con.execute('BEGIN IMMEDIATE')  # 单事务 + 写锁

        # 1) projects：补登记（幂等）
        pset = {k: str(body[k]).strip() for k in PROJECT_FIELDS if body.get(k) not in (None, '')}
        prow = con.execute('SELECT 1 FROM projects WHERE key=?', (key,)).fetchone()
        if not prow:
            con.execute('INSERT INTO projects(key,display_name,aliases,status) VALUES(?,?,?,?)',
                        (key, pset.get('display_name', key), pset.get('aliases', ''), pset.get('status', 'active')))
        elif pset:
            con.execute('UPDATE projects SET %s WHERE key=?' % ','.join('%s=?' % k for k in pset),
                        tuple(pset.values()) + (key,))

        # 2) port 唯一（排除同 project/env 自身）
        port = body.get('port')
        if port not in (None, ''):
            try:
                port = int(port)
            except (TypeError, ValueError):
                raise UpsertError('bad port')
            hit = con.execute('SELECT project_key,env FROM env_registry WHERE port=? '
                              'AND NOT(project_key=? AND env=?)', (port, key, env)).fetchone()
            if hit:
                raise UpsertError('port %d already used by %s/%s' % (port, hit['project_key'], hit['env']))

        # 3) env_registry：SELECT+UPDATE 兜底（不依赖唯一约束，天然幂等）
        eset = {k: body[k] for k in ENV_FIELDS if body.get(k) not in (None, '')}
        if 'port' in eset:
            eset['port'] = port
        if 'project' not in eset:
            eset['project'] = key  # env_registry.project 为 NOT NULL
        eset['updated_at'] = datetime.now().isoformat(timespec='seconds')
        eexists = con.execute('SELECT 1 FROM env_registry WHERE project_key=? AND env=?',
                              (key, env)).fetchone()
        if not eexists:
            cols = ('project_key', 'env') + tuple(eset.keys())
            con.execute('INSERT INTO env_registry(%s) VALUES(%s)' % (','.join(cols), ','.join('?' * len(cols))),
                        (key, env) + tuple(eset.values()))
        elif eset:
            con.execute('UPDATE env_registry SET %s WHERE project_key=? AND env=?' %
                        ','.join('%s=?' % k for k in eset), tuple(eset.values()) + (key, env))

        # 4) env_accounts：可选多角色
        role = body.get('role')
        if role is not None:
            aset = {k: body[k] for k in ACCOUNT_FIELDS if body.get(k) not in (None, '')}
            aexists = con.execute('SELECT 1 FROM env_accounts WHERE project_key=? AND env=? AND role=?',
                                  (key, env, role)).fetchone()
            if not aexists:
                cols = ('project_key', 'env', 'role') + tuple(aset.keys())
                con.execute('INSERT INTO env_accounts(%s) VALUES(%s)' % (','.join(cols), ','.join('?' * len(cols))),
                            (key, env, role) + tuple(aset.values()))
            elif aset:
                con.execute('UPDATE env_accounts SET %s WHERE project_key=? AND env=? AND role=?' %
                            ','.join('%s=?' % k for k in aset), tuple(aset.values()) + (key, env, role))

        # 5) 审计
        con.execute('INSERT INTO deploy_events(ts,project,env,action,result,detail) VALUES(?,?,?,?,?,?)',
                    (datetime.now().isoformat(timespec='seconds'), key, env, 'registry_upsert', 'ok',
                     str(body.get('detail', 'upsert by %s' % actor))[:500]))
        con.commit()
        return True, {'ok': True, 'project_key': key, 'env': env, 'role': role}
    except (UpsertError, sqlite3.Error) as exc:
        if con:
            con.rollback()
        return False, {'ok': False, 'error': str(exc)}
    finally:
        if con:
            con.close()


def _cli():
    ap = argparse.ArgumentParser(description='deploy-env registry upsert (idempotent)')
    ap.add_argument('--project', required=True, help='project_key, e.g. portal')
    ap.add_argument('--env', required=True, choices=ENVS)
    ap.add_argument('--role', default=None, help='账号角色，如 admin/operator/viewer')
    ap.add_argument('--db', default=os.environ.get('DEPLOY_ENV_DB', DEFAULT_DB))
    ap.add_argument('--project-display', default=None, help='env_registry.project 显示名')
    ap.add_argument('--detail', default=None)
    for f in dict.fromkeys(ENV_FIELDS + ACCOUNT_FIELDS + PROJECT_FIELDS + ('aliases',)):
        if f in ('project', 'aliases', 'role_label', 'username', 'sort_order'):
            continue
        ap.add_argument('--' + f.replace('_', '-'), dest=f, default=None)
    ap.add_argument('--role-label', dest='role_label', default=None)
    ap.add_argument('--username', dest='username', default=None)
    ap.add_argument('--sort-order', dest='sort_order', default=None)
    ap.add_argument('--aliases', dest='aliases', default=None)
    args = ap.parse_args()
    body = {k: v for k, v in vars(args).items() if v is not None and k not in ('project', 'db')}
    body['project_key'] = args.project
    if getattr(args, 'project_display', None):
        body['project'] = args.project_display
    ok, payload = upsert_registry(body, db_path=args.db)
    print(json.dumps(payload, ensure_ascii=False))
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    _cli()
