/**
 * 用 DSH 自己的加载器读一遍**真实 profile**，确认 companion 会被加载。
 * 这是重启前唯一的权威检查，避免又多一轮"重启才发现没生效"。
 */

import { loadProfileDirectory } from 'file:///D:/nvm/nodejs/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-app-boot/lib/index.js'

const profileDir = process.argv[2]
const installAnchor = process.argv[3]

const loaded = loadProfileDirectory('dsh', profileDir, installAnchor)

console.log('=== bundles 层 ===')
for (const layer of loaded.layers) {
  const ids = layer.patches.flatMap((patch) =>
    patch?.insert ? patch.insert.map((entry) => entry?.id) : [patch?.id],
  ).filter(Boolean)
  console.log(`  ${layer.packageName}: ${JSON.stringify(ids.slice(0, 8))}`)
}

console.log('\n=== skippedBundles ===')
console.log(loaded.skippedBundles.length === 0 ? '  （无，全部加载成功）' : JSON.stringify(loaded.skippedBundles, null, 2))

const companion = loaded.layers.find((layer) => layer.packageName === 'dsh-channel-wechat-companion')
console.log('\n=== companion 层 ===')
if (companion === undefined) {
  console.log('  ✗ 未出现在 layers 里')
  process.exit(1)
}
const insert = companion.patches[0]?.insert?.[0]
console.log('  bundle 路径:', companion.packageDir)
console.log('  条目:', JSON.stringify({ id: insert?.id, name: insert?.name }))
console.log('  配置:', JSON.stringify(insert?.config))

const userPatch = loaded.patches.find((patch) => patch?.id === 'channel-wechat-companion')
console.log('\n=== profile 覆盖层 ===')
console.log('  ', userPatch === undefined ? '✗ 没有该条目' : JSON.stringify(userPatch.config))

const ok = insert?.id === 'channel-wechat-companion' && insert?.name === 'dsh-channel-wechat-companion'
console.log(`\n结论: ${ok ? '可以在重启后生效' : '仍有问题，不要重启'}`)
process.exit(ok ? 0 : 1)
