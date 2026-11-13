# Summary
2026-11-12 第三阶段，用户重启 DSH Web（PID 16488，10:30:47）后，blockBuildLint 规则开启并实测验证：npm run build、tsc -b、eslint . 均被 [orchestrator-gate] 拦截，单文件 eslint 放行；同步修正两条陈旧 selftest 断言，80 项通过。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 重启好了
**assistant [peer=github.com-tyvt-skills]**: Restart done. Confirm the new process and live rules, then run the build-lint interception test.
**assistant [peer=github.com-tyvt-skills]**: New process PID **16488** (10:30:47), all four rules live as `true`. Now the build-lint interception test — `npm run build` should be blocked by `[orchestrator-gate]`:
**assistant [peer=github.com-tyvt-skills]**: **Build-lint block PASS**: `npm run build` → blocked by `[orchestrator-gate]` ("build/lint: script build"). Let me confirm a couple more (bare `tsc`, whole `eslint .`) block, and that single-file eslint passes, to close out:
**assistant [peer=github.com-tyvt-skills]**: Both blocked:
- `tsc -b` → BLOCK ("tsc --build") ✅
- `eslint .` (whole tree) → BLOCK ("eslint 非绝对路径") ✅

Now confirm single-file eslint passes (the escape hatch for narrow commands):
**assistant [peer=github.com-tyvt-skills]**: Single-file eslint was **blocked** with reason "eslint 非绝对路径" — but I gave an absolute path. This suggests the classifier didn't recognize it as a single file, likely because the command had a pipe `| Select-Object` appended, so `positionals` picked up extra tokens, or the path `statFile` failed. Let me test a clean single eslint command without the pipe:
**assistant [peer=github.com-tyvt-skills]**: Interesting — clean single-file eslint **passed the gate** (reached the shell, which then failed only because `eslint` isn't installed in this repo). So the gate correctly **allowed** single-file eslint. The earlier block was because the pipe `| Select-Object -First 4; ...` added tokens that broke single-file detection. That's a minor known limitation (piped/composite commands), not a real defect for the intended narrow-command path.

M1/phase-2/phase-3 all verified live. Let me update todos and present the final summary with a commit decision.
**assistant [peer=github.com-tyvt-skills]**: All four rules are now live and verified. Final summary:

## 全部四阶段验证完成 ✅

重启后（PID **16488**，10:30:47），`blockRootGrep / blockWholeRead / blockBillingBypass / blockBuildLint` 四条规则全部为 `true`，实测：

| 类别 | 用例 | 结果 |
|---|---|---|
| **账单** | `cat .sessions` / `Get-Content .sessions` / `python cost_bill.py` | ✅ 均被 `[orchestrator-gate]` 拦 |
| **整读**（宿主） | 47KB js 不带 offset | ✅ 被 `[orchestrator-gate]` 拦（字节阈值） |
| **整读**（子ctx） | 47KB 不带 offset | ✅ 被 `token-guard` 拦（>300 行） |
| **构建** | `npm run build` / `tsc -b` / `eslint .` | ✅ 均被 `[orchestrator-gate]` 拦 |
| **逃生舱** | 单文件 `eslint <abs路径> --ext .js` | ✅ 放行 |
| **M1 豁免** | 子 ctx `.sessions`/仓库根 grep | ✅ 放行（`delegationDepth>0` 生效，不锁死编排器） |

**两个关键澄清**（你之前关切的）：
1. **M1 结论**：`orchestrate` 工具实际跑在 Magpie 独立进程（PID 21580），不经本 guard，所以用它测不出 M1；我用真正的 in-process 子上下文（spawn subagent）实测，证实 `delegationDepth>0` 豁免生效 —— **可放心开 blockBuildLint，已开且验证。**
2. **整读优先级**：宿主直读时 orchestrator-gate 先拦（pre-execute 字节阈值）；子 ctx 里 gate 放行后由 token-guard 按 >300 行拦（它是结果裁剪的后置插件）。两个阶段不冲突。

**一个已知小边界**：单文件 eslint 若后接管道/复合命令（如 `| Select-Object; ...`）会因多出 token 被判"非绝对路径"而误拦；干净的单文件调用正常放行。这是复合命令解析的已知局限，不影响窄命令逃生舱的正常用法。

### 改动文件
- `dsh/orchestrator-gate/lib/index.js`：RULES 四条全开；profile 副本已同步（hash `A3DA26C1…` 一致）
- `dsh/orchestrator-gate/selftest.mjs`：修正两条随开关翻转的陈旧断言（"build off by default"→on；config 关不掉硬编码 true），**selftest 80 项通过**

这些改动未提交，当前在上次提交 `9acaf317` 之后又有两处修改（`lib/index.js` + `selftest.mjs`）。如何处置？

<!-- MEMORY_FIELDS
{
  "event_name": "blockBuildLint开启验证",
  "goal": "验证构建门禁生效",
  "summary": "2026-11-12 第三阶段，用户重启 DSH Web（PID 16488，10:30:47）后，blockBuildLint 规则开启并实测验证：npm run build、tsc -b、eslint . 均被 [orchestrator-gate] 拦截，单文件 eslint 放行；同步修正两条陈旧 selftest 断言，80 项通过。",
  "ranges": "0-14",
  "source_extraction_id": "7fba93ee1e4e40a89cad05b66dd53b54",
  "version": 1,
  "memory_type": "events"
}
-->