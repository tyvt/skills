
# 操作人员详情页授权按钮新增
园区公共收益项目在操作人员详情页操作栏增加「授权」功能。

## Description
- 在操作栏查看/编辑/删除间增「授权」按钮，权限 company:operatorAuth:edit
- 点击弹物业区域选择框（标题、关键字搜索、多选），数据来源 /company/operatorAuthRange/bindSource/page
- 确认调 POST /company/operatorAuth/authorize 提交 operatorId、companyRecordId、operatorAuthRangeList，同步至用户授权列表

## 修改文件
- operatorTable.vue、operator/detail.vue、operatorAuth/detail.vue

## Relations
- 来源会话：8fad698f-5f49-4e9c-a532-d96b53a28885（extracted source=cursor）
- 所属项目：园区公共收益；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operator_auth_button",
  "source_extraction_id": "d4a2273348f648869d27d1c30c8e9cb9",
  "version": 1,
  "memory_type": "entities"
}
-->