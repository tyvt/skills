# -*- coding: utf-8 -*-
"""禅道账号凭据（集中存放，脚本自动读取，避免每次询问）。

优先级（高 -> 低）：
    1. 命令行 --account / --password
    2. 环境变量 ZENTAO_ACCOUNT / ZENTAO_PASSWORD
    3. 本文件下方的默认值
"""

# ====== 禅道默认账号（新禅道 zentao-biz.zhi.com）======
DEFAULT_BASE = "http://zentao-biz.zhi.com"
DEFAULT_ACCOUNT = "tiany"
DEFAULT_PASSWORD = "Field123456"


def resolve(account=None, password=None):
    """返回 (account, password)，按优先级解析。"""
    import os
    acc = account or os.environ.get("ZENTAO_ACCOUNT") or DEFAULT_ACCOUNT
    pwd = password or os.environ.get("ZENTAO_PASSWORD") or DEFAULT_PASSWORD
    return acc, pwd


def base():
    import os
    return os.environ.get("ZENTAO_BASE") or DEFAULT_BASE
