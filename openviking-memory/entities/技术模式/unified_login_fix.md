
# 统一登录页公共路径修复
产品2.0 的 zhi2-web-admin 中 UnifiedLogin.vue 因图片路径带 public 前缀导致构建报错，已替换为绝对路径。
## 问题原因
- `UnifiedLogin.vue` 中图片路径写成 `public/assets/images/...`
- Vite 下 public 目录资源应使用以 `/` 开头的绝对路径（如 `/assets/...`）
- 构建时 Rollup 将 `public/assets/...` 当作模块导入解析从而报错
## 修复方案
- 将 `UnifiedLogin.vue` 中全部 13 处 `public/assets/` 替换为 `/assets/`
- 与项目中其他页面（如 `StatisticsDialog.vue`）及该文件 CSS 中 `banner_1.png` 引用方式一致
- 构建耗时约 3 分 20 秒，已正常结束（exit code: 0）
## 涉及文件与归属
- 文件：`UnifiedLogin.vue`、`StatisticsDialog.vue`
- 项目：产品2.0；来源会话：e9d3b12e-b9f2-4d0b-97e0-bd14f38d344c；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_login_fix",
  "source_extraction_id": "b7792fafce8b4fca99fa4738624ecb8a",
  "version": 1,
  "memory_type": "entities"
}
-->