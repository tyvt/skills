# 物业管理区域备案 isDisabled 增加 bizState 判断（苏住房G）
苏住房G 项目物业管理区域备案详情页 isDisabled 计算属性在角色判断前增加 bizState 判断，统一物业与企业账号编辑权限。

## 改动内容
- 文件：zhi2-web-admin/src/views/property/complex/detail.vue 的 isDisabled 计算属性
- 新增模式（formMode === 'add'）返回 false，允许编辑全部字段
- 待提交状态（form.bizState == 0 或不存在）返回 false，物业与企业管理账号编辑权限一致
- G 端及 B 端企业管理员可编辑；B 端从业人员在已绑定物业管理区域时锁定关键字段

## 涉及文件与归属
- 涉及：property/complex/detail.vue、bTerminalProjectMixin.js
- 所属项目：苏住房G；来源会话：da02d97a-5848-4c08-a5e7-a196df36c574
- 验证证据：extracted source=cursor project=苏住房G；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "complex_isdisabled_bizstate",
  "source_extraction_id": "844da6df7be1401ea9be629d26f82d85",
  "version": 1,
  "memory_type": "entities"
}
-->