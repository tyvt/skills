---
audit_status: valid
last_checked: 2026-11-28T00:20:04+08:00
verdict_note: 产品2.0 vite.config.js 命中 legacy-js-api/preprocessorOptions/api，Sass 新 API 配置属实
---
# Vite Sass 新 API 消除 legacy-js-api 告警
在 zhi2-web-admin/vite.config.js 的 css.preprocessorOptions.scss 下新增 Sass 新 API 配置，消除 legacy-js-api deprecation warning。

## 解决方案
- 新增 api: "modern-compiler"
- 新增 silenceDeprecations: ["legacy-js-api"] 作为兜底，防止残余依赖继续刷告警

## 验证
- vite 配置变更后自动重启，终端未再出现该告警
- 额外执行 npm run --workspace=zhi2-web-admin build，构建成功且无该 deprecation warning
- 注意：验证构建会改动 zhi2-web-admin/public/version.json 并生成 zhi2-web-admin/report.html（属现有构建流程行为）

## 验证与归属
- 验证证据: extracted source=cursor project=bugfix
- 涉及文件: zhi2-web-admin/vite.config.js
- 会话: a1ebd2a6-28fa-4527-80a4-c3ee8e3e5e62
- 所属项目: bugfix

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sass_legacy_fix",
  "source_extraction_id": "13c17fa23675494eb513637d319d8231",
  "version": 1,
  "memory_type": "entities"
}
-->