#!/usr/bin/env python3
"""deploy-env 查询后端：入参 project + env -> 环境连接信息（UTF-8 JSON）。

用法:
  python query_env.py <project> <env>
  python query_env.py portal test
  python query_env.py fdc-v3 prod

说明:
  - 只读 registry.sqlite，不改库；密码绝不入库、绝不返回明文。
  - secret_ref 形如 {{ov_privacy:deploy_env/<project>/<env>/password}}，
    仅解析出隐私路径；真实密码需由 agent 在运行期经 OpenViking/ov_privacy 解析。
  - 本轮账号/凭据未补录（login_user 为空）时，password_resolved=False，
    password=None，不返回任何占位假值。
"""
import json
import os
import re
import sqlite3
import sys

DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "registry.sqlite")
SECRET_RE = re.compile(r"^\{\{ov_privacy:([^}]+)\}\}$")

FIELDS = (
    "project,env,port,port_base,dist_root,backend_gateway,frontend_url,"
    "login_user,login_selector,secret_ref,status"
)


def load(project, env):
    """按 (project, env) 精确查一行；未找到抛 KeyError。"""
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    try:
        row = con.execute(
            "SELECT " + FIELDS + " FROM env_registry WHERE project=? AND env=?",
            (project, env),
        ).fetchone()
    finally:
        con.close()
    if row is None:
        raise KeyError("未找到 project=%r env=%r 的环境记录" % (project, env))
    return dict(row)


def resolve_password(secret_ref, login_user):
    """解析 secret_ref 指向的隐私值。本轮不入库、未补录 -> 不返回假值。"""
    m = SECRET_RE.match(secret_ref or "")
    ref_path = m.group(1) if m else None
    result = {
        "password_resolved": False,
        "password": None,
        "secret_ref_path": ref_path,
        "resolve_note": "",
    }
    if not ref_path:
        result["resolve_note"] = "secret_ref 格式非法，未解析"
        return result
    if not login_user:
        result["resolve_note"] = (
            "凭据未补录（login_user 为空，secret_ref=%s）；"
            "本轮只留字段/占位符，不返回密码。请在隐私库补录后再 resolve。"
            % secret_ref
        )
        return result
    result["resolve_note"] = (
        "login_user 已存在，需由 agent 经 OpenViking/ov_privacy 解析 %s；"
        "本脚本不内置任何明文密码。" % secret_ref
    )
    return result


def query(project, env):
    d = load(project, env)
    d.update(resolve_password(d.get("secret_ref"), d.get("login_user")))
    return d


def main(argv):
    if len(argv) != 3:
        print(json.dumps({"error": "用法: query_env.py <project> <env>"}, ensure_ascii=False))
        return 2
    try:
        print(json.dumps(query(argv[1], argv[2]), ensure_ascii=False, indent=2))
        return 0
    except KeyError as e:
        print(json.dumps({"error": str(e)}, ensure_ascii=False))
        return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
