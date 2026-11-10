/**
 * dsh-orchestrator 配置校验。
 *
 * 故意不依赖 @deepseek-ai/schemastery：本插件装在 profile 之外，拿不到那个包，
 * import 会让整行加载失败、profile 起不来。cordis 认 Standard Schema 协议
 * （对象上有 ~standard.validate()，同步返回 { value } 或 { issues }），手写小实现。
 *
 * @module dsh-orchestrator/config
 */

export const DEFAULTS = {
  pythonExe: 'python',
  projectDir: '',
  timeoutMs: 300000,
  verbose: false,
}

function positive(value, fallback) {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : fallback
}

function validate(input) {
  const source = input === null || input === undefined ? {} : input
  if (typeof source !== 'object' || Array.isArray(source)) {
    return { issues: [{ message: 'orchestrator: config must be an object' }] }
  }
  const projectDir = typeof source.projectDir === 'string' ? source.projectDir.trim() : ''
  if (projectDir === '') {
    return { issues: [{ message: 'orchestrator: projectDir is required (path to langgraph-orchestrator)' }] }
  }
  const pythonExe = typeof source.pythonExe === 'string' && source.pythonExe.trim() !== ''
    ? source.pythonExe.trim()
    : DEFAULTS.pythonExe
  return {
    value: {
      pythonExe,
      projectDir,
      timeoutMs: positive(source.timeoutMs, DEFAULTS.timeoutMs),
      verbose: source.verbose === true,
    },
  }
}

export const Config = {
  '~standard': {
    version: 1,
    vendor: 'dsh-orchestrator',
    validate,
  },
}
