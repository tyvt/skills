# pages_owner/payment 移除 isOffline mock 分支
i-H5 的 src/pages_owner/payment/index.vue 已移除 isOffline 等 mock 分支，运行时报错系旧编译产物缓存所致。

## 修改内容
- src/pages_owner/payment/index.vue 已无 isOffline、getNetworkType、onNetworkStatusChange 等引用
- 全项目搜索不到 isOffline

## 问题排查
- 运行时报错 Object.success (index.js?[sm]:288) 系旧 index.js 仍被执行
- 原因为微信开发者工具/热更新缓存了旧编译产物

## 解决方案
- 停掉当前运行（HBuilderX/CLI dev）
- 微信开发者工具执行"清缓存并重新编译"或删除项目后重新导入
- 重新启动项目并编译到小程序验证

## 验证与归属
- 验证证据：extracted source=cursor project=i-H5
- 涉及文件：src/pages_owner/payment/index.vue
- 所属项目：i-H5；来源会话ID：2acd9711-2f9b-410a-bf4b-dc8c613c647f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_remove_mock",
  "source_extraction_id": "57bd400ac05b43899f12695d6493c645",
  "version": 1,
  "memory_type": "entities"
}
-->