"""LangGraph 编排图：规划 -> 分派 -> 审查 -> 用工具对应模型池执行 -> 汇总。

图结构(StateGraph)：
    plan ──> dispatch ──> security_guard ──> execute ──> (若还有步骤) dispatch ... ──> summarize ──> END

- plan:           用 planner 工具(模型池)把用户需求拆成有序步骤，每步指定 tool
- dispatch:       取下一个待执行步骤
- security_guard: pwsh / 写库必须经安全审查模型审查；解析失败或模型失败则拒绝
- execute:        通过审查后调 ModelRouter.run_tool()，并把环境变更写回 state
- summarize:      用 file_reader 池把各步结果汇总成最终答案
"""
from __future__ import annotations

import fnmatch
import json
import os
import re
import stat
import subprocess
import time
from pathlib import Path
from typing import Any, Dict, List, Optional, TypedDict

from langgraph.graph import END, StateGraph

from .router import ModelRouter, ToolResult


def _usage_dict(res) -> Dict[str, Optional[int]]:
    u = getattr(res, "usage", None)
    return u.as_dict() if u else {
        "prompt_tokens": None, "completion_tokens": None, "total_tokens": None,
    }


def _elapsed(res) -> Optional[float]:
    ok = [a for a in getattr(res, "attempts", []) if a.ok]
    return round(ok[-1].elapsed, 2) if ok else None


class OrchState(TypedDict, total=False):
    user_request: str
    plan: List[Dict[str, str]]        # [{tool, instruction}]
    cursor: int
    results: List[Dict[str, Any]]     # [{tool, ok, content, model_used, usage, elapsed}]
    final: str
    trace: List[str]
    model_calls: List[Dict[str, Any]]  # [{role, model, ok, elapsed, usage}]
    environment_context: Dict[str, Any]  # {cwd, env}
    guard: Dict[str, Any]                # {allow, reason}


PLANNER_SYSTEM = """你是一个任务规划器。把用户需求拆成有序步骤，最少 1 步，最多 5 步。
每一步必须从下列工具中选一个，并给出明确指令：
{tools}
{signal}
重要：要读取/查看磁盘上的本地文件内容，必须用 pwsh 工具执行 Get-Content 等命令；
file_reader / code_editor / code_edit_with_signal 是纯文本摘要/生成器，没有本地磁盘读取权限，
不能用来读取文件。
只输出一个 JSON 数组，形如:
[{{"tool": "工具名", "instruction": "具体做什么"}}]
禁止输出任何解释、前言、Markdown 或多余文字。"""

# 「有可执行验证信号」触发词的唯一定义源。
# 同时用于两处，避免两份词表漂移：(1) 渲染进 PLANNER_SYSTEM 的 {signal} 占位符；
# (2) tests/test_tool_signal_split.py 断言「测的就是分流用的」。
SIGNAL_TRIGGERS: dict = {
    "跑测试": ("跑测试", "单测", "pytest", "vitest", "jest", "npm test", "用例", "覆盖率"),
    "修报错": ("修报错", "报错", "异常", "堆栈", "traceback", "编译不过", "lint 不通过"),
    "按方案改": ("按方案", "按计划", "按文档", "逐条改", "分步实现"),
    "要验证": ("验证", "跑通", "回归", "确认修复", "自测"),
}


def _render_signal_rules() -> str:
    """把 SIGNAL_TRIGGERS 渲染成给规划器的分流判据文本。"""
    lines = [
        "工具选择判据（命中下列任一触发词则用 code_edit_with_signal，全不命中用 code_editor）："
    ]
    for kind, words in SIGNAL_TRIGGERS.items():
        lines.append(f"- {kind}：{'、'.join(words)}")
    lines.append(
        "无验证意图的纯片段生成/改写/格式化/解释，一律用 code_editor。"
    )
    return "\n".join(lines)

# 没有本地读文件能力的模型（file_reader / code_editor）必须带上这条。
NO_LOCAL_FILE_SYSTEM = (
    "严禁在没有本地文件读取权限的情况下输出任何猜测性代码或指导方案。"
    "如果你无法读取目标路径，请只返回一句话："
    "[ERROR] 无法读取本地文件，请宿主提供源码片段。"
    "禁止输出超过 20 个字的说明。"
)
_NO_LOCAL_READ_TOOLS = frozenset({"file_reader", "code_editor", "code_edit_with_signal"})

# ===================================================================== #
# off-task（跑题）检测与真实流量触发率统计
# ===================================================================== #
# 背景（2026-11-13）：code_edit_with_signal 首次冒烟时，composer-2.5 输出了一整篇与提问
# 无关的「博客成稿」，还凭空编造项目路径（source/blogs/...）、不存在的 blog_skill 与
# 风格名。同一提问重放 11 次（含注入 NO_LOCAL system / max_tokens 6144）全部 on-task，
# 即：**低频、无法靠请求参数复现**。因此不能用「偶发」放过，也不应为此改 prompt 就了事；
# 正确做法是上线后**在真实流量上统计触发率**——本节的 JSONL 日志就是那个分母。
#
# 设计约束：正则必须保守（只拦高度特征化词）。误报会直接抬高重跑率与成本，
# 比漏检更伤；宁可漏检，先把统计做起来，后续按日志里的人工复核结果再调。
_OFFTASK_PATTERN = re.compile(
    r"source/blogs\s*"
    r"|blog_skill"
    r"|Mike Dane"
    r"|Giraffa"
    r"|请保存为\s*[*_`]*[\w./-]+\.(?:md|py|ts|tsx|js|vue|json|ya?ml)"
    r"|正在阅读项目内的风格指南",
    re.IGNORECASE,
)

# 只在「代码生成类」工具上统计：摘要类工具输出短、误报意义不大。
_OFFTASK_TOOLS = frozenset({"code_editor", "code_edit_with_signal"})

# 日志位置：与 api.py 的 .sessions 同级，方便一并归档分析。
_OFFTASK_LOG = Path(__file__).resolve().parent.parent / ".sessions" / "offtask.jsonl"


def detect_offtask(content: str) -> Optional[str]:
    """命中返回命中的特征词（便于聚类），否则 None。"""
    if not content:
        return None
    m = _OFFTASK_PATTERN.search(content)
    return m.group(0) if m else None


def log_offtask(
    *, tool: str, model: Optional[str], matched: Optional[str],
    content: str, instruction: str, session_id: str = "anonymous",
) -> None:
    """每次代码类工具调用都记一行（命中与否都记），用于算触发率。

    只记长度与截断片段，不落全文：避免把大输出写进日志。
    写日志失败绝不能影响主流程，所以整段包 try。
    """
    if tool not in _OFFTASK_TOOLS:
        return
    try:
        row = {
            "ts": time.time(),
            "session_id": session_id,
            "tool": tool,
            "model": model,
            "hit": bool(matched),
            "matched": matched,
            "chars": len(content or ""),
            "instruction_head": (instruction or "")[:120],
            "head": (content or "")[:200],
            "tail": (content or "")[-200:] if content and len(content) > 400 else "",
        }
        _OFFTASK_LOG.parent.mkdir(parents=True, exist_ok=True)
        with _OFFTASK_LOG.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")
    except Exception:  # noqa: BLE001 —— 观测日志永不阻断业务
        pass
_GIT_LINE_CAP = 20
_UNMERGED_PREFIX = re.compile(r"^(UU|AA|DD|AU|UA|DU|UD)\s+(.+)$")

_CD = re.compile(r"(?im)^(?:cd|chdir|Set-Location)\s+[\"']?([^\s\"';#]+)")
_EXPORT = re.compile(
    r"(?im)^(?:export\s+|\$env:)([A-Za-z_][A-Za-z0-9_]*)\s*=\s*[\"']?([^\"'\r\n]+)"
)


# 备用高级模型：Cursor 系列已移除（2026-11-12），改用网关内非 Cursor 的最强档。
# 注意：该 fallback 路径被 cfg.scheduling.planner_use_free_hy3 守卫，当前配置为 false，
# 实际不会触发；保留此常量只为将来重新启用时指向有效模型。
PLANNER_FALLBACK_MODEL = "autoclaw-cn/zai_glm-5.3-flash"

# 命中任一关键词即视为需要深度推理，免费 hy3 的规划不可靠，直接升级。
_HARD_TASK = re.compile(r"死锁|深度推理|疑难|竞态|内存泄漏|递归爆栈|分布式事务")


def plan_needs_fallback(content: str, steps: List[Dict[str, str]], user_request: str) -> bool:
    """判定规划是否需要升级给备用高级模型重做。

    三种情况任一成立即降级：输出无法解析、拆出的步骤少于 1 步、
    或用户需求命中高复杂度关键词。
    """
    parsed = _extract_json_array(content)
    if content is None or not parsed:
        return True
    if len(steps) < 1:
        return True
    return bool(_HARD_TASK.search(user_request or ""))


def _extract_json_array(text: str) -> List[Dict[str, str]]:
    """从模型输出里稳妥地提取 JSON 数组。"""
    text = text.strip()
    if text.startswith("```"):
        text = text.split("```", 2)[1]
        if text.startswith("json"):
            text = text[4:]
        text = text.strip()
    start, end = text.find("["), text.rfind("]")
    if start == -1 or end == -1:
        return []
    try:
        data = json.loads(text[start : end + 1])
        return [d for d in data if isinstance(d, dict) and d.get("tool")]
    except Exception:
        return []


def _extract_json_object(text: str) -> Optional[dict]:
    """去掉 ```json 围栏，再取第一个 { 到最后一个 }。失败返回 None，不抛。"""
    if not text:
        return None
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text, count=1, flags=re.I)
    text = re.sub(r"\s*```\s*$", "", text, count=1)
    start, end = text.find("{"), text.rfind("}")
    if start == -1 or end <= start:
        return None
    try:
        data = json.loads(text[start : end + 1])
    except json.JSONDecodeError:
        return None
    return data if isinstance(data, dict) else None


def _default_env(state: OrchState) -> Dict[str, Any]:
    ctx = state.get("environment_context") or {}
    return {
        "cwd": ctx.get("cwd", os.getcwd()),
        "env": dict(ctx.get("env") or {}),
        "recent_env": dict(ctx.get("recent_env") or {}),
    }


def _apply_env_delta(ctx: Dict[str, Any], command: str, content: str) -> Dict[str, Any]:
    """只从最终命令提取 cd/export；回执只认 ENV_UPDATE，避免命令被回显后双计。"""
    cwd = ctx["cwd"]
    env = dict(ctx["env"])
    recent: Dict[str, str] = {}
    for match in _CD.finditer(command or ""):
        raw = match.group(1).strip()
        cwd = raw if os.path.isabs(raw) else os.path.normpath(os.path.join(cwd, raw))
    for match in _EXPORT.finditer(command or ""):
        key, val = match.group(1), match.group(2).strip()
        env[key] = val
        recent[key] = val
    parsed = _extract_json_object(content)
    if parsed:
        update = parsed.get("ENV_UPDATE") if isinstance(parsed.get("ENV_UPDATE"), dict) else parsed
        if isinstance(update, dict):
            if isinstance(update.get("cwd"), str) and update["cwd"].strip():
                cwd = update["cwd"].strip()
            if isinstance(update.get("env"), dict):
                delta = {str(k): str(v) for k, v in update["env"].items()}
                env.update(delta)
                recent.update(delta)
    return {"cwd": cwd, "env": env, "recent_env": recent}


# 审查白名单：以这些只读命令开头，且没有命令拼接符，才跳过 Grok。
_WHITELIST_PREFIX = re.compile(
    r"^(?:请|执行|运行)?\s*"
    r"(Get-ChildItem|Get-Location|Get-Date|Test-Path|git\s+status|git\s+diff|git\s+log|python\s+-m\s+pytest)\b",
    re.I,
)
_DANGEROUS_CHARS = re.compile(r"[;&|`]|\$\(|>>?|<")

# git 只读子命令（status/diff/log）的写/执行面参数黑名单（黑名单制而非白名单制，
# 避免打断 --grep/--author/-S 等常用只读带值参数）。命中即不放行，回退终审。
_GIT_WRITE_ARGS = re.compile(
    r"(?i)--output(?:=|\s)|--ext-diff\b|--upload-pack\b|--exec\b|--receive-pack\b"
)

# Get-Content / Select-String 窄放行（v2 计划，见 .plan/6f0992433bb9.md）：
# 仅显式 cmdlet 全名 + 当前目录相对路径 + 允许参数白名单，其余一律回退 flash→grok 原链路（fail-safe）。
# 已知限制：不支持含空格/中文/转义引号的路径（未命中即回退，无安全风险，只多花升级成本）；
# 'token'、'credential' 为子串匹配，可能误伤正常文件名（如 tokenizers.py），同样只增加升级成本。
_SENSITIVE_NAME = re.compile(
    r"(?i)\.env\b|id_rsa|id_ed25519|\.pem$|credential|secret|token"
)
_READ_CMD = re.compile(
    r"^(?:(?:请|执行|运行)(?:命令)?[：:]?\s*)?(?:\$[\w]{1,20}\s*=\s*)?(Get-Content|Select-String)\b(.*)$",
    re.I | re.S,
)
_READ_ARGS = re.compile(
    r"^(?:\s*"
    r"(?:-Path\s+(?!-)['\"]?[\w.-]+(?:[\\/][\w.-]+)*['\"]?"
    r"|(?!-)['\"]?[\w.-]+(?:[\\/][\w.-]+)*['\"]?"
    r"|-Pattern\s+['\"][^'\"]{0,200}['\"]"
    r"|-Encoding\s+['\"]?[\w]+['\"]?"
    r"|-Raw\b"
    r"|-TotalCount\s+\d{1,4}(?!\d)"
    r"))*\s*$"
)


def _readonly_read_ok(command: str) -> bool:
    """Get-Content / Select-String 的窄放行：相对路径、白名单参数、无敏感文件名。"""
    m = _READ_CMD.match(command.strip())
    if not m:
        return False
    args = m.group(2).strip()
    if not args or _SENSITIVE_NAME.search(args):
        return False
    if re.search(r"(?i)[A-Za-z]:\\|^\\\\|\.\.|[*?]", args):
        return False
    return _READ_ARGS.match(args) is not None


_ABS_READ_CMD = re.compile(
    r"^(?:(?:请|执行|运行)(?:命令)?[：:]?\s*)?(Get-Content|Select-String)\b(.*)$",
    re.I | re.S,
)
# 敏感 basename 名单（整名 fnmatch）
_SENSITIVE_GLOBS = (
    ".env*", "id_rsa*", "id_ed25519*", "*.pem", "*.key", "*.pfx", "*.p12",
    "kubeconfig*", ".npmrc", ".git-credentials",
)
# 敏感词匹配：stem 末段命中 secret/credential（含 mysecret 连写），不误杀 secretary/tokenizer
_SENSITIVE_WORD = re.compile(r"(?:^|[._-])(?:my)?(?:secret|credential)s?$")


def _is_sensitive_basename(basename: str) -> bool:
    b = basename.lower()
    if any(fnmatch.fnmatch(b, g) for g in _SENSITIVE_GLOBS):
        return True
    stem = b.rsplit(".", 1)[0] if "." in b and not b.startswith(".") else b
    return _SENSITIVE_WORD.search(stem) is not None


def _under_repo_roots(path: str, roots: List[str]) -> bool:
    try:
        pn = os.path.normcase(os.path.realpath(path))
    except Exception:
        return False
    for r in roots or []:
        try:
            rn = os.path.normcase(os.path.realpath(r))
        except Exception:
            continue
        if pn == rn or pn.startswith(rn + os.sep):
            return True
    return False


def _path_is_link_chain(path: str) -> bool:
    """abspath 后逐段 lstat，任一段是 symlink / Windows reparse point 即为真。"""
    try:
        ap = os.path.abspath(path)
    except Exception:
        return True
    cur = os.path.splitdrive(ap)[0] + os.sep if os.path.splitdrive(ap)[0] else os.sep
    parts = ap.replace("\\", "/").split("/")
    for part in parts:
        if not part or (len(part) == 2 and part[1] == ":"):
            cur = part + os.sep if part.endswith(":") else cur
            continue
        cur = os.path.join(cur, part)
        try:
            st = os.lstat(cur)
        except OSError:
            # 路径段不存在（如通配），交给后续 fail-safe
            return True
        if stat.S_ISLNK(st.st_mode):
            return True
        # Windows junction / symlink
        if hasattr(st, "st_file_attributes") and (
            st.st_file_attributes & getattr(stat, "FILE_ATTRIBUTE_REPARSE_POINT", 0x400)
        ):
            return True
    return False


def _readonly_read_ok_abs(command: str, roots: List[str]) -> bool:
    """绝对路径 Get-Content/Select-String 只读放行：仅 repoRoots 下、无 symlink/reparse、
    无敏感名、无通配/UNC/..；参数不确定一律回退不放行。"""
    s = command.strip()
    m = _ABS_READ_CMD.match(s)
    if not m:
        return False
    rest = m.group(2).strip()
    if not rest:
        return False
    # 解析候选路径：位置参数 / -Path / -LiteralPath 的值；其余形参值跳过；含空格未引号→回退
    tokens = rest.split()
    paths: List[str] = []
    i = 0
    known_flags = {
        "-path", "-literalpath", "-pattern", "-encoding", "-raw",
        "-totalcount", "-casesensitive", "-notmatch", "-simplematch",
        "-allmatches", "-context", "-list",
    }
    while i < len(tokens):
        tk = tokens[i]
        low = tk.lower()
        if low in ("-path", "-literalpath"):
            if i + 1 >= len(tokens):
                return False
            paths.append(tokens[i + 1].strip("'\""))
            i += 2
            continue
        if tk.startswith("-"):
            if low not in known_flags:
                return False  # 未知形参 → 回退
            # 取下一 token 作该形参值（除了不带值的开关）
            if low in ("-raw", "-casesensitive", "-notmatch", "-simplematch", "-allmatches", "-list"):
                i += 1
                continue
            if i + 1 >= len(tokens):
                return False
            i += 2
            continue
        # 位置参数
        paths.append(tk.strip("'\""))
        i += 1
    if not paths:
        return False
    for p in paths:
        if not p or " " in p or "\t" in p:
            return False  # 含空格未正确引号 → 回退
        # 拒绝 UNC、通配、..
        if p.startswith("\\\\") or ".." in p or "*" in p or "?" in p:
            return False
        if not re.match(r"(?i)^[A-Za-z]:[\\/]|^\\\\", p):
            # 非绝对路径 → 不归本函数（回退，让 _readonly_read_ok 处理相对）
            return False
        if _is_sensitive_basename(os.path.basename(p)):
            return False
        if _path_is_link_chain(p):
            return False
        if not _under_repo_roots(p, roots):
            return False
    return True


_RISK_WORDS = re.compile(
    r"(?<!不要)(?<!不)删除|清空|格式化|递归|Remove-Item|\brm\b|drop\s+table|truncate|shutdown",
    re.I,
)

# 密钥模式扫描（summarize 失败回退尾部脱敏用）
_SECRET_PATTERN = re.compile(
    r"(?i)(sk-[A-Za-z0-9]{8,}|AKIA[A-Z0-9]{8,}|bearer\s+[A-Za-z0-9._-]{10,}|api[_-]?key\s*[=:])"
)

def _safe_write_command(command: str) -> bool:
    """只放行当前目录下建目录，或写相对路径的 json/txt/md。"""
    s = (command or "").strip()
    if not s or _DANGEROUS_CHARS.search(s) or ".." in s or re.search(r"[A-Za-z]:\\", s):
        return False
    if re.search(r"(?i)\b(Remove-Item|del|erase|rmdir|format|stop-process|invoke-expression|iex)\b", s):
        return False
    if re.match(r"(?i)^New-Item\s+-ItemType\s+Directory\b", s):
        return True
    found = re.match(r"(?i)^Set-Content\s+-Path\s+(['\"]?)(\S+)\1", s)
    if not found:
        return False
    path = found.group(2).strip("'\"")
    return re.match(
        r"(?i)^(?:\.[\\/])?[\w.-]+(?:[\\/][\w.-]+)*\.(json|txt|md)$", path
    ) is not None


def _whitelist_bypass(text: str, deny_patterns, roots: Optional[List[str]] = None) -> bool:
    """本地极速通道：命中只读前缀或只读窄放行、无危险字符、未命中 deny_regex 才放行。"""
    s = (text or "").strip()
    if not s or _DANGEROUS_CHARS.search(s):
        return False
    if any(p.search(s) for p in deny_patterns):
        return False
    if _WHITELIST_PREFIX.match(s) is not None:
        # git 只读子命令（status/diff/log）额外过写/执行面参数黑名单
        if re.match(r"(?i)^git\s+", s) and _GIT_WRITE_ARGS.search(s):
            return False
        return True
    if _readonly_read_ok(s):
        return True
    # E1 绝对路径只读放行（env 开关默认关，灰度开）
    if os.environ.get("DSH_ORCH_READONLY_ALLOW_ABS", "0") != "0" and roots:
        return _readonly_read_ok_abs(s, roots)
    return False


def _clip(text: str, head: int = 1000, tail: int = 1000) -> str:
    """保留头尾，中间替换。短于头尾之和则原样返回。"""
    if not text or len(text) <= head + tail:
        return text or ""
    return text[:head] + "\n...[已截断]...\n" + text[-tail:]


def _prompt_context(ctx: Dict[str, Any]) -> str:
    """只发当前工作目录和上一步新增的环境变量，不发历史步骤。"""
    slim = {"cwd": ctx.get("cwd"), "env": ctx.get("recent_env") or {}}
    return json.dumps(slim, ensure_ascii=False)


def _extract_command(text: str) -> str:
    parsed = _extract_json_object(text)
    if parsed and isinstance(parsed.get("command"), str):
        return parsed["command"].strip()
    text = re.sub(r"^```(?:powershell|ps1)?\s*", "", (text or "").strip(), count=1, flags=re.I)
    text = re.sub(r"\s*```\s*$", "", text, count=1)
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    return lines[0] if lines else ""


def _changes_directory(command: str) -> bool:
    """Recognize directory commands at command positions, preserving quoted arguments."""
    tokens = re.findall(
        r'''(?s)<\#.*?\#>|\#[^\r\n]*|'(?:''|[^'])*'|"(?:`.|[^"`])*"|[;|&{}()\r\n=]|[^\s;|&{}()=]+''',
        command,
    )
    names = {'set-location', 'cd', 'chdir', 'sl', 'pushd', 'popd', 'push-location', 'pop-location', 'cd..'}
    at_command = True
    invoked = False
    for token in tokens:
        if token.startswith(('#', '<#')):
            continue
        if token in {';', '|', '&', '{', '}', '(', ')', '\r', '\n', '='}:
            at_command = True
            invoked = token == '&'
            continue
        if at_command:
            if token == '.':
                invoked = True
                continue
            quoted = token.startswith(('\"', "'"))
            name = token[1:-1] if quoted else token
            name = name.replace('`', '').rsplit('\\', 1)[-1].lower()
            if (not quoted or invoked) and name in names:
                return True
            at_command = False
            invoked = False
    return False


def _run_pwsh(command: str, cwd: str, env: Dict[str, str], timeout: float) -> str:
    if not cwd or not os.path.isabs(cwd) or not os.path.isdir(cwd):
        raise ValueError("workdir must be an existing absolute directory")
    if _changes_directory(command):
        raise ValueError('directory switching commands are forbidden; use explicit workdir')
    merged = {**os.environ, **{str(k): str(v) for k, v in (env or {}).items()}}
    from .execution import _execute
    result = _execute(
        ['powershell.exe', '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', command],
        timeout, cwd, 'legacy-' + str(os.getpid()), env=merged,
    )
    if not result['ok']:
        raise subprocess.CalledProcessError(result['exitCode'], command, output=result['content'])
    return result['content']


def _limit_lines(text: str, cap: int = _GIT_LINE_CAP) -> str:
    """超过 cap 行则截断，截断说明占最后一行，总行数不超过 cap。"""
    lines = (text or "").splitlines()
    if len(lines) <= cap:
        return "\n".join(lines)
    hidden = len(lines) - (cap - 1)
    return "\n".join(lines[: cap - 1] + [f"...[截断 {hidden} 行]"])


def _unmerged_names(status: str) -> List[str]:
    names: List[str] = []
    for line in (status or "").splitlines():
        matched = _UNMERGED_PREFIX.match(line.strip())
        if matched:
            names.append(matched.group(2).strip().strip('"'))
    return names


def format_git_report(
    status: str,
    diff_stat: str,
    *,
    rebase: bool = False,
    stash_conflict: bool = False,
) -> str:
    """默认只回 status --short 与 diff --stat；冲突只回文件名。"""
    names = _unmerged_names(status)
    if rebase or stash_conflict or names:
        return _limit_lines("\n".join(["Conflict detected", *names]))
    parts = [
        "git status --short",
        (status or "").rstrip(),
        "",
        "git diff --stat",
        (diff_stat or "").rstrip(),
    ]
    return _limit_lines("\n".join(parts).strip("\n"))


def _sanitize_git_text(text: str) -> str:
    """rebase/stash 冲突不回灌 Git 建议文本；其余 Git 输出超过 20 行就截断。"""
    raw = text or ""
    names = _unmerged_names(raw)
    for line in raw.splitlines():
        both = re.match(
            r"(?i)^(?:both added|both modified|deleted by (?:them|us)):\s+(.+)$",
            line.strip(),
        )
        if both:
            names.append(both.group(1).strip())
        conflict = re.search(r"(?i)CONFLICT \([^)]+\):.*?\s(\S+)\s*$", line)
        if conflict:
            names.append(conflict.group(1).strip().strip('"'))
    conflicted = bool(names) or bool(
        re.search(r"(?i)\b(rebase|stash)\b[\s\S]{0,80}\bconflict\b|\bconflict\b[\s\S]{0,80}\b(rebase|stash)\b", raw)
    )
    if conflicted or re.search(r"(?i)^CONFLICT\b", raw, re.M):
        uniq = list(dict.fromkeys(names))
        return _limit_lines("\n".join(["Conflict detected", *uniq]))
    return _limit_lines(raw)


def _git_dir_exists(cwd: str, env: Dict[str, str], timeout: float, name: str) -> bool:
    try:
        completed = subprocess.run(
            ["git", "rev-parse", "--git-path", name],
            cwd=cwd,
            env=env,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=timeout,
            shell=False,
        )
    except (OSError, subprocess.TimeoutExpired):
        return False
    path = (completed.stdout or "").strip()
    if completed.returncode != 0 or not path:
        return False
    full = path if os.path.isabs(path) else os.path.join(cwd, path)
    return os.path.isdir(full)


def _run_git_brief(cwd: str, env: Dict[str, str], timeout: float, instruction: str) -> str:
    """本地 Git 摘要：不经模型，不回灌大段建议。"""
    if not cwd or not os.path.isabs(cwd) or not os.path.isdir(cwd):
        raise ValueError("workdir must be an existing absolute directory")
    merged = {**os.environ, **{str(k): str(v) for k, v in (env or {}).items()}}

    def capture(args: List[str]) -> str:
        try:
            completed = subprocess.run(
                ["git", *args],
                cwd=cwd,
                env=merged,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=timeout,
                shell=False,
            )
        except (OSError, subprocess.TimeoutExpired) as exc:
            return f"git {' '.join(args)} failed: {exc}"[:120]
        if completed.returncode != 0 and not (completed.stdout or "").strip():
            err = (completed.stderr or "").strip().splitlines()
            return err[0][:120] if err else f"git {' '.join(args)} exit={completed.returncode}"
        return completed.stdout or ""

    status = capture(["status", "--short"])
    diff_stat = capture(["diff", "--stat"])
    rebase = _git_dir_exists(cwd, merged, timeout, "rebase-merge") or _git_dir_exists(
        cwd, merged, timeout, "rebase-apply"
    )
    stash_conflict = bool(re.search(r"(?i)stash", instruction or "")) and bool(_unmerged_names(status))
    return format_git_report(status, diff_stat, rebase=rebase, stash_conflict=stash_conflict)


def build_graph(router: ModelRouter, cfg):
    """构造并编译 LangGraph 编排图。"""
    guarded = set(cfg.security.guarded_tools)
    deny_patterns = [re.compile(p) for p in cfg.security.deny_regex]
    guard_tool = cfg.security.guard_tool

    def node_plan(state: OrchState) -> OrchState:
        tools_desc = "\n".join(
            f"- {t.name}: {t.description}"
            for t in cfg.tools.values()
            if t.name not in {guard_tool, cfg.security.fast_guard_tool}
        )
        sys = PLANNER_SYSTEM.format(tools=tools_desc, signal=_render_signal_rules())
        messages = [
            {"role": "system", "content": sys},
            {"role": "user", "content": state["user_request"]},
        ]
        res = router.run_tool("planner", messages)
        plan = _extract_json_array(res.content) if res.ok else []
        trace = list(state.get("trace", []))
        calls = list(state.get("model_calls", []))
        calls.append({
            "role": "plan", "model": res.model_used, "ok": res.ok,
            "elapsed": _elapsed(res), "usage": _usage_dict(res),
        })
        # 质量兜底：解析失败、零步骤或高复杂度任务，升级给备用高级模型重规划。
        if cfg.scheduling.planner_use_free_hy3 and plan_needs_fallback(
            res.content, plan, state["user_request"]
        ):
            trace.append(
                "[WARNING] 规划异常或不够详尽，已自动升级给备用高级模型重新规划"
            )
            res = router.run_tool("planner", messages, force_model=PLANNER_FALLBACK_MODEL)
            plan = _extract_json_array(res.content) if res.ok else []
            calls.append({
                "role": "plan_fallback", "model": res.model_used, "ok": res.ok,
                "elapsed": _elapsed(res), "usage": _usage_dict(res),
            })
        plan = plan[:5]
        if not plan:
            plan = [{"tool": "planner", "instruction": state["user_request"]}]
        trace.append(f"plan via {res.model_used or 'FALLBACK-FAIL'}: {len(plan)} steps")
        return {"plan": plan, "cursor": 0, "results": [], "trace": trace, "model_calls": calls}

    def node_dispatch(state: OrchState) -> OrchState:
        return state

    def node_security_guard(state: OrchState) -> OrchState:
        step = state["plan"][state.get("cursor", 0)]
        tool_name = step.get("tool", "")
        instruction = step.get("instruction", "")
        trace = list(state.get("trace", []))
        if tool_name not in guarded:
            trace.append(f"guard skip tool={tool_name}")
            return {"guard": {"allow": True, "reason": "not guarded"}, "trace": trace}
        _roots = [state.get("cwd") or state.get("root") or os.getcwd()]
        if _whitelist_bypass(instruction, deny_patterns, _roots):
            if _readonly_read_ok(instruction):
                kind = "readonly-read"
            elif os.environ.get("DSH_ORCH_READONLY_ALLOW_ABS", "0") != "0" and _readonly_read_ok_abs(instruction, _roots):
                kind = "readonly-abs"
            else:
                kind = "prefix"
            trace.append(f"guard ALLOW (bypass local rule[{kind}]) tool={tool_name}")
            return {
                "guard": {"allow": True, "reason": "bypass local rule"},
                "trace": trace,
            }
        calls = list(state.get("model_calls", []))
        fast_tool = cfg.security.fast_guard_tool
        risky = bool(_RISK_WORDS.search(instruction)) or any(
            p.search(instruction) for p in deny_patterns
        )
        if fast_tool and fast_tool in cfg.tools and not risky:
            res = router.run_tool(
                fast_tool,
                [
                    {"role": "system", "content": (
                        "你是命令一审。只输出 JSON："
                        '{"allow": true或false, "reason": "一句话"}。'
                        "新建文件夹，或向当前目录及其子目录里的 .json/.txt/.md "
                        "写入文本时，allow 才能为 true。删除、递归、绝对路径和其他命令一律 false。"
                    )},
                    {"role": "user", "content": instruction},
                ],
            )
            calls.append({
                "role": "guard_fast", "tool": tool_name, "model": res.model_used,
                "ok": res.ok, "elapsed": _elapsed(res), "usage": _usage_dict(res),
            })
            parsed = _extract_json_object(res.content) if res.ok else None
            if isinstance(parsed, dict) and parsed.get("allow") is True:
                trace.append(f"guard ALLOW (flash prescreen) tool={tool_name}")
                return {
                    "guard": {"allow": True, "reason": "flash prescreen"},
                    "trace": trace,
                    "model_calls": calls,
                }
            why = (
                str(parsed.get("reason") or "flash denied")
                if isinstance(parsed, dict)
                else "flash 无有效 JSON"
            )
            trace.append(f"guard flash escalate tool={tool_name} reason={why}")

        if tool_name == "pwsh":
            # pwsh 的终审延迟到命令生成后（node_execute）：真实命令才能做白名单窄放行，
            # 命中免 grok，未命中照旧升级终审（fail-safe）。
            trace.append(f"guard defer tool={tool_name} (command-level review)")
            return {
                "guard": {"allow": True, "reason": "defer-to-command"},
                "trace": trace,
                "model_calls": calls,
            }

        hits = [p.pattern for p in deny_patterns if p.search(instruction)]
        ctx = _default_env(state)
        sys = (
            "你是命令审查器。只输出一个 JSON 对象："
            '{"allow": true或false, "reason": "一句话"}。'
            "不要 Markdown，不要前后缀。"
            "如果命令是清理临时文件或合法业务（例如删除临时表、删除远端功能分支），allow=true；"
            "如果是破坏系统或核心数据（删库、清空业务表、递归强删系统目录），allow=false。"
            "正则命中只是线索，不是自动拒绝。"
        )
        user = json.dumps(
            {
                "tool": tool_name,
                "instruction": instruction,
                "regex_hits": hits,
                "environment_context": {"cwd": ctx.get("cwd"), "env": ctx.get("recent_env") or {}},
            },
            ensure_ascii=False,
        )
        res = router.run_tool(
            guard_tool,
            [{"role": "system", "content": sys}, {"role": "user", "content": user}],
        )
        parsed = _extract_json_object(res.content) if res.ok else None
        if not isinstance(parsed, dict) or not isinstance(parsed.get("allow"), bool):
            reason = (
                "审查模型无有效 JSON，已拒绝"
                if res.ok
                else f"审查模型失败: {res.content[:120]}"
            )
            trace.append(f"guard DENY tool={tool_name} reason={reason}")
            calls.append({
                "role": "guard", "tool": tool_name, "model": res.model_used, "ok": res.ok,
                "elapsed": _elapsed(res), "usage": _usage_dict(res),
            })
            return {"guard": {"allow": False, "reason": reason}, "trace": trace, "model_calls": calls}

        allow = parsed["allow"]
        reason = str(parsed.get("reason") or ("ok" if allow else "blocked"))
        trace.append(f"guard {'ALLOW' if allow else 'DENY'} tool={tool_name} reason={reason}")
        calls.append({
            "role": "guard", "tool": tool_name, "model": res.model_used, "ok": res.ok,
            "elapsed": _elapsed(res), "usage": _usage_dict(res),
        })
        return {"guard": {"allow": allow, "reason": reason}, "trace": trace, "model_calls": calls}

    def node_execute(state: OrchState) -> OrchState:
        i = state.get("cursor", 0)
        step = state["plan"][i]
        requested = step.get("tool", "planner")
        instruction = step.get("instruction", "")
        ctx = _default_env(state)
        guard = state.get("guard") or {"allow": True, "reason": "no guard"}
        trace = list(state.get("trace", []))
        results = list(state.get("results", []))

        if requested in guarded and not guard.get("allow", False):
            results.append(
                {
                    "tool": requested,
                    "instruction": instruction,
                    "ok": False,
                    "content": f"security_guard 拦截: {guard.get('reason', 'blocked')}",
                    "model_used": None,
                    "failed_models": [],
                }
            )
            trace.append(f"execute {i+1}/{len(state['plan'])} tool={requested} blocked")
            return {
                "results": results,
                "cursor": i + 1,
                "trace": trace,
                "environment_context": ctx,
            }

        if requested == "git":
            if cfg.execution.mock_execution:
                content, ok = "[mock] git status --short && git diff --stat", True
            else:
                try:
                    content = _run_git_brief(
                        ctx.get("cwd") or "", ctx.get("env") or {}, cfg.execution.pwsh_timeout, instruction
                    )
                    ok = not content.startswith("git ") or "failed" not in content
                except (OSError, subprocess.TimeoutExpired, ValueError) as exc:
                    content, ok = f"git brief failed: {exc}"[:120], False
            results.append(
                {
                    "tool": "git",
                    "instruction": instruction,
                    "ok": ok,
                    "content": content,
                    "model_used": None,
                    "failed_models": [],
                }
            )
            trace.append(
                f"execute {i+1}/{len(state['plan'])} tool=git mock={cfg.execution.mock_execution} "
                f"ok={ok} cwd={ctx.get('cwd')}"
            )
            return {
                "results": results,
                "cursor": i + 1,
                "trace": trace,
                "environment_context": ctx,
            }

        if requested == "pwsh":
            gen = router.run_tool(
                "pwsh",
                [
                    {"role": "system", "content": (
                        "只输出一行 PowerShell 命令，不要解释。"
                        "单测用 python -m pytest -q --tb=short；"
                        "Git 用 git status --short、git switch -c <name>、git add -- <path>、"
                        "git commit -m <msg>。不要生成 push --force、reset --hard 或 rm -rf。"
                        "读取文件/检索文本时，直接输出一条裸命令："
                        "Get-Content <相对路径>（可带 -Raw/-Encoding UTF8/-TotalCount N）或 "
                        "Select-String -Path <相对路径> -Pattern \"关键词\"；"
                        "不要加变量赋值（$x = ...）、Set-Location、管道后处理或正文解析代码，"
                        "由调用方自己解读返回内容。"
                    )},
                    {
                        "role": "user",
                        "content": "ENVIRONMENT_CONTEXT:\n"
                        + _prompt_context(ctx)
                        + "\n\n"
                        + instruction,
                    },
                ],
            )
            command = _extract_command(gen.content) if gen.ok else ""
            guard_reason = (state.get("guard") or {}).get("reason")
            bypassed = guard_reason == "bypass local rule"
            escalated = None
            if (
                command
                and guard_reason in ("flash prescreen", "defer-to-command")
                and not _safe_write_command(command)
            ):
                _roots = [state.get("cwd") or ctx.get("cwd") or os.getcwd()]
                if _whitelist_bypass(command, deny_patterns, _roots):
                    # 生成的命令本身命中只读窄放行（Get-Content/Select-String 相对路径等），
                    # 免 grok 终审，直接执行。审计：trace 带 readonly-read 标记便于量化降本。
                    if guard_reason == "defer-to-command":
                        trace.append("guard ALLOW (bypass local rule[readonly-read]) tool=pwsh")
                else:
                    escalated = router.run_tool(
                        guard_tool,
                        [
                            {"role": "system", "content": (
                                "你是命令终审。只输出 JSON："
                                '{"allow": true或false, "reason": "一句话"}。'
                                "破坏系统或核心数据则 allow=false。"
                            )},
                            {"role": "user", "content": command},
                        ],
                    )
                    parsed = _extract_json_object(escalated.content) if escalated.ok else None
                    if not isinstance(parsed, dict) or parsed.get("allow") is not True:
                        reason = (
                            str(parsed.get("reason"))
                            if isinstance(parsed, dict)
                            else "终审无有效 JSON"
                        )
                        content, ok, model_used = (
                            f"security_guard 终审拦截: {reason}: {command}",
                            False,
                            gen.model_used,
                        )
                        command = ""
                        trace.append(f"guard DENY (final) tool=pwsh reason={reason}")
                    else:
                        trace.append("guard ALLOW (final) tool=pwsh")
            if command and bypassed and not _whitelist_bypass(
                command, deny_patterns, [state.get("cwd") or ctx.get("cwd") or os.getcwd()]
            ):
                content, ok, model_used = (
                    f"本地白名单复检未通过，未执行: {command}", False, gen.model_used
                )
            elif not command:
                content, ok, model_used = f"未生成命令: {gen.content}", False, gen.model_used
            elif cfg.execution.mock_execution:
                content = f"[mock] $ {command}\n(未执行。模型回执)\n{gen.content}"
                ok, model_used = True, gen.model_used
            else:
                try:
                    content = _run_pwsh(
                        command, ctx["cwd"], ctx.get("env") or {}, cfg.execution.pwsh_timeout
                    )
                    ok, model_used = True, gen.model_used
                except subprocess.CalledProcessError as e:
                    content = e.output or f"exit={e.returncode}"
                    ok, model_used = False, gen.model_used
                except (subprocess.TimeoutExpired, OSError, ValueError) as e:
                    from .execution import _result
                    content = _result(False, f"$ {command}\n{type(e).__name__}: {e}")['content']
                    ok, model_used = False, gen.model_used
            new_ctx = _apply_env_delta(ctx, command or "", content) if ok else ctx
            results.append(
                {
                    "tool": "pwsh",
                    "instruction": instruction,
                    "ok": ok,
                    "content": content,
                    "model_used": model_used,
                    "elapsed": _elapsed(gen),
                    "usage": _usage_dict(gen),
                    "failed_models": gen.failed_models if hasattr(gen, "failed_models") else [],
                }
            )
            calls = list(state.get("model_calls", []))
            calls.append({
                "role": "generate_command", "tool": "pwsh", "model": gen.model_used,
                "ok": gen.ok, "elapsed": _elapsed(gen), "usage": _usage_dict(gen),
            })
            if escalated is not None:
                calls.append({
                    "role": "guard_final", "tool": "pwsh", "model": escalated.model_used,
                    "ok": escalated.ok, "elapsed": _elapsed(escalated),
                    "usage": _usage_dict(escalated),
                })
            trace.append(
                f"execute {i+1}/{len(state['plan'])} tool=pwsh model={model_used} "
                f"mock={cfg.execution.mock_execution} ok={ok} cwd={new_ctx.get('cwd')}"
            )
            return {
                "results": results,
                "cursor": i + 1,
                "trace": trace,
                "model_calls": calls,
                "environment_context": new_ctx,
            }

        if requested not in cfg.tools:
            # 容错不变（仍回退 planner），但必须可观测：否则规划器选了一个未配置的
            # 工具名时会静默退化成 planner 作答，漏配无法发现。
            trace.append(f"[WARN] 未知工具 {requested!r}，已回退 planner")
        tool_name = requested if requested in cfg.tools and requested != guard_tool else "planner"
        prompt = instruction
        if requested in guarded:
            prompt = (
                "ENVIRONMENT_CONTEXT（必须沿用，不要另假设当前目录或环境变量）:\n"
                + _prompt_context(ctx)
                + "\n\n若本步改变了目录或环境变量，在回复末尾另附一行 JSON："
                + '{"ENV_UPDATE":{"cwd":"绝对路径","env":{"NAME":"VALUE"}}}\n\n'
                + instruction
            )
        messages: List[Dict[str, str]] = [{"role": "user", "content": prompt}]
        if tool_name in _NO_LOCAL_READ_TOOLS:
            messages.insert(0, {"role": "system", "content": NO_LOCAL_FILE_SYSTEM})
        res: ToolResult = router.run_tool(tool_name, messages)
        content = res.content or ""

        # off-task 检测：命中则降级重跑一次（池内下一个模型），否则原样返回。
        # 无论命中与否都落一行 JSONL，用于在真实流量上统计触发率（分母是全部代码类调用）。
        matched = detect_offtask(content)
        if matched and res.tool in _OFFTASK_TOOLS:
            retry_pool = [m.model for m in cfg.tool(res.tool).models if m.model != res.model_used]
            trace.append(
                f"[OFFTASK] tool={res.tool} model={res.model_used} matched={matched!r}，降级重跑 {retry_pool}"
            )
            for alt in retry_pool:
                retry = router.run_tool(res.tool, messages, force_model=alt)
                if not retry.ok:
                    continue
                retry_matched = detect_offtask(retry.content or "")
                trace.append(
                    f"[OFFTASK-RETRY] model={alt} hit={bool(retry_matched)}"
                )
                res = retry
                content = retry.content or ""
                matched = retry_matched
                if not retry_matched:
                    break

        log_offtask(
            tool=res.tool,
            model=res.model_used,
            matched=matched,
            content=content,
            instruction=instruction,
            session_id=str(state.get("session_id") or "anonymous"),
        )

        if res.tool == "file_reader":
            content = _clip(content, 2000, 2000)
        new_ctx = (
            _apply_env_delta(ctx, instruction, content)
            if requested in guarded
            else ctx
        )
        results.append(
            {
                "tool": res.tool,
                "instruction": instruction,
                "ok": res.ok,
                "content": content,
                "model_used": res.model_used,
                "elapsed": _elapsed(res),
                "usage": _usage_dict(res),
                "failed_models": res.failed_models if hasattr(res, "failed_models") else [],
            }
        )
        calls = list(state.get("model_calls", []))
        calls.append({
            "role": "execute", "tool": res.tool, "model": res.model_used,
            "ok": res.ok, "elapsed": _elapsed(res), "usage": _usage_dict(res),
        })
        trace.append(
            f"execute {i+1}/{len(state['plan'])} tool={res.tool} model={res.model_used} "
            f"ok={res.ok} cwd={new_ctx.get('cwd')}"
        )
        return {
            "results": results,
            "cursor": i + 1,
            "trace": trace,
            "model_calls": calls,
            "environment_context": new_ctx,
        }

    def should_continue(state: OrchState) -> str:
        if state.get("cursor", 0) < len(state.get("plan", [])):
            return "dispatch"
        return "summarize"

    def node_summarize(state: OrchState) -> OrchState:
        results = state.get("results", [])
        if not results:
            return {"final": "(无步骤结果)"}
        if len(results) == 1 and results[0]["tool"] == "planner" and results[0]["ok"]:
            return {"final": results[0]["content"]}
        joined = "\n\n".join(
            f"[步骤{i+1} · {r['tool']} · {r.get('model_used')}]\n{_clip(r.get('content') or '')}"
            for i, r in enumerate(results)
        )
        res = router.run_tool(
            "summarizer",
            [
                {"role": "system", "content": "你是汇总器。把各步骤结果整合成对用户连贯的最终答复，去除重复与中间过程。"},
                {"role": "user", "content": f"用户需求：{state['user_request']}\n\n各步骤结果：\n{joined}"},
            ],
        )
        trace = state.get("trace", [])
        trace.append(f"summarize via {res.model_used} ok={res.ok}")
        calls = list(state.get("model_calls", []))
        calls.append({
            "role": "summarize", "model": res.model_used, "ok": res.ok,
            "elapsed": _elapsed(res), "usage": _usage_dict(res),
        })
        if res.ok:
            final = _clip(res.content or "", 2000, 2000)
        else:
            # 两级模型全失败：输出带 [未摘要] 标注的行级脱敏尾部，绝不静默裸回。
            # 行级白名单：只留 工具名/exit 码/文件路径/状态关键字 行，其余 [redacted]。
            keep = re.compile(
                r"exit\s*=|^\[步骤|tool=|\.py\b|\.ts\b|\.vue\b|\.js\b|\.json\b|\.md\b"
                r"|\.ya?ml\b|\.ps1\b|\.mjs\b|\.jsonc\b|\.txt\b"
                r"|^\s*\d+\s+\d+\s+\S"
                r"|fail|error|warn|passed|failed|ok=|ALLOW|DENY",
                re.I,
            )
            lines = []
            for ln in joined.splitlines():
                lines.append(ln if (keep.search(ln) and not _SECRET_PATTERN.search(ln)) else "[redacted]")
            tail = "\n".join(lines)[-2000:]
            reason = ((res.attempts[-1].error if res.attempts else "") or "unknown").splitlines()[0][:120]
            final = f"[未摘要·失败原因:{reason}·池:summarizer]\n{tail}"
        return {"final": final, "trace": trace, "model_calls": calls}

    g = StateGraph(OrchState)
    g.add_node("node_plan", node_plan)
    g.add_node("node_dispatch", node_dispatch)
    g.add_node("node_security_guard", node_security_guard)
    g.add_node("node_execute", node_execute)
    g.add_node("node_summarize", node_summarize)

    g.set_entry_point("node_plan")
    g.add_edge("node_plan", "node_dispatch")
    g.add_edge("node_dispatch", "node_security_guard")
    g.add_edge("node_security_guard", "node_execute")
    g.add_conditional_edges(
        "node_execute", should_continue, {"dispatch": "node_dispatch", "summarize": "node_summarize"}
    )
    g.add_edge("node_summarize", END)
    return g.compile()


def run_orchestration(app, user_request: str, environment_context: Optional[Dict[str, Any]] = None) -> OrchState:
    """运行一次编排。传入的环境只作为本次起点，不跨进程保留。"""
    init: OrchState = {
        "user_request": user_request,
        "cursor": 0,
        "results": [],
        "trace": [],
        "model_calls": [],
        "environment_context": environment_context or {"cwd": os.getcwd(), "env": {}, "recent_env": {}},
    }
    return app.invoke(init)
