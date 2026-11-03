# 苏服办H5初始化顺序与qqMapKey请求约束
无锡市区小程序嵌入H5中 initQqMapKeys 必须在 await initH5Context 之后执行，且无 token 时不请求 getConfigKey。

## 现象与根因
- getConfigKey（拉 qq.map.key）走 @/api 拦截器，请求头却无 Authorization
- 小程序 web-view 嵌入 H5 时，URL token 由 initH5Context 写入 userStore
- 若 App.vue 在 initQqMapKeys() 早于 await initH5Context(getH5Param) 执行，拦截器里 userStore.token 仍为空

## 修复方案
- 启动顺序：await initH5Context 后再 initQqMapKeys()
- qqMapKey.js 无 token 时直接跳过 getConfigKey（小程序端从 storage 恢复 token 时一般不受影响）

## 验证与归属
- 验证会话：ef15cdae-5895-485b-9248-03961a3b0697（基线 2e9862a）
- 涉及文件：src/App.vue、src/utils/qqMapKey.js、src/api/index.js
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "qqmapkey_init_order",
  "source_extraction_id": "ebbf4b220692482fb080e0c398f71fe7",
  "version": 1,
  "memory_type": "entities"
}
-->