# 租赁评价移动端样式与空数据态未适配
原页面未适配移动端样式且空数据无展示，已修复移动端样式与空数据态。

## 修复做法
- 调整 Tab 激活色 #326ff9、卡片圆角 16rpx。
- 为空字段配置 common.noData 与 rent.noEvaluationContent。
- wd-rate 增 inactive-color="#e5e5e5"。

## 涉及文件
- @src/pages-rent/myEvaluate.vue
- 来源会话：164f359f-6344-486a-83d4-2b56361e0db4；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_eval_bug",
  "source_extraction_id": "db1981a4ff084175a289148b91ebb620",
  "version": 1,
  "memory_type": "entities"
}
-->