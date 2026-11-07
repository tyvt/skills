# 隐藏切换按钮顺手改表格致树表错位
苏住房G的regionBankAuth列表页仅要求隐藏平铺/树状切换按钮，但改动引入:tableKey与fill-height导致列错位与空白。

## 问题根因
- 加:Key="tableViewKey"使切树节点整表重建，Element列宽缓存与表头/表体分离渲染不同步造成列错位
- 加fill-height使数据少时表格被拉伸到容器高度出现大片空白
- RegionTreeLayout里.type-right-body重复定义；已知清单未覆盖「用:Key强制重渲染修树表联动」反向坑

## 解决方案
- 回退：删掉:Key="tableViewKey"、删掉fill-height、合并重复.type-right-body
- 保留：:show-flat-switch="false"隐藏切换、左侧区域树完整保留、listRequestId防竞态
- 树表联动正确姿势：切树节点后调doLayout()修正列对齐，而非整表重建

## 协作教训与归属
- 用户说「只去掉X」须最小改动，不得顺手改布局；样式问题先diff上次提交确认改坏行再回退
- 涉及文件：system/regionBankAuth/index.vue、property/complex/components/RegionTreeLayout.vue
- 所属项目：苏住房G；来源会话：3afefc54-4c44-41c7-a8c6-998c856214d4；代码基线：864b409

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_layout_regression",
  "source_extraction_id": "6ae49cdcb1234cc49f4b259d6ba75b4b",
  "version": 1,
  "memory_type": "entities"
}
-->
