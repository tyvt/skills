# 按管理员类型过滤受托人附件隐藏了区域
在苏州市房地产监测V3中，`companyAdmin/detail.vue` 将 `admin-type` 传递给 `AppendixPackageSection`；当 `adminType !== '1'` 时，`appendixHandleConfig` 过滤附件项并可能清空 `fileList`。

## 问题根因
- `companyAdmin/detail.vue` 将 `admin-type` 传递给 `AppendixPackageSection`
- 当 `adminType !== '1'` 时，`appendixHandleConfig` 调用来自 `src/utils/registerAppendixAdminType.js` 的 `isTrusteeOnlyAppendixConfig`
- 过滤器将名称与 `授权委托书|授权书|受托人*身份证` 进行匹配
- 如果 API 仅返回“授权委托书”，过滤后 `fileList` 变为空：此为过滤逻辑（位于 `registerAppendixAdminType.js:16-19`），并非渲染异常；附件区域不显示

## 解决方案
- 确保即使过滤器将附件缩减为仅受托人项，附件区域也予以显示

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/252.md
- 涉及文件: companyAdmin/detail.vue, AppendixPackageSection/index.vue, AnnexUpload/index.vue, DeveloperEntryNetworkAdminDetail.vue, src/utils/appendix.js, src/utils/registerAppendixAdminType.js, src/api/company/companyRegister.js
- 所属项目: 苏州市房地产监测V3; 会话: 5be31fea-c6b7-4f9d-b928-c2eb49a504a0; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "trustee_appendix_hide",
  "source_extraction_id": "bc24b503fbae49f6a34aceca79c91074",
  "version": 2,
  "memory_type": "entities"
}
-->