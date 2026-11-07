# 门户 publicPortal 背景 JPG 与 SCSS 同 PR 提交
`.public-portal` 通过 SCSS 引用 `/assets/images/homeNew/portal_page_bg.jpg` 时，JPG 必须与样式同 PR 纳入版本库。

## 风险说明
- 若只提交样式与 README 而未把 JPG 纳入版本库，构建产物缺少文件
- 页面仅显示回退色（如 `#dfe6ee`）
- 背景图未跟踪时只提交 SCSS 会导致线上 404（MEDIUM 级）

## 提交规范
- 审查合并前需确认 `public/assets/images/homeNew/portal_page_bg.jpg` 与 `portal.scss` 一并提交

## 验证与归属
- 验证证据：[MEDIUM] Fix 为与 portal.scss 同 PR 加入 JPG
- 涉及文件：src/views/home/publicPortal/portal.scss、public/assets/images/homeNew/portal_page_bg.jpg
- 所属项目：门户；来源会话：b65aa587-d24e-4841-9f24-0ea21ddc7bde；代码基线：2785dd9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_bg_pr",
  "source_extraction_id": "3f03ea727476499892bbe2ec8f798037",
  "version": 1,
  "memory_type": "entities"
}
-->