# 问卷模版详情页与新增题目弹窗修改
产品2.0 项目根据截图需求完成问卷模版详情页组件新建及新增题目弹窗样式统一。

## 修改与新建文件
- TopicInfoTable.vue：新建问卷题目信息表组件（detail.vue 原引用但文件缺失）
- TopicDialog.vue：新增题目弹窗基本信息框组件

## 主要改动
- 详情页无自定义分组时不显示「默认不分组」标题、题目单表平铺；有分组时（如 A 组、B 组）在表格上方显示分组名
- 容器使用 padding: 0 24px 24px 与 Headline 内边距一致，保留「新增题目」「批量删除」及行内「上移/下移」操作
- 新增题目弹窗将分组、标题、类型、必填、描述等字段包裹在「基本信息」Headline 区块，样式与「题目选项」区块一致（边框、标题栏、内边距 18px 24px）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：无分组不出现默认标题、创建分组显示分组名、弹窗两区块风格一致
- 所属项目：产品2.0；来源会话：946e7e74-221e-42c1-acb7-c1bf634305ac；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "questionnaire_detail_fix",
  "source_extraction_id": "4a4687e501644f5c9730ebec13b67ef5",
  "version": 1,
  "memory_type": "entities"
}
-->