#!/usr/bin/env python3
"""deploy-env 查询 Skill selftest —— 两例：
  portal/test -> 8092
  fdc-v3/prod -> 8104
校验：端口、frontend_url、backend_gateway、secret_ref 路径、不返回明文密码。
运行前设 $env:PYTHONIOENCODING='utf-8' 防中文乱码。
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from query_env import query

CASES = [
    (
        "portal", "test", 8092, "http://localhost:8092",
        "http://192.168.1.199:8081", "deploy_env/portal/test/password",
    ),
    (
        "fdc-v3", "prod", 8104, "http://localhost:8104",
        "http://127.0.0.1:8080", "deploy_env/fdc-v3/prod/password",
    ),
]


def main():
    failed = 0
    for project, env, port, url, gw, ref_path in CASES:
        try:
            d = query(project, env)
        except Exception as e:
            print("FAIL %s/%s: %s" % (project, env, e))
            failed += 1
            continue
        checks = {
            "port": d["port"] == port,
            "frontend_url": d["frontend_url"] == url,
            "backend_gateway": d["backend_gateway"] == gw,
            "secret_ref_path": d.get("secret_ref_path") == ref_path,
            "no_plaintext_password": d.get("password") is None,
            "unresolved": d.get("password_resolved") is False,
        }
        ok = all(checks.values())
        detail = " ".join("%s=%s" % (k, "OK" if v else "BAD") for k, v in checks.items())
        print(
            "%s %s/%s -> port=%s url=%s [%s]"
            % ("PASS" if ok else "FAIL", project, env, d["port"], d["frontend_url"], detail)
        )
        if not ok:
            failed += 1
    print("SELFTEST %s (%d/%d)" % ("PASS" if failed == 0 else "FAIL", len(CASES) - failed, len(CASES)))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
