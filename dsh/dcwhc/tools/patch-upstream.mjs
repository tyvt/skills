/**
 * 把上游扩展点重新打进 `dsh-channel-wechat` 的 lib/index.js。
 *
 * 什么时候需要跑：`dsh plugin update`、`pnpm install`、或任何重装
 * `dsh-channel-wechat` 的操作之后。上游升级会把那三处改动覆盖掉，覆盖后
 * 一切降级为"能收不能回"——推送照常，卡片回复无效。
 *
 * 用法：
 *   node ~/.dsh/dcwhc/tools/patch-upstream.mjs           # 打补丁（幂等）
 *   node ~/.dsh/dcwhc/tools/patch-upstream.mjs --check   # 只检查当前状态
 *
 * 设计要点：
 * - **幂等**：已经打过就跳过，不会重复插入。
 * - **原子**：先写临时文件再改名，中途失败不会留下半个文件。
 * - **可回滚**：改动前备份到 `*.bak-companion`。
 * - **不改逻辑**：只插入，不删除、不重排上游任何既有代码。
 */

import { copyFileSync, existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

/** 上游插件的入口文件位置：优先 profile 里的实体目录。 */
function upstreamPath() {
  const home = process.env.DSH_HOME?.trim() || join(homedir(), '.dsh')
  const candidates = [
    join(home, 'profiles', 'web', 'node_modules', 'dsh-channel-wechat', 'lib', 'index.js'),
  ]
  for (const candidate of candidates) if (existsSync(candidate)) return candidate
  return undefined
}

/* ------------------------------------------------------------------ *
 * 三处改动。每条都是「锚点 + 要插入的内容」，找不到锚点就明确失败，
 * 而不是猜一个位置插进去——上游改了结构时，宁可不打补丁也不要打错位置。
 * ------------------------------------------------------------------ */

const PATCHES = [
  {
    name: '在命令和卡片路由前保存会话凭据',
    find: `				const text = textOf(message);`,
    replace: (anchor) => `				// companion-context-observer: observe every inbound message without claiming it.
				if (this.claimsExternalPeer !== void 0) await this.claimsExternalPeer({
					accountId: this.options.accountId,
					peerId,
					contextToken: parseInboundMessage(message)?.contextToken,
					observeOnly: true
				});
${anchor}`,
    applied: (source) => source.includes('// companion-context-observer:'),
  },
  {
    name: 'import pathToFileURL',
    find: 'import { createRequire } from "node:module";',
    replace: (anchor) => `${anchor}\nimport { pathToFileURL } from "node:url";`,
    applied: (source) => source.includes('import { pathToFileURL } from "node:url";'),
  },
  {
    name: 'Channel 的 claimsExternalPeer 字段与赋值',
    find: `	/** Ending, moving, and cancelling a peer's conversation. */
	lifecycle;
	/**
	* @param options - the poll, the send, and the policy.
	*/
	constructor(options) {
		this.options = options;
		this.cards = options.cards;`,
    replace: (anchor) => `	/** Ending, moving, and cancelling a peer's conversation. */
	lifecycle;
	/**
	* 外部插件可选接管的入站文本。
	*
	* 由 \`runChannel\` 从 \`loadExternalSeam\` 注入；没装外部插件时是 undefined，
	* 行为与不装完全一致。返回 true 表示这条文本已被外部卡片消费，不再当输入。
	*/
	claimsExternalPeer;
	/**
	* @param options - the poll, the send, and the policy.
	*/
	constructor(options) {
		this.options = options;
		this.cards = options.cards;
		this.claimsExternalPeer = options.claimsExternalPeer;`,
    applied: (source) => source.includes('this.claimsExternalPeer = options.claimsExternalPeer;'),
  },
  {
    name: 'serialize 里的接管判断',
    find: `				if (text !== void 0 && this.cards?.addressesCard(text) === true) {
					const reply = work();
					this.commandWork.add(reply);
					reply.finally(() => this.commandWork.delete(reply));
					await reply;
					return;
				}`,
    replace: (anchor) => `${anchor}
				// 扩展点：外部插件（如 channel-wechat-companion）认领前的最后机会。
				// 它认领的文本不进入会话，只用于答复它自己发出、由别的会话产生的卡片。
				if (text !== void 0 && this.claimsExternalPeer !== void 0 && await this.claimsExternalPeer({
					peerId,
					text,
					contextToken: parseInboundMessage(message)?.contextToken
				}) === true) return;`,
    applied: (source) => source.includes('this.claimsExternalPeer !== void 0 && await this.claimsExternalPeer('),
  },
  {
    name: 'runChannel 里注入 claimsExternalPeer',
    find: `		sessionExists: options.sessionExists,
		accountId: account.accountId,
		...options.executeNativeCommand === void 0 ? {} : { executeNativeCommand: options.executeNativeCommand },`,
    replace: (anchor) => `		sessionExists: options.sessionExists,
		accountId: account.accountId,
		...externalSeamInbound === void 0 ? {} : { claimsExternalPeer: externalSeamInbound },
		...options.executeNativeCommand === void 0 ? {} : { executeNativeCommand: options.executeNativeCommand },`,
    applied: (source) => source.includes('...externalSeamInbound === void 0 ? {} : { claimsExternalPeer: externalSeamInbound },'),
  },
  {
    name: 'startChannelFromStore 里等待加载',
    find: `	const baseUrl = account.baseUrl ?? "https://ilinkai.weixin.qq.com";
	options.onStarted?.(account.accountId);`,
    replace: (anchor) => `	const baseUrl = account.baseUrl ?? "https://ilinkai.weixin.qq.com";
	const claimsExternalPeer = await loadExternalSeam();
	options.onStarted?.(account.accountId);`,
    applied: (source) => source.includes('const claimsExternalPeer = await loadExternalSeam();'),
  },
]

/** 加载器函数本体，单独一段整体插入。 */
const LOADER = `/**
* 外部扩展点：可选加载 \`~/.dsh/dcwhc/lib/upstream-hook.mjs\`。
*
* 设计约束是**缺省即原样**：文件不存在、语法坏掉、或导出不是函数，都只记一行
* 日志然后当作没装，绝不让本插件的通道起不来。
*
* 为什么放在这里而不是让外部插件自己订阅：入站文本必须在本插件把它当对话
* 输入之前拿到，而且微信的 sendmessage 需要那条消息的 context_token，这两样
* 都只存在于本插件的轮询循环里。外部插件不该复制一份轮询去抢同一个游标。
*
* @returns 一个函数：(payload: { peerId, text, contextToken }) => Promise<boolean>
*   或 undefined（外部文件不存在/不可用）。
*/
let externalSeamLoaded = false;
let externalSeamInbound;
async function loadExternalSeam() {
	if (externalSeamLoaded) return externalSeamInbound;
	externalSeamLoaded = true;
	const candidates = [
		join(resolveDshHome(), "dcwhc", "lib", "upstream-hook.mjs")
	];
	for (const candidate of candidates) {
		if (!existsSync(candidate)) continue;
		try {
			const module = await import(pathToFileURL(candidate).href);
			const claim = module.claimInbound ?? module.default;
			if (typeof claim !== "function") continue;
			externalSeamInbound = (payload) => Promise.resolve(claim(payload)).then((value) => value === true, (error) => {
				console.error(\`[channel-wechat] external seam (\${candidate}) threw: \${String(error)}\`);
				return false;
			});
			console.log(\`[channel-wechat] external seam loaded: \${candidate}\`);
			return externalSeamInbound;
		} catch (error) {
			console.error(\`[channel-wechat] external seam (\${candidate}) failed to load: \${String(error)}\`);
		}
	}
	return externalSeamInbound;
}
`

const LOADER_ANCHOR = '/**\n* Probe whether a peer\'s session already has persisted state.'

/* ------------------------------------------------------------------ *
 * 执行
 * ------------------------------------------------------------------ */

const checkOnly = process.argv.includes('--check')
const target = upstreamPath()
if (target === undefined) {
  console.error('找不到 dsh-channel-wechat/lib/index.js。先确认插件已安装，或设置 DSH_HOME。')
  process.exit(1)
}

let source = readFileSync(target, 'utf8')
const before = source

const missing = PATCHES.filter((patch) => !patch.applied(source))
const hasLoader = source.includes('async function loadExternalSeam()')

if (checkOnly) {
  console.log(`目标: ${target}`)
  console.log(`扩展点状态: ${missing.length === 0 && hasLoader ? '已完整应用' : '缺失'}`)
  for (const patch of PATCHES) {
    console.log(`  ${patch.applied(source) ? '✓' : '✗'} ${patch.name}`)
  }
  console.log(`  ${hasLoader ? '✓' : '✗'} loadExternalSeam 函数本体`)
  process.exit(missing.length === 0 && hasLoader ? 0 : 2)
}

if (missing.length === 0 && hasLoader) {
  console.log('扩展点已经完整应用，无需改动。')
  process.exit(0)
}

// 先验证每个锚点都能找到，避免打一半留下不一致的状态。
for (const patch of missing) {
  if (!source.includes(patch.find)) {
    console.error(`锚点缺失，未做任何改动：${patch.name}`)
    console.error('上游结构已经变化，需要人工确认新位置。')
    process.exit(1)
  }
}

for (const patch of missing) {
  source = source.replace(patch.find, patch.replace(patch.find))
  console.log(`已插入: ${patch.name}`)
}

if (!hasLoader) {
  if (!source.includes(LOADER_ANCHOR)) {
    console.error('找不到 loadExternalSeam 的插入位置，未做任何改动。')
    process.exit(1)
  }
  source = source.replace(LOADER_ANCHOR, `${LOADER}${LOADER_ANCHOR}`)
  console.log('已插入: loadExternalSeam 函数本体')
}

// 原子写：先写临时文件，再改名覆盖。
const backup = `${target}.bak-companion`
const scratch = `${target}.companion-tmp`
writeFileSync(scratch, source, 'utf8')
if (!existsSync(backup)) copyFileSync(target, backup)
renameSync(scratch, target)

console.log(`\n完成。改动前的备份: ${backup}`)
console.log('重启 DSH 后生效。用 --check 可随时复核状态。')
