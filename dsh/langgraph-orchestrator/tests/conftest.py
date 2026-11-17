"""测试隔离：把 plan_versions 的计划根指到每用例临时目录，避免污染真实 D:\plan。"""
from pathlib import Path

import pytest

from src import plan_versions


@pytest.fixture(autouse=True)
def _isolated_plan_root(tmp_path, monkeypatch):
    # <planRoot>/<workspace-basename> → tmp_path/<workspace-basename>；
    # 原测试里所有 tmp_path/.plan 断言改为 tmp_path/<ws>/.plan 由下方 alias 兜底：
    # 直接把 PLAN_ROOT 指向 tmp_path 的父级不现实（workspace 名不固定），
    # 故 monkeypatch plan_dir_for 为「tmp_path/.plan」，保持既有断言不变。
    legacy = (tmp_path / ".plan").resolve()
    legacy.mkdir(parents=True, exist_ok=True)
    monkeypatch.setattr(plan_versions, "plan_dir_for", lambda root: legacy)
