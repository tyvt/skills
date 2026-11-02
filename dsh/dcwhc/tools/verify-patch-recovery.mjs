/**
 * 验证 patch-upstream 的恢复能力：
 * 1. 产出一份"未打补丁"的纯净上游副本（把我们的改动逐条撤销）；
 * 2. 在隔离的 DSH_HOME 里让脚本对它打补丁；
 * 3. 逐条核对 6 项是否都回到位；
 * 4. 再跑一次，确认幂等（不会有重复插入）；
 * 5. 语法检查，确保结果能被 Node 解析。
 *
 * 用法：node ~/.dsh/dcwhc/tools/verify-patch-recovery.mjs
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const realHome = process.env.USERPROFILE ?? process.env.HOME
const realUpstream = join(
  realHome,
  '.dsh',
  'profiles',
  'web',
  'node_modules',
  'dsh-channel-wechat',
  'lib',
  'index.js',
)
const script = join(realHome, '.dsh', 'dcwhc', 'tools', 'patch-upstream.mjs')
const sandbox = join(realHome, '.dsh-companion-recovery-test')

let failures = 0
const check = (name, ok, detail) => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || detail === undefined ? '' : ` — ${detail}`}`)
  if (!ok) failures += 1
}

if (!existsSync(realUpstream)) {
  console.error('找不到上游插件，无法验证。')
  process.exit(1)
}

/** 把我们的改动逐条撤销，还原成"刚升级完"的样子。 */
function stripPatches(source) {
  let text = source
  text = text.replace('\nimport { pathToFileURL } from "node:url";', '')
  text = text.replace(
    /\n\t\/\*\*\n\t\* 外部插件可选接管的入站文本。[\s\S]*?\n\tclaimsExternalPeer;/,
    '',
  )
  text = text.replace('\n\t\tthis.claimsExternalPeer = options.claimsExternalPeer;', '')
  text = text.replace(
    /\n\t\t\t\t\/\/ 扩展点：外部插件（如 channel-wechat-companion）认领前的最后机会。[\s\S]*?=== true\) return;/,
    '',
  )
  text = text.replace(
    '\n\t\t...externalSeamInbound === void 0 ? {} : { claimsExternalPeer: externalSeamInbound },',
    '',
  )
  text = text.replace('\n\tconst claimsExternalPeer = await loadExternalSeam();', '')
  text = text.replace(/\n\/\*\*\n\* 外部扩展点：可选加载[\s\S]*?\n\}\n/, '\n')
  return text
}

rmSync(sandbox, { recursive: true, force: true })
const targetDir = join(sandbox, 'profiles', 'web', 'node_modules', 'dsh-channel-wechat', 'lib')
mkdirSync(targetDir, { recursive: true })

// 1. 纯净副本
const pristine = stripPatches(readFileSync(realUpstream, 'utf8'))
const target = join(targetDir, 'index.js')
writeFileSync(target, pristine, 'utf8')

console.log('\n=== 1. 纯净副本应被判定为"缺失" ===')
try {
  execFileSync(process.execPath, [script, '--check'], {
    env: { ...process.env, DSH_HOME: sandbox },
    stdio: 'pipe',
  })
  check('--check 退出码非 0（表示缺失）', false, '意外返回 0')
} catch (error) {
  check('--check 退出码非 0（表示缺失）', error.status === 2, `退出码 ${error.status}`)
}
check('纯净副本确实不含扩展点', !pristine.includes('loadExternalSeam'))

console.log('\n=== 2. 打补丁 ===')
execFileSync(process.execPath, [script], { env: { ...process.env, DSH_HOME: sandbox }, stdio: 'inherit' })

const patched = readFileSync(target, 'utf8')
console.log('\n=== 3. 逐条核对 ===')
const EXPECTED = [
  ['import pathToFileURL', 'import { pathToFileURL } from "node:url";'],
  ['claimsExternalPeer 字段', 'claimsExternalPeer;'],
  ['claimsExternalPeer 赋值', 'this.claimsExternalPeer = options.claimsExternalPeer;'],
  ['serialize 接管判断', 'this.claimsExternalPeer !== void 0 && await this.claimsExternalPeer('],
  ['runChannel 注入', 'claimsExternalPeer: externalSeamInbound'],
  ['startChannelFromStore 等待', 'const claimsExternalPeer = await loadExternalSeam();'],
  ['loadExternalSeam 本体', 'async function loadExternalSeam()'],
  ['hook 路径', 'join(resolveDshHome(), "dcwhc", "lib", "upstream-hook.mjs")'],
]
for (const [name, needle] of EXPECTED) check(name, patched.includes(needle))

console.log('\n=== 4. 幂等：再打一次不应改动 ===')
const before = readFileSync(target, 'utf8')
execFileSync(process.execPath, [script], { env: { ...process.env, DSH_HOME: sandbox }, stdio: 'inherit' })
check('内容未变', readFileSync(target, 'utf8') === before)
check('loadExternalSeam 只出现一次', (patched.match(/async function loadExternalSeam\(\)/g) ?? []).length === 1)

console.log('\n=== 5. 语法检查 ===')
try {
  execFileSync(process.execPath, ['--check', target], { stdio: 'pipe' })
  check('补丁后语法合法', true)
} catch (error) {
  check('补丁后语法合法', false, String(error.stderr ?? error.message).slice(0, 200))
}

rmSync(sandbox, { recursive: true, force: true })
console.log(`\n${failures === 0 ? '恢复能力验证通过' : `${failures} 项失败`}`)
process.exit(failures === 0 ? 0 : 1)
