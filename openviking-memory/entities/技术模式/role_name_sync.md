# 组织工作人员角色保存后显示错误修复
园区公共收益项目中，修改角色为物管会保存后显示角色为社区，因 roleName 未同步更新。

## 问题根因
- 修改角色时只更新了 roleIds，roleName 仍保留详情接口返回的旧值
- 保存时后端收到的角色名称不正确

## 修复方案
- 角色下拉框增加 :label.sync="form.roleName" 选择时同步更新
- getForm() 显式上传 roleName，优先 form.roleName，否则按 roleIds 匹配兜底
- 切换组织类型时清空 roleName 与 roleIds 一并重置

## 涉及文件与归属
- 涉及文件：src/views/autonomy/ownerCommitteeWorker/detail.vue、src/mixins/detailMixins.js、src/views/autonomy/record/components/enums.js
- 所属项目：园区公共收益
- 来源会话：64889348-1c95-4eb4-8199-6ee031bb7e1e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "role_name_sync",
  "source_extraction_id": "79cc694f12bc4bf391a9c1460e65a168",
  "version": 1,
  "memory_type": "entities"
}
-->