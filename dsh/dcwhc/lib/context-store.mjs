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
export function rememberContext({ accountId, peerId, contextToken }) {
  if (![accountId, peerId, contextToken].every((v) => typeof v === 'string' && v !== '')) return
  const state = readState()
  state.entries = state.entries.filter((e) => e.accountId !== accountId || e.peerId !== peerId)
  state.entries.push({ accountId, peerId, token: contextToken, receivedAt: Date.now() })
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
