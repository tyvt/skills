# 共有资金公示表页签隐藏
「公共收益」缺少「公示表」页签，根因是 sharedFunds/index.vue 的 tabs 配置在 2026-08-11 提交 0fa7b58 将 publicity 行注释隐藏，并非页面缺失。

## 路由区分
- 共有资金三页签 UI 对应 pages_benefit/sharedFunds/index（共有资金）
- 首页快捷入口的 benefit/index 为经营性收支公示列表，两者是不同路由
- 经营性公示列表仍走 benefit/index，不依赖 sharedFunds 的 publicity 页签

## 变更与恢复
- 2026-06-18 新建时 sharedFunds 三页签（总览/明细/公示表）齐全
- 2026-08-11 提交 0fa7b58 在 sharedFunds/index.vue 的 tabs 配置注释 `{ key: "publicity", label: "公示表" }`
- PublicityTab.vue 组件文件仍存在，仅 tabs 配置隐藏
- 恢复方式：取消 tabs 里 publicity 行注释即可，无需新建页面

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话 3046796a git 结论确认 commit 0fa7b58 注释 publicity 行
- 涉及文件：src/pages_benefit/sharedFunds/index.vue、src/pages_benefit/benefit/index.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：3046796a-f407-4dcd-ada2-855aada9eac3；代码基线：86395e1

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "shared_funds_publicity_tab",
  "source_extraction_id": "cd81d20ab5a649d4ac1a4172157e807a",
  "version": 1,
  "memory_type": "entities"
}
-->