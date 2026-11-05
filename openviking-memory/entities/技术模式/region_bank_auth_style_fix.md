# 区域银行授权表格样式修复（苏住房G）
苏住房G 项目修复区域银行授权页表格样式错乱。

## 回退改动
- 移除表格 :key="tableViewKey" 避免强制重渲染导致列头与数据错位
- 移除 fill-height 避免数据少时表格撑出空白
- 合并 RegionTreeLayout 中重复的 .type-right-body 样式定义

## 保留改动
- :show-flat-switch="false" 仅隐藏平铺/树状切换按钮
- 左侧区域树结构完整保留
- 请求防竞态逻辑 listRequestId 保留
- 切换树节点后调用 doLayout() 修正列对齐

## 验证与归属
- 涉及文件：system/regionBankAuth/index.vue、property/complex/components/RegionTreeLayout.vue
- 所属项目：苏住房G；来源会话：3afefc54-4c44-41c7-a8c6-998c856214d4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_bank_auth_style_fix",
  "source_extraction_id": "fcdaef81ba1e46148b85f174762cf478",
  "version": 1,
  "memory_type": "entities"
}
-->