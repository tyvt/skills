# 机构注册相关用例在 HEAD 上既有失败
苏州市房地产监测V3 中 institution-register 系列测试在 HEAD 版本即存在失败，非本次改动引入，属既有问题。

## 既有失败用例
- institution-register-flow.spec.js 有 3 个用例失败
- lease-institution-register-organ-type.spec.js 有 1 个用例失败
- institution-register.spec.js 的「单页联调」也失败

## 根因
- 测试仍使用旧的 institution-appendix-* testid 和旧的验证码占位符
- 用 git stash 在 HEAD 版本复跑同样用例，失败结果完全一致

## 其他 HEAD 既有问题
- InstitutionRegisterSingleForm.vue 有两处 vue/html-closing-bracket-newline 的 lint error
- registerAppendixAdminType.js 的 import/no-cycle 循环依赖警告，同样在 HEAD 存在

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 涉及文件：institution-register-flow.spec.js、lease-institution-register-organ-type.spec.js、institution-register.spec.js、InstitutionRegisterSingleForm.vue、registerAppendixAdminType.js
- 所属项目：苏州市房地产监测V3；来源会话：session_5e2a842e410a02e90117baf814451f81；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "institution_test_fail",
  "source_extraction_id": "b18177727e884bf08b33fa82839cc86b",
  "version": 1,
  "memory_type": "entities"
}
-->