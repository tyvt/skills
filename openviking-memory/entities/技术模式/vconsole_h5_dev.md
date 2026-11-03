# vconsole 仅 H5+开发环境启用并统一打印接口响应
接 vconsole 用 uni-app 条件编译 #ifdef H5 且仅 import.meta.env.DEV 时初始化，避免非 H5 端打包和生产出现调试面板。

## 方案说明
- 用 uni-app 条件编译 #ifdef H5 且仅 import.meta.env.DEV 时初始化 vconsole
- 两套 axios 实例（业务网关 + VITE_BASE_API）的拦截器都统一打印 [API Response](url/method/data) 与 [API Response Error](非取消请求)

## 验证与归属
- 验证：会话 9314668a 加 vconsole，H5+DEV 启用，拦截器打印响应（证据 012.md）
- 涉及文件：src/main.js、src/request/index.js、src/api/gateway.js
- 来源会话ID：9314668a-621e-4143-a254-3f09b85eb124；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vconsole_h5_dev",
  "source_extraction_id": "5275a4e5dacb42f1bcfc39133d795b60",
  "version": 1,
  "memory_type": "entities"
}
-->