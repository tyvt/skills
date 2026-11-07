# 对外门户公示公告斑马纹
对外门户 UnifiedLogin.vue 的公示公告区新增斑马纹与整行底色，原错误改动已从 HomeNoticeList.vue 回退。

## 改动内容
- 回退：`HomeNoticeList.vue` 已 `git checkout` 还原，无残留
- `src/views/home/UnifiedLogin.vue` 行间距改为行内 `padding: 15px 33px`（文字行距仍 30px，底色铺满整行）
- 新增 `.notice-row:nth-child(even) { background: #f5f7fa }` 斑马纹
- 新增 hover `rgba(63,102,156,.06)` 淡品牌蓝底，标题变蓝保留

## 验证
- 1440×1200 实测：5 条公告第 2、4 行浅底条纹正常，条纹满宽无留白
- `unified-login-visual.spec.ts` 4/4 通过（服务卡片区相似度 81.76% ≥ 80），公示公告区 y≈1312 不在视觉比对区间故无回归影响
- ESLint `UnifiedLogin.vue` 通过

## 涉及文件与归属
- 涉及文件：HomeNoticeList.vue（回退）、UnifiedLogin.vue、unified-login-visual.spec.ts
- 所属项目：门户；来源会话ID：0a706ac1-f737-42b7-850d-981236e58eff；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_login_zebra_stripe",
  "source_extraction_id": "e094ff0ee23d42e5bdcbc819349ae6e5",
  "version": 1,
  "memory_type": "entities"
}
-->