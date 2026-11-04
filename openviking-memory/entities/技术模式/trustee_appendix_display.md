# 授权委托书显示与过滤逻辑
苏州市房地产监测V3 中授权委托书（busCode: glygly）显示受管理员类型过滤影响；另有改动使其始终显示、不过滤，spec 中其他用例属既有基线失败。

## 过滤逻辑（根因）
- listAppendixPackage 返回要件仅一条：appendixConfigName "授权委托书"，busCode "glygly"，isRequired "1"，appendices null
- companyAdmin/detail.vue 给 AppendixPackageSection 传 :admin-type="normalizedAdminType"，法人 → adminType='0'
- AppendixPackageSection/index.vue 的 appendixHandleConfig：adminType≠'1'（非受托人）时用 isTrusteeOnlyAppendixConfig 过滤受托人专属要件
- src/utils/registerAppendixAdminType.js:16-19 名称匹配 授权委托书|授权书|受托人.*身份证 的均被过滤
- 该 busCode 仅配置授权委托书一条，过滤后 fileList 为空 → 不显示配置附件

## 既有失败用例
- spec 文件里另外 3 个用例（多图回显、要件删除、注册全流程）目前失败
- 用 git stash 在改动前代码上跑过同样全失败，属既有基线问题，非本次改动引起
- 失败原因：用例仍用 `institution-appendix-*` 测试 id 和 `.file-row`、`上传` 旧选择器，而单页表单实际渲染 `appendix-requirement-*` 和图片式上传占位
- 这几个需单独一轮修复，超出「授权委托书」范围，未改动

## 循环依赖说明
- eslint 对 `registerAppendixAdminType.js` 报 `import/no-cycle`（import `api/company/companyRegister.js`，后者 import `utils/appendix.js`，而 `appendix.js` import 回本文件）
- 该循环在改动前已存在，沿用同样 `normalizeAppendixConfig` 导入方式，未引入新循环

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3；extracted source=zcode project=苏州市房地产监测V3
- 涉及文件：companyAdmin/detail.vue、AppendixPackageSection/index.vue、src/utils/registerAppendixAdminType.js、api/company/companyRegister.js、utils/appendix.js、appendix.js
- 所属项目：苏州市房地产监测V3；来源会话：5be31fea-c6b7-4f9d-b928-c2eb49a504a0、session_de8fcbd46f273208201b79f1dca6500e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "trustee_appendix_display",
  "source_extraction_id": "420b7220f7dc4216a77d93e5c54337e6",
  "version": 2,
  "memory_type": "entities"
}
-->