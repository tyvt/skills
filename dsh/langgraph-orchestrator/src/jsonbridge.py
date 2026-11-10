"""JSON 桥接：读 stdin 的一个 JSON 请求，跑编排，向 stdout 吐一个 JSON 结果。

供 DSH Node 工具插件(dsh-orchestrator)调用。避免命令行参数转义/编码问题。

stdin:  {"op": "full"|"tool"|"list", "request": "...", "tool": "planner", "config": "可选路径"}
stdout: 单个 JSON 对象；出错时 {"ok": false, "error": "..."} 且退出码非 0。
"""
from __future__ import annotations

import json
import sys

from . import api


def main() -> int:
    try:
        # 容忍 BOM(PowerShell echo 等会在前面加 BOM)
        raw = sys.stdin.buffer.read().decode("utf-8-sig")
        req = json.loads(raw) if raw.strip() else {}
    except Exception as e:
        print(json.dumps({"ok": False, "error": f"bad stdin json: {e}"}, ensure_ascii=False))
        return 2

    op = req.get("op", "full")
    cfg = req.get("config") or api.DEFAULT_CFG
    try:
        if op == "list":
            out = api.list_tools(cfg)
            out["ok"] = True
        elif op == "tool":
            tool = req.get("tool", "")
            request = req.get("request", "")
            if not tool or not request:
                print(json.dumps({"ok": False, "error": "tool 和 request 必填"}, ensure_ascii=False))
                return 2
            out = api.run_tool(tool, request, cfg)
        elif op == "full":
            request = req.get("request", "")
            if not request:
                print(json.dumps({"ok": False, "error": "request 必填"}, ensure_ascii=False))
                return 2
            out = api.run_full(request, cfg)
        else:
            print(json.dumps({"ok": False, "error": f"未知 op: {op}"}, ensure_ascii=False))
            return 2
    except Exception as e:  # noqa: BLE001
        print(json.dumps({"ok": False, "error": f"{type(e).__name__}: {e}"}, ensure_ascii=False))
        return 1

    print(json.dumps(out, ensure_ascii=False))
    return 0 if out.get("ok", True) else 1


if __name__ == "__main__":
    sys.exit(main())
