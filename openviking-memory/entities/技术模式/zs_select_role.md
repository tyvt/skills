# 改角色只传roleIds保存后名称错乱修复（zs-select须label.sync）
组织工作人员等详情改角色只更新roleIds，roleName保留旧值，保存提交错误角色名。

## 问题根因
- 改角色时只更新roleIds，roleName仍保留详情接口旧值
- 保存请求体把错误角色名（如仍显示「社区」）提交后端，界面与物管会等选项不一致

## 解决方案
- 角色下拉使用zs-select的:label.sync="form.roleName"与id同步
- getForm()显式提交roleName，缺省时从roleOptions按roleIds兜底
- 切换组织类型时与roleIds一并清空roleName

## 验证与归属
- 验证：修改角色为物管会保存后仍显示社区；根因只传roleIds、roleName未随选择更新
- 涉及文件：zhi2-web-admin/src/views/autonomy/ownerCommitteeWorker/detail.vue
- 所属项目：园区公共收益；来源会话：64889348-1c95-4eb4-8199-6ee031bb7e1e；代码基线：b6bf87d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_select_role",
  "source_extraction_id": "14ba31c6dc8f4d5282d0b9f4f6413e26",
  "version": 1,
  "memory_type": "entities"
}
-->