import { readFileSync, writeFileSync, mkdirSync, renameSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'
const statePath = () => join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'channel-feishu', 'state.json')
export function readFeishuState() {
  try { return JSON.parse(readFileSync(statePath(), 'utf8')) } catch { return { routes: {}, seen: [] } }
}
export function updateFeishuState(change) {
  const state = readFeishuState()
  change(state)
  const path = statePath()
  mkdirSync(join(path, '..'), { recursive: true })
  const temp = `${path}.${process.pid}.tmp`
  writeFileSync(temp, JSON.stringify(state), { mode: 0o600 })
  renameSync(temp, path)
}
export function recordFeishuRoute(messageId, sessionId) {
  if (!messageId || !sessionId) return
  updateFeishuState((state) => {
    state.routes ||= {}
    state.routes[messageId] = sessionId
    const entries = Object.entries(state.routes).slice(-500)
    state.routes = Object.fromEntries(entries)
  })
}
