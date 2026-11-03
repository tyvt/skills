# 注册页管理员身份联动联系电话
开发企业/机构注册页管理员选法人则联系电话只读取法人电话，选受托人则可改且切换时清空。

## 背景与原因
- 管理员=法人时联系电话是被引用值，改了会与法人信息不一致，故只读。
- 管理员=受托人时独立主体可自填；切换身份若只改可编辑性不清空，会残留旧值。

## 解决方案
- 身份切换同时更新字段 disabled/readonly 状态，切受托人时清空原值（绑定值与显示 label 都清）。
- 选法人时联系电话自动取法定代表人电话，字段只读。
- 两注册页一致实现：CompanyRegisterSingleForm.vue 与 InstitutionRegisterSingleForm.vue。
- 联动规则有 e2e 覆盖：company-register-branch.spec.js 与 institution-register-flow.spec.js。

## 验证与归属
- 验证：会话 session-472ff013（基线 a86bf95）用户诉求管理员身份联动电话清空。
- 子模块提交 d27e1b95d fix(register): 法定代表人口径管理员联系电话跟随法人且不可修改。
- 涉及文件：两个 SingleForm.vue、两个 e2e spec；来源会话：session-472ff013-180f-4f26-9208-d9b4e94c8c55。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_phone_linkage",
  "source_extraction_id": "fec19138b36e482986eec549c6e4ea48",
  "version": 1,
  "memory_type": "entities"
}
-->