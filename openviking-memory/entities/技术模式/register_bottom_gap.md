# 租赁机构注册底部空白过大修复
苏州市房地产监测V3 租赁机构注册页因全局 padding 与协议 margin 叠加导致底部空白过大的 bug 与修复。

## 根因
- 全局样式给 .institution-register-form 加 padding-bottom:48px（为无协议勾选机构注册避让固定底栏）
- 租赁机构有协议勾选且 .agreement-wrap 自带 margin-bottom:88px，两者叠加导致约136px空白

## 解决方案
- 修改 InstitutionRegisterSingleForm.vue
- 根节点动态加 has-agreement 类（isLeaseOrgan 时）
- 租赁机构（有协议）时 padding-bottom:0，仅保留协议自带88px下边距避让固定按钮栏
- 经纪机构（无协议）保持原48px不变

## 验证与归属
- 涉及文件：InstitutionRegisterSingleForm.vue 等
- 所属项目：苏州市房地产监测V3；来源会话ID：08c8c33f-395a-42c3-ab4b-468a9d18c04b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_bottom_gap",
  "source_extraction_id": "6b04a545eba749769f2ebbcc33cd448f",
  "version": 1,
  "memory_type": "entities"
}
-->