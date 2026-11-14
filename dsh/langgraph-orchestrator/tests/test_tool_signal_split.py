"""code_edit_with_signal 工具拆分回归。

覆盖（对应计划 step 6-11，全部离线，不调真实模型、不启服务）：
  6  工具已注册、池首不同、在 _NO_LOCAL_READ_TOOLS、op=list 返回两工具
  7  触发词单一来源：直接 import SIGNAL_TRIGGERS 断言渲染结果
  8  op=list 不依赖外部服务
  9  防漏配：工具在 cfg.tools 且 models 非空
 10  未知工具名静默回退可观测（trace 带 WARN）
 11  PLANNER_SYSTEM 渲染无残留占位符
"""
import os
import sys

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src import graph as graph_mod
from src.api import list_tools
from src.config import load_config

CFG_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "config.yaml"
)
NEW = "code_edit_with_signal"
OLD = "code_editor"


# ---------- step 6 / 9：注册与池 ----------

def test_tool_registered_with_models():
    """step 9 防漏配：漏配时 graph.py:930 会静默回退 planner，所以必须显式断言。"""
    cfg = load_config(CFG_PATH)
    assert NEW in cfg.tools, f"{NEW} 未在 config.yaml 注册"
    spec = cfg.tool(NEW)
    assert spec.models, "模型池不能为空（config.py 约束）"
    assert all(m.model for m in spec.models)


def test_two_tools_have_different_primary():
    """拆分的意义就在于主选不同；若相同则本改动无意义。"""
    cfg = load_config(CFG_PATH)
    assert cfg.tool(NEW).models[0].model == "cursor/composer-2.5"
    assert cfg.tool(NEW).models[0].model != cfg.tool(OLD).models[0].model


def test_new_tool_has_flash_fallbacks():
    """composer 挂掉必须能回落，否则单点故障。"""
    cfg = load_config(CFG_PATH)
    pool = [m.model for m in cfg.tool(NEW).models]
    assert any("space-bunny" in m for m in pool[1:]), pool
    assert any("deepseek-v4.1-flash" in m for m in pool[1:]), pool


def test_new_tool_in_no_local_read_set():
    """新工具无磁盘读权限，必须注入 NO_LOCAL_FILE_SYSTEM 防幻觉。"""
    assert NEW in graph_mod._NO_LOCAL_READ_TOOLS
    assert OLD in graph_mod._NO_LOCAL_READ_TOOLS


def test_code_selfcheck_system_exists_and_covers_key_points():
    """[Fix3] 代码工具写前三秒自检：常量存在且覆盖 ESM/pwsh 验证/串行三要点。"""
    sc = graph_mod.CODE_SELFCHECK_SYSTEM
    assert "写前三秒自检" in sc
    assert "ESM" in sc                 # module 类型一致性
    assert "Write-Output" in sc        # pwsh 解析器验证
    assert "串行" in sc                 # 禁并发耗时任务


# ---------- step 7：触发词单一来源 ----------

def test_signal_triggers_render_into_prompt():
    """断言渲染后的 prompt 确实涵盖 SIGNAL_TRIGGERS 里每一类词。

    这样「测的就是分流用的」：不另写一份关键词。
    """
    rendered = graph_mod._render_signal_rules()
    for kind, words in graph_mod.SIGNAL_TRIGGERS.items():
        assert kind in rendered, f"类别 {kind} 未出现在判据文本"
        for w in words:
            assert w in rendered, f"触发词 {w} 未出现在判据文本"


def test_signal_triggers_have_four_categories():
    assert set(graph_mod.SIGNAL_TRIGGERS) == {"跑测试", "修报错", "按方案改", "要验证"}


# ---------- step 11：渲染无残留占位符 ----------

def test_prompt_renders_without_residual_placeholder():
    """PLANNER_SYSTEM 含 JSON 示例大括号；加 {signal} 后仍必须正常 format。"""
    out = graph_mod.PLANNER_SYSTEM.format(
        tools="- X: y", signal=graph_mod._render_signal_rules()
    )
    assert "{signal}" not in out
    assert "{tools}" not in out
    assert NEW in out and OLD in out


# ---------- 硬约束五：按题型选执行档，且不写死模型 id ----------

def test_planner_has_type_routing_rule_without_model_ids():
    """PLANNER_SYSTEM 含【硬约束五：按题型选执行档】，且该段不含任何具体模型 id（防回归）。"""
    out = graph_mod.PLANNER_SYSTEM.format(
        tools="- X: y", signal=graph_mod._render_signal_rules()
    )
    assert "硬约束五" in out and "按题型选执行档" in out
    # 抽取硬约束五段落（到「只输出一个 JSON 数组」为止）做模型 id 断言
    seg = out.split("硬约束五", 1)[1].split("只输出一个 JSON 数组", 1)[0]
    import re
    # provider/model 形态、带 @ 变体、以及常见模型家族前缀均不得出现在该段
    model_id_pat = re.compile(
        r"[a-z0-9_.\-]+/[a-z0-9_.\-@]+|@\d+k|\b(composer|gpt-|glm-|deepseek-|grok|claude|gemini)",
        re.I,
    )
    hits = model_id_pat.findall(seg)
    assert not hits, f"硬约束五段落不应写死模型 id，命中: {hits}"



# ---------- step 8：op=list 不依赖外部服务 ----------

def test_op_list_offline():
    """直接调 list_tools（纯 load_config + 字典组装），不启服务、不调网关。"""
    result = list_tools(CFG_PATH)
    assert result["mode"] == "list"
    assert NEW in result["tools"]
    assert result["tools"][NEW]["models"][0] == "cursor/composer-2.5"


# ---------- step 10：未知工具名回退可观测 ----------

def test_unknown_tool_name_emits_warning_in_trace():
    """未定义工具名时保留 planner 回退（容错不变），但 trace 必须有 WARN。"""
    import inspect

    src_text = inspect.getsource(graph_mod.build_graph)
    assert "[WARN] 未知工具" in src_text
    assert "已回退 planner" in src_text


# ---------- 峰时策略一致性 ----------

def test_new_tool_not_in_peak_glm_tools():
    """新工具必须**排除**在峰时调序之外。

    回归背景（2026-11-13 实测踩到）：若加入 PEAK_GLM_TOOLS，峰时池会变成
    [glm-5.3-flash, composer-2.5]，composer 永远不被执行，拆分意义被完全抵消。
    """
    from src.router import PEAK_GLM_TOOLS

    assert NEW not in PEAK_GLM_TOOLS
    assert OLD in PEAK_GLM_TOOLS


def test_primary_stays_composer_during_peak(now_injected=True):
    """峰时与谷时，池首都必须是 cursor/composer-2.5。"""
    from datetime import datetime

    from src.router import ModelRouter

    cfg = load_config(CFG_PATH)
    router = ModelRouter(cfg)
    peak = datetime(2026, 11, 13, 10, 0)   # 周五 10:00，配置的峰时段
    off = datetime(2026, 11, 13, 20, 0)    # 周五 20:00，谷时
    for moment in (peak, off):
        pool = [m.model for m in router._get_effective_models(NEW, now=moment)]
        assert pool[0] == "cursor/composer-2.5", f"{moment} 池首变成 {pool[0]}"
        assert "workbuddy/space-bunny" in pool, "兜底不得丢失"
