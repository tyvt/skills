# vconsole H5调试面板启用与接口日志
惠山二期H5等项目在H5环境下通过vConsole进行调试，并按环境开关打印接口请求/响应/错误日志。

## 方案说明
- 依赖使用 vconsole（原 eruda 已替换，版本 vconsole@3.15.1）
- 环境变量 VITE_APP_VCONSOLE 控制：开发/测试=1，生产=0；早期仅 import.meta.env.DEV 启用，后扩展至测试环境
- 在 main.ts（或 main.js）中判断 H5 且开启时加载 vConsole，页面右下角出现绿色按钮
- src/api/index.js 中当 VITE_APP_VCONSOLE=1 时打印：[API Request]（url、method、params、headers）、[API Response]（url、method、statusCode、responseHeaders、data）、[API Error]（含error）；普通请求与文件上传均记录
- vite.config.ts 中 drop_console 改为仅 production 生效，测试环境日志可在 vConsole Log 面板显示

## 验证与归属
- 惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）验证：会话 ce82ed4f-71c3-4c81-b7b8-45a7512f22f8 完成替换与日志接入
- 早期验证：会话 9314668a 加 vconsole，H5+DEV 启用，拦截器打印响应（证据 012.md）
- 涉及文件：main.ts、src/api/index.js、vite.config.ts、.env.test、package.json；早期涉及 src/main.js、src/request/index.js、src/api/gateway.js
- 来源会话ID：ce82ed4f-71c3-4c81-b7b8-45a7512f22f8 与 9314668a-621e-4143-a254-3f09b85eb124；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vconsole_h5_dev",
  "source_extraction_id": "1807f7f40b37437882a8c1d8884b1b34",
  "version": 2,
  "memory_type": "entities"
}
-->