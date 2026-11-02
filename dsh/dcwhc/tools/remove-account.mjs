/**
 * 从 `.credentials.yaml` 里删掉一条指定的 channel-wechat 记录。
 *
 * 为什么需要：上游插件固定取 `listAccounts()[0]`，也就是凭证里第一条。旧账号
 * 失效后它仍然占着第一位，导致"新扫的码有效、但插件一直在用旧的"。删掉旧的
 * 之后，有效的那条自动成为第一条。
 *
 * 实现要点：YAML 里一条记录是「同级键 + 其下更深缩进的所有行」。所以必须先
 * 记下目标键的缩进深度，然后只跳过**比它更深**的行；遇到同深度或更浅的键就
 * 停止。上一版没比较深度、只看「缩进 ≤2 就算新键」，结果把 `kind: grant`
 * 这行（4 空格）当成更深的内容删掉了，留下没有键名的 `payload:`，文件损坏。
 *
 * 用法：node tools/remove-account.mjs channel-wechat/<账号key>
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const home = process.env.DSH_HOME?.trim() || join(homedir(), '.dsh')
const path = join(home, '.credentials.yaml')
const key = process.argv[2]

if (key === undefined || key.trim() === '') {
  console.error('用法: node tools/remove-account.mjs channel-wechat/<账号key>')
  process.exit(1)
}
if (!existsSync(path)) {
  console.error(`找不到凭证文件: ${path}`)
  process.exit(1)
}

const lines = readFileSync(path, 'utf8').split(/\r?\n/)
const kept = []
let targetDepth
let removed = false

for (const line of lines) {
  const trimmed = line.trimStart()
  const indent = line.length - trimmed.length
  const isKeyLine = trimmed !== '' && !trimmed.startsWith('#') && /^[^\s:][^:]*:\s*$/.test(trimmed)

  if (isKeyLine) {
    if (targetDepth !== undefined) {
      // 已经在跳过某个目标块
      if (indent > targetDepth) continue // 仍属于该块，跳过
      targetDepth = undefined // 块结束，恢复正常
    }
    if (trimmed === `${key}:`) {
      targetDepth = indent
      removed = true
      continue
    }
  } else if (targetDepth !== undefined) {
    // 非键名行：只有更深缩进才属于被删块
    if (trimmed === '' || indent > targetDepth) continue
    targetDepth = undefined
  }

  kept.push(line)
}

if (!removed) {
  console.error(`没找到记录: ${key}`)
  process.exit(1)
}

// 校验：删完后每个顶层 records 子键下都应有 kind 或 payload，避免再次写坏。
const result = kept.join('\n')
const orphans = (result.match(/^\s+payload:\s*$/gm) ?? []).length
const keys = (result.match(/^  \S+:\s*$/gm) ?? []).length
if (orphans > keys) {
  console.error('自检失败：删除后结构异常，未写入。')
  process.exit(1)
}

writeFileSync(path, result, 'utf8')
console.log(`已删除: ${key}`)
console.log(`剩余记录数: ${keys}`)
