# iHome补贴页参照rent版接入底部mock表单
iHome 补贴页在 pages-iHome/subsidy.vue 参照 pages-rent/subsidy.vue 实现底部 wd-popup mock 表单。

## 实现要点
- 在 pages-iHome/subsidy.vue 参照 pages-rent/subsidy.vue 实现底部 wd-popup mock 表单
- 预填三项必填字段，trim 校验与 rent 版一致
- 提交后本地提示成功，不跳外链

## 验证与归属
- 验证：src=0/001.md
- 涉及文件：pages-iHome/subsidy.vue、pages-rent/subsidy.vue
- 来源会话：45e7b0ce-15f9-4788-ba08-ff2c893c36ee；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ihome_subsidy_mock_form",
  "source_extraction_id": "2361c55339f146289f8d8bbd184ff68b",
  "version": 1,
  "memory_type": "entities"
}
-->