# 资产点位选择资产弹窗街道社区名称显示修复（苏住房G）
苏住房G 项目修复资产点位页面「选择资产」弹窗街道、社区列直接显示编码而非名称的问题。

## 问题原因
- housePart/index.vue 的「选择资产」弹窗街道、社区列直接绑 `subdistrict`、`community` 编码字段，未转成名称

## 修复内容
- 引入 `area` mixin，加载街道、社区字典数据
- 为两列增加 `:formatter="subdistrictFormatter"` 和 `:formatter="communityFormatter"`，将编码转为名称显示
- 处理方式与项目中其他页面（预警信息、广告位等）一致

## 涉及文件
- zhi2-web-admin/src/views/benefit/housePart/index.vue
- zhi2-web-admin/src/views/operationGuide/commission/index.vue
- zhi2-web-admin/src/formatters/index.js

## 验证与归属
- 所属项目：苏住房G；来源会话：8d2b731a-da19-4271-ac5f-6484cf14542c；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "housepart_name_fix",
  "source_extraction_id": "abdb91ea921d455b818bda502a994c7b",
  "version": 1,
  "memory_type": "entities"
}
-->