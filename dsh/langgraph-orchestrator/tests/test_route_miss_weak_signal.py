"""路由 MISS 弱信号改造回归（2026-11-13）。

背景：执行类请求（npm run build / eslint / Select-String 检索 / python 统计）
天然携带「验证/代码/脚本」字眼，旧版 expected_tool 子串匹配把它们全判成假 MISS
（route.jsonl 4 条误报复盘）。本次改造后验收：

  1. 真实误报请求不再产出 MISS（exec 标记 / 反向验证）
  2. 真 MISS 样本（写函数+pytest 断言、修报错自测、按方案逐条改）保持 miss
  3. 弱命中（纯分析）落 decision=ambiguous，不计 miss
  4. why/decision 落盘 route.jsonl 可复核
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src import graph as g


# ---------- 1) 真实误报样本（route.jsonl 2026-11-13 复盘） ----------

REAL_FALSE_POSITIVES = [
    # npm run build +「这是验证代码能否编译的构建」-> 旧版误期望 signal
    ("在 cwd=D:\\repo\\app 下执行生产构建并回报结果：npm run build。"
     "这是验证代码能否编译的构建，不要跳过。", "npm run build"),
    # eslint 校验 + --ext -> 旧版误期望 code_editor
    ("执行 eslint 校验，并回传 exit code 与 stdout/stderr 全文。"
     "命令：node ../node_modules/eslint/bin/eslint.js src/views/home/index-v2.vue --ext .js,.vue",
     "eslint"),
    # Select-String 检索「前后 10 行代码」-> 旧版误期望 code_editor
    ("用 pwsh Select-String 只读检索 \"cannot set property\" 抛错语句所在的行及前后 10 行代码",
     "select-string"),
    # python 统计 jsonl「临时 py 脚本」（真实请求原文含 python -c）-> 旧版误期望 code_editor
    ("列出目录 .sessions 下最新文件后，用 python -c 或临时 py 脚本读取该 jsonl 统计每行 model 出现次数",
     "python -c"),
]


def test_real_false_positives_not_miss():
    for req, _marker in REAL_FALSE_POSITIVES:
        assert g.route_miss(req, "pwsh", g.ROUTE_PLANNER) is None, req[:40]


def test_real_false_positives_expected_none():
    for req, marker in REAL_FALSE_POSITIVES:
        assert g.expected_tool(req) is None, f"{req[:30]} 应被 {marker} 压制"


# ---------- 2) 真 MISS 样本保持（回归锁定，弱信号不许吞掉） ----------

def test_true_misses_preserved():
    miss = g.route_miss("写一个函数并给出 pytest 断言", "planner", g.ROUTE_PLANNER)
    assert miss is not None and miss["expected"] == g._SIGNAL_TOOL
    assert miss["why"].startswith("signal_trigger=")

    miss = g.route_miss("修复这个报错：TypeError，修完自测一下", "pwsh", g.ROUTE_PLANNER)
    assert miss is not None and miss["expected"] == g._SIGNAL_TOOL

    miss = g.route_miss("按方案逐条改掉，最后跑测试", "pwsh", g.ROUTE_PLANNER)
    assert miss is not None and miss["expected"] == g._SIGNAL_TOOL

    # 旧测试同款：「跑 pytest 验证一下」选任何错工具都算 MISS
    for wrong in ("code_editor", "planner", "pwsh", "file_reader", "git"):
        assert g.route_miss("跑 pytest 验证一下", wrong, g.ROUTE_PLANNER) is not None, wrong


# ---------- 3) plan_tools 反向验证（仅 code_editor 路径） ----------

def test_plan_tools_reverse_check_code_editor_only():
    # 「修改时间」携带 code 词，但整份计划全是执行工具 -> 反向豁免
    plan = ["pwsh", "pwsh"]
    assert g.route_miss("列出目录下按修改时间倒序的前 5 个文件", "pwsh",
                        g.ROUTE_PLANNER, plan) is None
    # 期望 code_editor、计划含 code_editor 且 chosen=pwsh：被「后续步骤已含期望工具」
    # 正向豁免（plan[0]=pwsh 定位、第二步 code_editor 生成是正当两步计划）
    plan_mixed = ["pwsh", "code_editor"]
    assert g.route_miss("写一个反转字符串的函数", "pwsh", g.ROUTE_PLANNER, plan_mixed) is None
    # 计划全为执行类工具时反向豁免生效（按已批准设计：整份计划执行形态 -> 不判）
    plan_exec = ["git", "pwsh"]
    assert g.route_miss("写一个反转字符串的函数", "git", g.ROUTE_PLANNER, plan_exec) is None
    # signal 期望不做反向豁免：修复报错类真样本全执行计划仍是真 MISS
    plan_exec = ["pwsh", "file_reader"]
    miss = g.route_miss("修复这个报错，修完自测", "pwsh", g.ROUTE_PLANNER, plan_exec)
    assert miss is not None and miss["expected"] == g._SIGNAL_TOOL


# ---------- 4) 纯分析诉求 -> ambiguous，不计 miss ----------

def test_analysis_only_is_ambiguous_not_miss():
    req = "解释一下这段代码的作用"
    assert g.expected_tool(req) is None
    assert g.route_miss(req, "pwsh", g.ROUTE_PLANNER) is None
    _want, why, base = g._classify_request(req)
    assert base == "ambiguous" and why.startswith("analysis_only=")


# ---------- 5) why / decision 落盘 ----------

def test_log_route_records_decision_and_why(tmp_path, monkeypatch):
    log = tmp_path / "route.jsonl"
    monkeypatch.setattr(g, "_ROUTE_LOG", log)

    # miss 行：why 取自 route_miss
    miss = g.route_miss("写一个函数并给出 pytest 断言", "planner", g.ROUTE_PLANNER)
    g.log_route(user_request="写一个函数并给出 pytest 断言", chosen_tool="planner",
                route_source=g.ROUTE_PLANNER, step_count=1,
                session_id="s2", miss=miss)
    # 执行行：decision=exec
    g.log_route(user_request="npm run build 并回传 exit code", chosen_tool="pwsh",
                route_source=g.ROUTE_PLANNER, step_count=1, session_id="s2")
    # 弱命中行：decision=ambiguous
    g.log_route(user_request="解释一下这段代码的作用", chosen_tool="pwsh",
                route_source=g.ROUTE_PLANNER, step_count=1, session_id="s2")

    rows = [json.loads(l) for l in log.read_text(encoding="utf-8").splitlines() if l.strip()]
    assert len(rows) == 3
    assert rows[0]["decision"] == "miss" and rows[0]["why"].startswith("signal_trigger=")
    assert rows[1]["decision"] == "exec" and rows[1]["miss"] is False
    assert rows[2]["decision"] == "ambiguous" and rows[2]["miss"] is False
    # 旧字段兼容：miss 布尔语义不变
    assert rows[0]["miss"] is True
