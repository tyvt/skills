# drop_console 仅生产环境启用
为保证测试日志可见，drop_console 仅在生产环境启用，测试环境用 vconsole 调试。

## 描述
- 测试环境通过 main.ts 中 VITE_APP_VCONSOLE 控制加载 vconsole@3.15.1
- 请求日志打印在 src/api/index.js
- vite.config.ts 的 drop_console 必须仅在生产模式生效，避免测试环境 vConsole 日志被清除

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 验证来源：惠山二期H5/004.md
- 涉及文件：package.json、vite.config.ts、src/main.ts、惠山V1小程序/src/main.js、index.html、src/env.d.ts、src/api/index.js、main.ts
- 所属项目：惠山二期H5；来源会话：ce82ed4f-71c3-4c81-b7b8-45a7512f22f8；代码基线：无

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "drop_console_prod_only",
  "source_extraction_id": "5eb3d574981745b1b7d0d7203f70f57b",
  "version": 2,
  "memory_type": "entities"
}
-->