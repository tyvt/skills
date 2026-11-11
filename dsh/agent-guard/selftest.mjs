// dsh-agent-guard 自测：每条用例都对应 2026-10-29 审计里真实发生过的失败。
//
// 用法：node selftest.mjs
// 退出码 0 = 全通过；1 = 有失败。
import assert from 'node:assert/strict'

import { isWholeFileRead, normalizeSchema, planRecovery, repairArguments, repairToolName, shouldRejectDuplicateRead } from './lib/rules.js'
import { decideInterception } from './lib/scope.js'

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    passed++
    console.log(`  ok   ${name}`)
  } catch (error) {
    failed++
    console.log(`  FAIL ${name}`)
    console.log(`       ${error.message}`)
  }
}

const known = new Set(['grep', 'glob', 'edit', 'write', 'read', 'pwsh', 'update_goal', 'todo_write', 'mcp_gateway'])

console.log('\n=== 工具名归一化 ===')

test('grep"> 归一化成 grep', () => {
  const result = repairToolName('grep">', (n) => known.has(n))
  assert.equal(result.name, 'grep')
  assert.equal(result.repair.rule, 'tool-name-trim')
})

test('已注册工具名保持不变', () => {
  const result = repairToolName('grep', (n) => known.has(n))
  assert.equal(result.name, 'grep')
  assert.equal(result.repair, null)
})

test('真的未知的工具名保持不变（不瞎猜）', () => {
  const result = repairToolName('nonexistent_tool', (n) => known.has(n))
  assert.equal(result.name, 'nonexistent_tool')
  assert.equal(result.repair, null)
})

console.log('\n=== update_goal 字段与 action 一致性（当日第一大失败类别，11 次）===')

test('action=complete 携带 objective/max_goal_rounds 时被剔除', () => {
  const args = { action: 'complete', goal_id: 'goal-1', revision: 3, objective: 'x', max_goal_rounds: 5 }
  const { repairs } = repairArguments({ toolName: 'update_goal', args, schema: {} })
  assert.equal(args.objective, undefined)
  assert.equal(args.max_goal_rounds, undefined)
  assert.equal(args.action, 'complete')
  assert.equal(repairs.filter((r) => r.rule === 'goal-edit-only-field').length, 2)
})

test('action 缺失但带 objective 时推断 action=edit（意图保留，非静默丢弃）', () => {
  const args = { goal_id: 'goal-1', revision: 3, objective: 'x', max_goal_rounds: 5 }
  const { repairs } = repairArguments({ toolName: 'update_goal', args, schema: {} })
  assert.equal(args.action, 'edit')
  assert.equal(args.objective, 'x')
  assert.equal(args.max_goal_rounds, 5)
  assert.equal(repairs.filter((r) => r.rule === 'goal-edit-inferred').length, 1)
})

test('action=edit 保留 objective/max_goal_rounds', () => {
  const args = { action: 'edit', goal_id: 'goal-1', revision: 3, objective: '新的目标', max_goal_rounds: 8 }
  repairArguments({ toolName: 'update_goal', args, schema: {} })
  assert.equal(args.objective, '新的目标')
  assert.equal(args.max_goal_rounds, 8)
})

test('action=blocked 保留 blocked_reason', () => {
  const args = { action: 'blocked', goal_id: 'goal-1', revision: 3, blocked_reason: '上游 503' }
  repairArguments({ toolName: 'update_goal', args, schema: {} })
  assert.equal(args.blocked_reason, '上游 503')
})

test('action=complete 携带 blocked_reason 时被剔除', () => {
  const args = { action: 'complete', goal_id: 'goal-1', revision: 3, blocked_reason: 'x' }
  repairArguments({ toolName: 'update_goal', args, schema: {} })
  assert.equal(args.blocked_reason, undefined)
})

console.log('\n=== justification / sandbox_permissions 成对修复（ESCALATION_ARGS，3 次）===')

const PWSH_SCHEMA = {
  type: 'object',
  properties: {
    command: { type: 'string' },
    description: { type: 'string' },
    justification: { type: 'string' },
    sandbox_permissions: { type: 'string' },
    run_in_background: { type: 'boolean' },
    timeoutMs: { type: 'number' },
    workdir: { type: 'string' },
  },
  additionalProperties: false,
}

test('落单的 justification 被剔除', () => {
  const args = { command: 'ls', description: 'd', justification: '因为需要更大权限' }
  repairArguments({ toolName: 'pwsh', args, schema: PWSH_SCHEMA })
  assert.equal(args.justification, undefined)
  assert.equal(args.command, 'ls')
})

test('空 justification 被补成完整句子（sandbox_permissions 存在时）', () => {
  const args = { command: 'ls', description: 'd', justification: '', sandbox_permissions: 'workspace-write' }
  repairArguments({ toolName: 'pwsh', args, schema: PWSH_SCHEMA })
  assert.equal(typeof args.justification, 'string')
  assert.ok(args.justification.trim().length > 0)
})

test('缺 justification 的 sandbox_permissions 被补齐', () => {
  const args = { command: 'ls', description: 'd', sandbox_permissions: 'workspace-write' }
  repairArguments({ toolName: 'pwsh', args, schema: PWSH_SCHEMA })
  assert.equal(typeof args.justification, 'string')
  assert.ok(args.justification.trim().length > 0)
})

console.log('\n=== 通用 schema 收敛（INVALID_ARGS 家族）===')

test('布尔字符串收敛为布尔值', () => {
  const args = { command: 'ls', description: 'd', run_in_background: 'true' }
  repairArguments({ toolName: 'pwsh', args, schema: PWSH_SCHEMA })
  assert.equal(args.run_in_background, true)
})

test('数字字符串收敛为数字', () => {
  const args = { command: 'ls', description: 'd', timeoutMs: '60000' }
  repairArguments({ toolName: 'pwsh', args, schema: PWSH_SCHEMA })
  assert.equal(args.timeoutMs, 60000)
})

test('未声明字段被剔除（additionalProperties: false）', () => {
  const args = { command: 'ls', description: 'd', bogus: 1 }
  repairArguments({ toolName: 'pwsh', args, schema: PWSH_SCHEMA })
  assert.equal(args.bogus, undefined)
})

test('非必填字段上的 null 被剔除', () => {
  const args = { command: 'ls', description: 'd', workdir: null }
  repairArguments({ toolName: 'pwsh', args, schema: PWSH_SCHEMA })
  assert.equal('workdir' in args, false)
})

test('必填字段上的 null 保留（不能瞎删）', () => {
  const args = { command: null, description: 'd' }
  const schema = { type: 'object', properties: { command: { type: 'string' }, description: { type: 'string' } }, required: ['command'], additionalProperties: false }
  repairArguments({ toolName: 'pwsh', args, schema })
  assert.equal(args.command, null)
})

console.log('\n=== todo_write 字段（额外键会让整次调用被拒）===')

test('todos[] 上的 id / activeForm 被剔除', () => {
  const args = { todos: [{ content: 'a', status: 'pending', id: 'x', activeForm: 'y' }] }
  repairArguments({ toolName: 'todo_write', args, schema: {} })
  assert.deepEqual(args.todos, [{ content: 'a', status: 'pending' }])
})

console.log('\n=== schema 收敛必须递归到数组元素 ===')

const TODO_SCHEMA = {
  type: 'object',
  properties: {
    todos: {
      type: 'array',
      items: {
        type: 'object',
        properties: { content: { type: 'string' }, status: { type: 'string' } },
        required: ['content', 'status'],
        additionalProperties: false,
      },
    },
  },
  required: ['todos'],
  additionalProperties: false,
}

test('todos[].id 被剔除（元素级 additionalProperties:false）', () => {
  const args = { todos: [{ content: 'a', status: 'pending', id: 'x', activeForm: 'y' }] }
  const { repairs } = repairArguments({ toolName: 'todo_write', args, schema: TODO_SCHEMA })
  assert.deepEqual(args.todos, [{ content: 'a', status: 'pending' }])
  assert.ok(
    repairs.some((r) => r.rule === 'drop-undeclared-arg' || r.rule === 'todo-item-extra-key'),
    `实际规则: ${repairs.map((r) => r.rule).join(',')}`,
  )
})

test('元素级多余字段被剔除时不会误伤兄弟元素', () => {
  const args = { todos: [{ content: 'a', status: 'pending' }, { content: 'b', status: 'done', id: 'z' }] }
  repairArguments({ toolName: 'todo_write', args, schema: TODO_SCHEMA })
  assert.deepEqual(args.todos, [{ content: 'a', status: 'pending' }, { content: 'b', status: 'done' }])
})

test('嵌套对象里的多余字段同样被剔除', () => {
  const schema = {
    type: 'object',
    properties: {
      outer: {
        type: 'object',
        properties: { inner: { type: 'object', properties: { keep: { type: 'string' } }, additionalProperties: false } },
        additionalProperties: false,
      },
    },
    additionalProperties: false,
  }
  const args = { outer: { inner: { keep: 'yes', junk: 1 }, junk2: 2 } }
  repairArguments({ toolName: 'x', args, schema })
  assert.deepEqual(args.outer, { inner: { keep: 'yes' } })
})

console.log('\n=== DSH 的两种 schema 方言 ===')

const IMPLICIT_TODO_SCHEMA = {
  todos: {
    type: 'array',
    required: true,
    description: 'The COMPLETE task list, replacing any previous list.',
    items: {
      type: 'object',
      additionalProperties: false,
      properties: {
        content: { type: 'string', required: true, description: 'What the task is.' },
        status: { type: 'string', required: true, enum: ['pending', 'in_progress', 'completed'] },
      },
    },
  },
}

test('方言 2（隐式属性表）：todos[].id 被剔除', () => {
  // 这是 todo_write 的真实 parameters 形状：顶层每个 key 就是属性名，
  // 必填性写成属性上的 `required: true` 布尔。
  const args = { todos: [{ content: 'a', status: 'pending', id: 'x', activeForm: 'y' }] }
  repairArguments({ toolName: 'todo_write', args, schema: IMPLICIT_TODO_SCHEMA })
  assert.deepEqual(args.todos, [{ content: 'a', status: 'pending' }])
})

test('方言 1 与方言 2 都能识别', () => {
  assert.equal(typeof normalizeSchema({ todos: { type: 'array' } }), 'object')
  assert.equal(typeof normalizeSchema({ type: 'object', properties: { a: { type: 'string' } } }), 'object')
  assert.equal(normalizeSchema({ type: 'string' }), undefined)
  assert.equal(normalizeSchema(null), undefined)
})

console.log('\n=== 冻结的参数树（DSH 用 deepFreeze）===')

test('嵌套对象被冻结时不会导致修复失败', () => {
  // DSH 冻结整棵 arguments 树；严格模式下对冻结对象 delete 会抛 TypeError。
  // 守卫的做法是先深拷贝，所以这里验证「拷贝后再修」这条路径。
  const frozenItem = Object.freeze({ content: 'a', status: 'pending', id: 'x' })
  const frozenTodos = Object.freeze([frozenItem])
  assert.throws(() => { delete frozenItem.id }, '冻结对象直接 delete 应当抛错（这正是要避免的）')

  const copy = structuredClone({ todos: [{ content: 'a', status: 'pending', id: 'x' }] })
  const { repairs } = repairArguments({ toolName: 'todo_write', args: copy, schema: IMPLICIT_TODO_SCHEMA })
  assert.deepEqual(copy.todos, [{ content: 'a', status: 'pending' }])
  assert.ok(repairs.length > 0)
})

console.log('\n=== 供应商失败恢复 ===')

const RECOVERY = {
  maxExtraRetries: 3,
  rateLimitMaxExtraRetries: 1,
  initialDelayMs: 1500,
  maxDelayMs: 20000,
  jitterRatio: 0.2,
  maxWaitMs: 120000,
}

test('SERVER 失败可恢复并带退避', () => {
  const plan = planRecovery({ failure: { code: 'SERVER', message: '503' }, attempts: 0, config: RECOVERY, random: () => 0.5 })
  assert.ok(plan !== null)
  assert.ok(plan.delayMs > 0)
})

test('TRANSPORT 失败可恢复', () => {
  const plan = planRecovery({ failure: { code: 'TRANSPORT', message: 'ECONNRESET' }, attempts: 0, config: RECOVERY })
  assert.ok(plan !== null)
})

test('AUTH 失败不恢复（重试无意义）', () => {
  const plan = planRecovery({ failure: { code: 'AUTH', message: '401' }, attempts: 0, config: RECOVERY })
  assert.equal(plan, null)
})

test('超过额外重试上限后不再恢复', () => {
  const plan = planRecovery({ failure: { code: 'SERVER' }, attempts: 3, config: RECOVERY })
  assert.equal(plan, null)
})

test('额度型 429 额外重试次数更少', () => {
  const first = planRecovery({ failure: { code: 'RATE_LIMIT' }, attempts: 0, config: RECOVERY })
  const second = planRecovery({ failure: { code: 'RATE_LIMIT' }, attempts: 1, config: RECOVERY })
  assert.ok(first !== null)
  assert.equal(second, null)
})

test('provider 要求等待过久时不恢复（避免挂住会话几小时）', () => {
  const plan = planRecovery({
    failure: { code: 'RATE_LIMIT', providerRetryAfterMs: 4 * 60 * 60 * 1000 },
    attempts: 0,
    config: RECOVERY,
  })
  assert.equal(plan, null)
})

test('provider 给出可接受等待时长时按其要求等待', () => {
  const plan = planRecovery({
    failure: { code: 'RATE_LIMIT', providerRetryAfterMs: 5000 },
    attempts: 0,
    config: RECOVERY,
  })
  assert.equal(plan.delayMs, 5000)
})

console.log('\n=== 工具名 / 参数名别名（2026-11-09 实测样本）===')

test('schedule_update 旧名映射到 schedule_edit', () => {
  const knownWithEdit = new Set([...known, 'schedule_edit'])
  const result = repairToolName('schedule_update', (n) => knownWithEdit.has(n))
  assert.equal(result.name, 'schedule_edit')
  assert.equal(result.repair.rule, 'tool-name-alias')
})

test('别名表外的未知工具名仍不瞎猜', () => {
  const result = repairToolName('schedule_update_typo', (n) => known.has(n))
  assert.equal(result.name, 'schedule_update_typo')
  assert.equal(result.repair, null)
})

test('grep 的 glob 字段改写为 include', () => {
  const args = { pattern: 'abc', path: 'src', glob: 'README.md' }
  const { repairs } = repairArguments({ toolName: 'grep', args, schema: {} })
  assert.equal(args.include, 'README.md')
  assert.equal(args.glob, undefined)
  assert.equal(repairs.filter((r) => r.rule === 'arg-alias').length, 1)
})

test('已有 include 时不覆盖模型意图', () => {
  const args = { pattern: 'abc', include: '*.md', glob: 'README.md' }
  repairArguments({ toolName: 'grep', args, schema: {} })
  assert.equal(args.include, '*.md')
})

test('openviking search 误传 queries 数组 → 搬到 query 字符串', () => {
  const args = { queries: ['修复与验证'], mode: 'context', detail: 'abstract' }
  const { repairs } = repairArguments({ toolName: 'mcp__openviking__search', args, schema: {} })
  assert.equal(args.query, '修复与验证')
  assert.equal(args.queries, undefined)
  assert.equal(args.mode, 'context')
  assert.equal(repairs.filter((r) => r.rule === 'arg-alias').length, 1)
})

test('pwsh 未加引号的 @{u} 补单引号（bug6401 遗留）', () => {
  const args = { command: 'git rev-parse @{u}' }
  const { repairs } = repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(args.command, "git rev-parse '@{u}'")
  assert.equal(repairs.filter((r) => r.rule === 'pwsh-at-brace').length, 1)
})

test('pwsh 已加引号的 @{u} 不重复包裹', () => {
  const args = { command: "git rev-parse '@{u}'" }
  repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(args.command, "git rev-parse '@{u}'")
})

test('pwsh 命令字符 @{} 无花括号内容不误伤（正常哈希不拦）', () => {
  const args = { command: 'Write-Output "hello"' }
  const { repairs } = repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(repairs.filter((r) => r.rule === 'pwsh-at-brace').length, 0)
})

test('pwsh | Out-String 缓冲告警（不改命令，只提示，bug6402 遗留）', () => {
  const args = { command: 'npm test 2>&1 | Out-String -Width 200' }
  const { repairs } = repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(args.command, 'npm test 2>&1 | Out-String -Width 200', '命令不被修改')
  assert.equal(repairs.filter((r) => r.rule === 'pwsh-buffering').length, 1)
})

test('pwsh | ConvertTo-Json 也命中缓冲告警', () => {
  const args = { command: 'Get-ChildItem | ConvertTo-Json' }
  const { repairs } = repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(repairs.filter((r) => r.rule === 'pwsh-buffering').length, 1)
})

test('pwsh 无缓冲管道不误报', () => {
  const args = { command: 'npm test 2>&1 *> test.log' }
  const { repairs } = repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(repairs.filter((r) => r.rule === 'pwsh-buffering').length, 0)
})

console.log('\n=== 检索范围拦截（bug6369：仓库根全量 grep 打穿 prefix cache）===')
const scopeRoots = ['~/Documents/deepseek-harness/*', '~/.dsh', '~/Documents', 'D:/repository', 'D:/repository/skills']
const noGit = () => false
const git = (dir) => dir === 'd:/repo/zhi2-web-admin'
const call = (args, gitProbe = noGit) =>
  decideInterception({ tool: 'grep', args, roots: scopeRoots, gitProbe })

test('path 未传 → 拒绝（等同全仓检索）', () => {
  assert.match(call({ pattern: 'x' }), /工作区根/)
})
test("path='.' → 拒绝", () => {
  assert.match(call({ pattern: 'x', path: '.' }), /工作区根/)
})
test('workspace 根（dir/* 直接子目录）→ 拒绝', () => {
  assert.match(call({ pattern: 'x', path: 'C:\\Users\\Administrator\\Documents\\deepseek-harness\\default-workspace' }), /workspace 根目录/)
})
test('workspace 内业务目录 → 放行', () => {
  assert.equal(call({ pattern: 'x', path: 'C:/Users/Administrator/Documents/deepseek-harness/default-workspace/src/views/flood' }), null)
})
test('~/.dsh 本身 → 拒绝', () => {
  assert.match(call({ pattern: 'x', path: 'C:\\Users\\Administrator\\.dsh' }), /受保护容器/)
})
test('~/.dsh/cost-meter/lib → 放行', () => {
  assert.equal(call({ pattern: 'x', path: 'C:\\Users\\Administrator\\.dsh\\cost-meter\\lib' }), null)
})
test('D:/repository 本身 → 拒绝', () => {
  assert.match(call({ pattern: 'x', path: 'D:/repository' }), /受保护容器/)
})
test('D:/repository/skills/zentao-analyzer → 放行', () => {
  assert.equal(call({ pattern: 'x', path: 'D:/repository/skills/zentao-analyzer' }), null)
})
test('git 仓库根 → 拒绝（gitProbe）', () => {
  assert.match(call({ pattern: 'x', path: 'D:/repo/zhi2-web-admin' }, git), /git 仓库根/)
})
test('同仓库业务子目录 → 放行', () => {
  assert.equal(call({ pattern: 'x', path: 'D:/repo/zhi2-web-admin/src/views/flood' }, git), null)
})
test('相对业务路径 → 放行', () => {
  assert.equal(call({ pattern: 'x', path: 'src/views/flood' }), null)
})
test('非 grep/glob 工具 → 不拦截', () => {
  assert.equal(decideInterception({ tool: 'read', args: { file_path: 'C:\\Users\\Administrator\\.dsh' }, roots: scopeRoots, gitProbe: noGit }), null)
})
test('glob 同样受拦截', () => {
  assert.match(call({ pattern: '**/*.ts', path: '.' }), /工作区根/)
})

console.log('\n=== P0-3 禁用 pwsh 递归列举 ===')
const pwshCall = (command) => decideInterception({ tool: 'pwsh', args: { command }, roots: scopeRoots, gitProbe: noGit })
test('Get-ChildItem -Recurse → 拒绝', () => {
  assert.match(pwshCall('Get-ChildItem -Recurse'), /递归列举/)
})
test('gci -r → 拒绝', () => {
  assert.match(pwshCall('gci -r'), /递归列举/)
})
test('ls -r → 拒绝', () => {
  assert.match(pwshCall('ls -r'), /递归列举/)
})
test('dir /s → 拒绝', () => {
  assert.match(pwshCall('cmd /c dir /s'), /递归列举/)
})
test('带 -Path/-Filter 收窄 → 放行（不误伤定向列举）', () => {
  assert.equal(pwshCall('Get-ChildItem -Path src -Recurse -Filter *.js'), null)
})
test('无递归旗标 → 放行', () => {
  assert.equal(pwshCall('Get-ChildItem src -Filter *.ts'), null)
})
test('git rev-list -r 不误伤（-r 出现在别的词里）', () => {
  assert.equal(pwshCall('git rev-list -r -- count HEAD'), null)
})
test('Get-Content 路径含 dir 片段不误伤', () => {
  assert.equal(pwshCall('Get-Content D:\\repo\\dir\\file.txt'), null)
})
test('非 pwsh 命令工具不拦截', () => {
  assert.equal(decideInterception({ tool: 'grep', args: { command: 'Get-ChildItem -Recurse', pattern: 'x', path: 'src/x' }, roots: scopeRoots, gitProbe: noGit }), null)
})

console.log('\n=== P1-5 pwsh POSIX 兼容预检（自动改写 + 仅告警）===')
test('head -n N 改写为 Select-Object -First N', () => {
  const args = { command: 'Get-ChildItem | head -n 5' }
  const { repairs } = repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(args.command, 'Get-ChildItem | Select-Object -First 5')
  assert.equal(repairs.filter((r) => r.rule === 'pwsh-posix-rewrite').length, 1)
})
test('tail -N 改写为 Select-Object -Last N', () => {
  const args = { command: 'Get-Content a.log | tail -20' }
  repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(args.command, 'Get-Content a.log | Select-Object -Last 20')
})
test('cat <path> 改写为 Get-Content <path>', () => {
  const args = { command: 'cat package.json' }
  repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(args.command, 'Get-Content package.json')
})
test('grep 仅告警、不改命令', () => {
  const args = { command: 'Get-ChildItem | grep foo' }
  const { repairs } = repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(args.command, 'Get-ChildItem | grep foo')
  assert.equal(repairs.filter((r) => r.rule === 'pwsh-posix-warn').length, 1)
})
test('wc / find 各记一条告警', () => {
  const args = { command: 'Get-Content a.log | wc -l; find . -name "*.js"' }
  const { repairs } = repairArguments({ toolName: 'pwsh', args, schema: {} })
  assert.equal(repairs.filter((r) => r.rule === 'pwsh-posix-warn').length, 2)
})
test('参数里的 grep 子串不误伤（--grep= / 引号内 / grep.js）', () => {
  for (const command of ['git log --grep=fix', 'Select-String -Pattern "grep"', 'Get-Content grep.js']) {
    const { repairs } = repairArguments({ toolName: 'pwsh', args: { command }, schema: {} })
    assert.equal(repairs.filter((r) => r.rule === 'pwsh-posix-warn').length, 0, command)
    assert.equal(repairs.filter((r) => r.rule === 'pwsh-posix-rewrite').length, 0, command)
  }
})

console.log('\n=== P1-6 glob / grep Windows 绝对路径分隔符规范化 ===')
test('glob 盘符绝对路径统一为反斜杠', () => {
  const args = { pattern: '**/*.ts', path: 'D:/repository/skills/src' }
  const { repairs } = repairArguments({ toolName: 'glob', args, schema: {} })
  assert.equal(args.path, 'D:\\repository\\skills\\src')
  assert.equal(repairs.filter((r) => r.rule === 'glob-path-normalize').length, 1)
})
test('grep 盘符绝对路径统一为反斜杠', () => {
  const args = { pattern: 'x', path: 'C:/Users/x/src' }
  repairArguments({ toolName: 'grep', args, schema: {} })
  assert.equal(args.path, 'C:\\Users\\x\\src')
})
test('相对路径不误伤', () => {
  const args = { pattern: '**/*.ts', path: 'src/views/flood' }
  const { repairs } = repairArguments({ toolName: 'glob', args, schema: {} })
  assert.equal(args.path, 'src/views/flood')
  assert.equal(repairs.filter((r) => r.rule === 'glob-path-normalize').length, 0)
})
test('已是反斜杠的盘符路径不动', () => {
  const args = { pattern: 'x', path: 'D:\\repository\\skills\\src' }
  const { repairs } = repairArguments({ toolName: 'glob', args, schema: {} })
  assert.equal(args.path, 'D:\\repository\\skills\\src')
  assert.equal(repairs.filter((r) => r.rule === 'glob-path-normalize').length, 0)
})
test('非 glob/grep 工具的 path 不处理', () => {
  const args = { file_path: 'D:/a/b' }
  const { repairs } = repairArguments({ toolName: 'read', args, schema: {} })
  assert.equal(args.file_path, 'D:/a/b')
  assert.equal(repairs.filter((r) => r.rule === 'glob-path-normalize').length, 0)
})

console.log('\n=== P1-7 重复整读检测 ===')
test('isWholeFileRead：无 offset/limit 视为整读', () => {
  assert.equal(isWholeFileRead({ file_path: 'a.js' }), 'a.js')
})
test('isWholeFileRead：带 offset 或 limit 不算整读', () => {
  assert.equal(isWholeFileRead({ file_path: 'a.js', offset: 10 }), null)
  assert.equal(isWholeFileRead({ file_path: 'a.js', limit: 50 }), null)
})
test('首次整读放行，二次整读拒绝', () => {
  const state = new Set()
  assert.equal(shouldRejectDuplicateRead(state, { file_path: 'a.js' }), null)
  state.add('a.js')
  assert.match(shouldRejectDuplicateRead(state, { file_path: 'a.js' }), /已整读过 a\.js/)
})
test('带 offset/limit 的续读不拒绝', () => {
  const state = new Set(['a.js'])
  assert.equal(shouldRejectDuplicateRead(state, { file_path: 'a.js', offset: 20 }), null)
  assert.equal(shouldRejectDuplicateRead(state, { file_path: 'a.js', limit: 100 }), null)
})
test('不同文件不误伤', () => {
  const state = new Set(['a.js'])
  assert.equal(shouldRejectDuplicateRead(state, { file_path: 'b.js' }), null)
})

console.log(`\n${failed === 0 ? 'PASS' : 'FAIL'}  passed=${passed} failed=${failed}\n`)
process.exit(failed === 0 ? 0 : 1)
