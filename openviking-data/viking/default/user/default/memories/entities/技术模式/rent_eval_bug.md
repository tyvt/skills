
# 租赁评价移动端样式与空数据态未适配
原页面未适配移动端样式且空数据无展示，已修复移动端样式与空数据态。

## 修复做法
- Tab 激活蓝字 #326ff9 加粗+底部蓝条，未激活灰字 #666，整栏白底分割线。
- 列表卡片白底圆角16rpx、轻阴影、内边距32rpx、间距24rpx；合同编号与状态同行。
- 为空字段：合同编号/小区名称空显示「暂无」common.noData，评价内容空显示「暂无评价」rent.noEvaluationContent，整页无数据显示「暂无评价记录」rent.noEvaluateList。
- wd-rate 增 inactive-color="#e5e5e5"，无分数显示0星灰。

## 涉及文件
- @src/pages-rent/myEvaluate.vue
- 来源会话：164f359f-6344-486a-83d4-2b56361e0db4；代码基线：none。

## 验证与归属
- 所属项目：0
- 验证证据：extracted source=cursor project=0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_eval_bug",
  "source_extraction_id": "a63c2904b3f14fdcbf3d1e495bd2c340",
  "version": 2,
  "memory_type": "entities"
}
-->
