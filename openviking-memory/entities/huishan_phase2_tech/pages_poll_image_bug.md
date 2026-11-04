# 惠山poll页背景图路径错误缺陷
惠山二期H5 的 pages_poll 页面因背景图相对路径多写一层，导致图片加载警告，已改为别名路径修复。

## 原因
- pages_poll 目录在 src 下一层：src/pages_poll/result.vue、src/pages_poll/form.vue
- 错误路径：../../static/images/bg_szf.png 解析到项目根目录 static/images/（不存在）
- 实际位置：src/static/images/bg_szf.png；pages_poll 只需 ../ 而非 ../../（pages_owner/maintain/ 多一层才用 ../../）

## 修复
- 将 H5 背景图路径改为统一别名写法：background-image: url("@/static/images/bg_szf.png");
- 已修改 result.vue 和 form.vue，重新构建后警告消失

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 涉及文件：src/pages_poll/result.vue、src/pages_poll/form.vue、src/utils/index.js
- 来源会话ID：1b86fe06-0678-4ce4-b9df-fbd51273d5c6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "pages_poll_image_bug",
  "source_extraction_id": "7045f4d455184c36854e68c49be63b56",
  "version": 1,
  "memory_type": "entities"
}
-->