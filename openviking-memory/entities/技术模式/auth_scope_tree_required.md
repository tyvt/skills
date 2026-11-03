# 用户详情授权范围树勾选必填校验
园区物管2.0 中 system/user/detail.vue 通过 beforeSaveHook 与 getForm 空树保护实现 el-tree 授权范围至少勾选一个节点。

## 问题背景
- 授权范围是 el-tree 勾选，不是带 prop 的 el-form-item，无法单靠 rules 表达「至少勾选一个节点」
- 普通文本/选择项必填仍优先 rules+prop；树/自定义控件无 prop 时用 beforeSaveHook 补校验（关联 #958）

## 解决方案
- 重写 beforeSaveHook：表单 rules 通过后、发保存请求前读取树勾选 keys，为空则 msgWarning「授权范围不能为空」并 return 阻止提交
- getForm() 取勾选值时对 tree ref 做存在性判断，避免树未渲染时 getCheckedKeys 空引用报错

## 验证与归属
- 验证：会话 b62c693b 保存时要求授权范围非空，实现 beforeSaveHook 拦截未勾选并加固 getForm
- 涉及文件：zhi2-web-admin/src/views/system/user/detail.vue、zhi2-web-admin/src/mixins/detailMixins.js、zhi2-web-admin/src/mixins/form.js
- 所属项目：园区物管2.0；代码基线：7814a0c2a；来源会话：b62c693b-964b-4ea2-85e8-10ced80ddbfd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "auth_scope_tree_required",
  "source_extraction_id": "1a80be442ad2431a98fa878c7d3779f0",
  "version": 1,
  "memory_type": "entities"
}
-->