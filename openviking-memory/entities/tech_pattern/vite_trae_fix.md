# Vite编辑器环境回退修复
在 vite.config.js 中处理 VITE_EDITOR 环境变量被 trae 占用导致 Cursor 无法打开的问题，改为优先 cursor --goto 并回退。

## 根因
- 运行环境实际用了 VITE_EDITOR=trae，优先执行 trae 导致 Cursor 不打开

## 解决方案
- 统一兼容 file:// 与 /@fs/ 路径格式
- 先尝试 cursor --goto（含行列定位）
- 失败回退到 VITE_EDITOR 配置
- 全部失败返回 500（不再假成功）

## 验证与归属
- 验证证据：extracted source=cursor project=web-admin
- 本地联调接口成功返回 200：http://localhost:8081/__open-in-editor 正常执行
- 涉及文件：zhi2-web-admin/vite.config.js
- 所属项目：web-admin
- 来源会话：1103b16c-4890-4f8a-a409-bc6d9313e68c

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "vite_trae_fix",
  "source_extraction_id": "18f82935fd2c487fb706eb101de65d9c",
  "version": 1,
  "memory_type": "entities"
}
-->