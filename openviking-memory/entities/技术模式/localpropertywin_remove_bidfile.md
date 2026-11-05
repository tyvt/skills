# 中标结果备案删除投标文件字段
苏住房G 项目本地资产中标结果备案详情页（`localPropertyWin/detail.vue`）已删除「投标文件」字段。

## 改动内容
- 编辑表单移除「符合要求 / 不符合要求」单选框
- 校验规则移除「投标文件必须符合要求」的必填与自定义校验
- 查看模式移除详情展示中的「投标文件」项
- 数据定义移除 `acceptable` 字段及 `acceptableOptions` 选项配置

## 行为效果
- 保存时不再因该字段校验失败
- 刷新页面后生效

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/views/localPropertyWin/detail.vue`
- 所属项目：苏住房G；来源会话：e836adf2-52cc-4ed1-a761-dc05cfdad853；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "localpropertywin_remove_bidfile",
  "source_extraction_id": "0fa9adadc9e847248fa4eb9235709be9",
  "version": 1,
  "memory_type": "entities"
}
-->