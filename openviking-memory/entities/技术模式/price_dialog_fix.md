# 价格备案开发项目弹窗修复
产品2.0 项目修复价格备案「开发项目」选择弹窗问题，改动在 components/ProjectDialog.vue。

## 接口更新
- 默认接口从 /building/projectinfo/page 改为 /building/project/page
- bizState 改为数字 2，与 SelectDialog 保持一致

## 表格 UI 修复
- el-table-column 改为 zs-table-column，修复列宽塌陷、表头竖排
- row-key 从 projectCode 改为 projectId
- 项目名称列使用 type="link"，单选时可点击选中
- 数据加载后调用 doLayout() 重新计算列宽
- 表单/按钮/分页统一为 zs-* 组件

## 涉及文件与来源
- 文件：components/ProjectDialog.vue（detail.vue、changeDetail.vue 引用）、api/pricemng/recordPriceMng.js
- 所属项目：产品2.0；来源会话：2968a509-de10-4547-8a3b-9515e436aa52

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_dialog_fix",
  "source_extraction_id": "ffd3dd5456804c4ea536ebe90a7ba6e5",
  "version": 1,
  "memory_type": "entities"
}
-->