# BuildingsTable.vue
价格备案申请详情页「楼幢」子表组件。

## Description
- 路径：zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/BuildingsTable.vue
- 曾自行实现 zs-dialog + el-upload 导入弹窗

## Role
- 历史使用原生 this.$alert(response.msg, '导入结果', {dangerouslyUseHTMLString:true}) 弹窗
- bug 6049 修复后改用全局 zs-import 组件
- bug 6074 修复：给 zs-import 传 :tmpl="false" 隐藏「下载模板」链接，移除 @download 绑定与 importTemplate 方法（后端无下载模板接口）

## Relations
- 属于 zhi2-web-admin 子模块
- 参考实现为 houseinfo/index.vue

<!-- MEMORY_FIELDS
{
  "category": "源代码文件",
  "name": "BuildingsTable.vue",
  "source_extraction_id": "d7cdcc76a2cc40dc8317a1270c45bc32",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->