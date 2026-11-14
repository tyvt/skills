import { mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'

const statePath = () => join(process.env.DSH_HOME?.trim() || join(homedir(), '.dsh'), 'channel-wechat-companion', 'contexts.json')

function readState() {
  try {
    const state = JSON.parse(readFileSync(statePath(), 'utf8'))
    return state?.version === 1 && Array.isArray(state.entries) ? state : { version: 1, entries: [] }
  } catch {
    return { version: 1, entries: [] }
  }
}

// Tokens belong to a bot account AND peer; never reuse another bot's context.
// 最多保留 MAX_ENTRIES 条（按 receivedAt 最旧淘汰）：防越权 token 记录随使用无界增长。
const MAX_ENTRIES = 200
export function rememberContext({ accountId, peerId, contextToken }) {
  if (![accountId, peerId, contextToken].every((v) => typeof v === 'string' && v !== '')) return
  const state = readState()
  state.entries = state.entries.filter((e) => e.accountId !== accountId || e.peerId !== peerId)
  state.entries.push({ accountId, peerId, token: contextToken, receivedAt: Date.now() })
  if (state.entries.length > MAX_ENTRIES) {
    // receivedAt 缺失按 0（最旧）；sort 稳定 → 同值保持插入序；保留最新的 MAX_ENTRIES 条。
    state.entries.sort((x, y) => (Number(x?.receivedAt) || 0) - (Number(y?.receivedAt) || 0))
    state.entries = state.entries.slice(state.entries.length - MAX_ENTRIES)
  }
  const path = statePath()
  mkdirSync(join(path, '..'), { recursive: true })
  const scratch = `${path}.${process.pid}.tmp`
  writeFileSync(scratch, JSON.stringify(state), { encoding: 'utf8', mode: 0o600 })
  renameSync(scratch, path)
}

export function cachedContext(accountId, peerId) {
  const entry = readState().entries.find((e) => e.accountId === accountId && e.peerId === peerId)
  return typeof entry?.token === 'string' && entry.token !== '' ? entry.token : undefined
}
