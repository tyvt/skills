# Element 懒加载树表删深层节点重挂载
lazy+load 树表删三级子节点后仅调 getList() 不清 lazyTreeNodeMap 缓存，界面仍显示已删行，须 tableRenderKey++ 强制重挂载。

## 问题根因
- standardItemType 等 lazy+load 树表：getList() 只刷新根级 tableData，删三级（缓存在 el-table 内部 lazyTreeNodeMap）只调 getList() 不会清缓存，界面仍显示已删行，重进页面才对。

## 解决方案
- 给 zs-table 绑 :key="tableRenderKey"；删除成功与弹窗 refresh() 保存后均 tableRenderKey += 1 再 getList()，强制表格重挂载。
- 同类思路见 system/dept 清空 lazyTreeNodeMap，key 更简单。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 183f0f0d 用户反馈删三级刷新异常；结论说明 lazyTreeNodeMap 缓存与 tableRenderKey 重挂载方案。
- 涉及文件：zhi2-web-admin/src/views/maintenance/standardItemType/index.vue、zhi2-web-admin/src/views/system/dept/index.vue
- 所属项目：2-0；来源会话ID：183f0f0d-e87d-4696-8caa-bb0bbdf0d30f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lazy_tree_delete_refresh",
  "source_extraction_id": "f8f198cd162642018005f9ca8c1daff5",
  "version": 1,
  "memory_type": "entities"
}
-->