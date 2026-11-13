/**
 * dsh-agent-guard · 检索范围拦截（纯函数 + 一次 fs 探测）。
 *
 * 背景（2026-11-10 bug6369 复盘）：18k 级单步未命中的主因是「仓库根全量 grep」——
 *   path 传到仓库根/工作区根，命中几百条 + spill，打穿 prefix cache。
 *   AGENTS.md 早写了「grep 先缩范围」，但规则不强制；这里在工具执行前直接拒绝并回提示，
 *   把自觉变成机制。对应实测事故：对 zhi2-web-admin 全量搜 `login`（250 命中 + 8KB spill）。
 *
 * 拦截范围（对 grep / glob 生效）：
 *   1. path 未传 / '' / '.' / '..' / '~' —— 默认工作区根，等同全仓检索；
 *   2. path 命中受保护根（roots 配置）或其祖先 —— C:\ 、~\Documents 等容器目录；
 *   3. roots 里 `dir/*` 形式 —— 匹配 dir 下任意直接子目录（peer workspace 根）；
 *   4. path 本身是 git 仓库根（目录下存在 .git）—— 仓库根全量 grep。
 * 其余（具体业务目录、单文件）放行。
 */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

/** 默认受保护容器：peer workspace 根、DSH 配置域、用户 Documents、仓库父目录。 */
export const DEFAULT_ROOTS = Object.freeze([
  '~/Documents/deepseek-harness/*',
  '~/.dsh',
  '~/Documents',
  'D:/repository',
  'D:/repository/skills',
])

/** 这些写法都等于「检索工作区根」。 */
const REL_ROOTS = new Set(['', '.', './', '.\\', '..', '~', '~/', '~\\'])

/** 展开 `~` 前缀为主目录绝对路径。 */
export function expandHome(p) {
  const s = String(p)
  if (s === '~' || s.startsWith('~/') || s.startsWith('~\\')) {
    return path.join(os.homedir(), s.slice(1).replace(/^[\\/]/, ''))
  }
  return s
}

/** 归一化成小写正斜杠路径（Windows 盘符大小写不敏感）；相对业务路径返回 null（放行）。 */
export function normalizeDir(p) {
  const s = String(p).trim().replace(/[\\/]+/g, '/').toLowerCase()
  if (!/^[a-z]:\//.test(s) && !s.startsWith('//') && !s.startsWith('/')) return null
  let out = s.length > 1 ? s.replace(/\/+$/, '') : s
  if (/^[a-z]:$/.test(out)) out += '/'
  return out
}

/** target 是 root 自身或其祖先（更靠上层）。 */
export function isAncestorOrEqual(targetDir, rootDir) {
  if (targetDir === rootDir) return true
  const t = targetDir.endsWith('/') ? targetDir : targetDir + '/'
  return rootDir.startsWith(t)
}

/** `dir/*` 通配：匹配 dir 的任意直接子目录。 */
function matchWildcardChild(dir, root) {
  if (!root.endsWith('/*')) return false
  const base = normalizeDir(expandHome(root.slice(0, -2)))
  if (!base || dir === base || !dir.startsWith(base + '/')) return false
  return !dir.slice(base.length + 1).includes('/')
}

function defaultGitProbe(dir) {
  try {
    return fs.existsSync(path.join(dir, '.git'))
  } catch {
    return false
  }
}

function hint(tool, why) {
  // 审计 C1：拒绝时给**可直接照抄的调用**，不要只说「缩到目标业务目录」。按工具给出模板。
  if (tool === 'glob') {
    return `[agent-guard] glob 拒绝：${why}。改用具体目录+pattern，例如 `
      + `glob{ path: "src/views/<模块>", pattern: "**/*.vue" }；还没定目录就先 mcp__openviking__search 定位文件。别扫工作区根。`
  }
  return `[agent-guard] ${tool} 拒绝：${why}。改用具体目录+pattern，例如 `
    + `grep{ path: "src/views/<模块>", pattern: "<关键词>", include: "*.{ts,vue}" }（include 只写一个 glob）；`
    + '连目标目录都定不了时先 mcp__openviking__search（mode=context, detail=abstract）定位文件，别全仓 grep。'
}

/**
 * pwsh 递归列举判定（审计 P0-3）。
 *
 * `Get-ChildItem -Recurse` / `gci -r` / `ls -r` / `dir /s` 这类递归列举会把整棵
 * 目录树扫出来，与 bug6369 的「仓库根全量 grep」同源：结果巨大、打穿 prefix cache、
 * 单步未命中。命中条件（全部满足）：
 *   1. 出现列举命令词：Get-ChildItem / gci / ls / dir（词边界）；
 *   2. 出现递归旗标：-Recurse / -r（词边界）/ /s（词边界）；
 *   3. 不含收窄参数：-Filter / -Include / -Depth / -Path。
 * 任一不满足即放行。正则保守：`-r\b` 不会误伤 `git rev-list`、`--dry-run`、`-Raw` 等
 * 出现在别的词里的 `-r`；`ls` / `dir` / `gci` 都用词边界，避免命中路径片段或子串。
 */
const PWSH_LIST_RE = /(?:Get-ChildItem|\bgci\b|\bls\b|\bdir\b)/i
const PWSH_RECURSE_RE = /(?:-Recurse\b|-r\b|\/s\b)/i
const PWSH_NARROW_RE = /(?:-Filter\b|-Include\b|-Depth\b|-Path\b)/i

function pwshHint(command) {
  const text = String(command).trim()
  const snippet = text.length > 80 ? `${text.slice(0, 80)}…` : text
  return `[agent-guard] pwsh 拒绝递归列举：${snippet}。改用 glob 指定 pattern，` +
    '或 Get-ChildItem <具体目录> -Filter <通配> 收窄范围后再列举；别用 -Recurse / -r / /s 全树扫。'
}

function decidePwshInterception(args) {
  if (args === null || typeof args !== 'object' || Array.isArray(args)) return null
  const command = args.command
  if (typeof command !== 'string' || command.trim() === '') return null
  if (!PWSH_LIST_RE.test(command)) return null
  if (!PWSH_RECURSE_RE.test(command)) return null
  if (PWSH_NARROW_RE.test(command)) return null
  return pwshHint(command)
}

/**
 * 判定一次 grep / glob 调用是否因范围过大被拒。
 * @param {object} input - 输入。
 * @param {string} input.tool - 工具名。
 * @param {object} input.args - 工具参数（只读，不修改）。
 * @param {string[]} [input.roots] - 受保护根列表（相对/带 ~ 均可）。
 * @param {(dir: string) => boolean} [input.gitProbe] - 目录是否为 git 仓库根（可注入便于单测）。
 * @returns {string | null} 拒绝理由（返回给工具层的字符串即拒绝）；放行返回 null。
 */
export function decideInterception({ tool, args, roots = DEFAULT_ROOTS, gitProbe = defaultGitProbe }) {
  // pwsh 递归列举拦截（P0-3）。
  if (tool === 'pwsh') return decidePwshInterception(args)
  if (tool !== 'grep' && tool !== 'glob') return null
  if (args === null || typeof args !== 'object') return null
  const raw = args.path
  const s = raw === undefined || raw === null ? '' : String(raw).trim()
  if (REL_ROOTS.has(s)) return hint(tool, 'path 未指定或指向工作区根')
  const dir = normalizeDir(expandHome(s))
  if (!dir) return null // 相对业务路径（src/views/xxx 等）：放行
  for (const root of roots) {
    const r = normalizeDir(expandHome(String(root)))
    if (r && isAncestorOrEqual(dir, r)) return hint(tool, `${s} 是受保护容器 ${root} 本身或其上层`)
  }
  for (const root of roots) {
    if (matchWildcardChild(dir, String(root))) return hint(tool, `${s} 是 workspace 根目录级检索`)
  }
  if (gitProbe(dir)) return hint(tool, `${s} 是 git 仓库根`)
  return null
}
