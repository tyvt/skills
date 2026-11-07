# 构建裁剪脚本正则与 uni.scss 强耦合致主包超限
zhi2-mobile-shimin 构建后 prune-component-wxss-leak.mjs 的 LEAK_END 正则匹配 uni.scss 全局类，uni.scss 改动后正则失效致组件 wxss 泄漏。

## 现象与根因
- npm run build 时 size:main 报 MAIN 上传预估 2110.8KB OVER LIMIT（限制 2048KB），但磁盘体积 1804.1KB 正常。
- 根因：uni-app 把 uni.scss 全局样式注入每个组件 wxss；裁剪脚本用 LEAK_END 正则定位删除片段。本次 uni.scss 新增 .container/.success-page 且 min-height:100% 改 inherit，正则未匹配，32 组件各泄漏约 8.3KB 合计 267KB。
- 「磁盘 ok、上传预估 over」差值约 300KB 即泄漏信号。

## 解决方案
- 改 uni.scss 全局类名/属性值时同步检查 prune-component-wxss-leak.mjs 正则，兼容新增类名与 min-height 两种取值。
- 修复后 components 从 431.6KB 降到 164.6KB，上传预估降到 1798.4KB。
- 日常可单独跑 npm run size:main 快速验体积（validate-dist 末尾自动跑）。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 ec247072（基线 none）构建报 OVER LIMIT；更新正则兼容 .container/.success-page 与 min-height:inherit 后 components 431.6KB→164.6KB、MAIN 磁盘 1804.1KB→1537.1KB、上传预估→1798.4KB ok。
- 涉及文件：scripts/prune-component-wxss-leak.mjs、src/uni.scss、scripts/size-main-package.mjs、src/pages.json、scripts/validate-dist.mjs、package.json、src/components/shared/SuccessCard.vue、dist/components/shared/SuccessCard.wxss
- 所属项目：苏住房C；来源会话ID：ec247072-d32c-44f5-838a-cfbdfe935169；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "prune_script_regex_uni_scsc",
  "source_extraction_id": "bf93ed7583b04cdc899775f3a7eb2b15",
  "version": 2,
  "memory_type": "entities"
}
-->