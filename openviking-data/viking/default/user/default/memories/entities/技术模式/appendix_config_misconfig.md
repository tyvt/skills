# 附件配置主数据错配导致提示与拦截不一致
开发企业注册上传附件时页面提示 5MB 但实际拦截 0.48MB，根因是附件配置表 FILE_MAX_SIZE 误配而非代码 bug。

## 背景与原因
- 页面顶部提示取所有要件 fileMaxSize 最大值（5MB），真正拦截用该要件自身值（504000 字节≈0.48MB），导致不一致。
- 「超过限制：0MB」是后端按字节换算整 MB（504000/1024/1024 取整=0）回显。
- 双重提示叠加：后端按 file_type 字典名称回显「仅支持：Word、img、pdf」。

## 解决方案
- 先定位真相源：附件上限配在 COMMON_FRAMEWORK.T_APPENDIX_CONFIG（busCode+APPENDIX_CONFIG_ID 定位），修配置即可，无需改代码。
- 回查同 busCode 下所有要件口径统一（本次 4 条要件统一为 5MB=5242880 字节）。
- 隐患：页面上传提示用「取最大值」生成全局提示是潜在雷，建议按要件展示或统一口径。
- 支持新格式顺序：先维护字典 img 的 remark，再放开前端白名单。
- 用文件真实大小反推上限（509288 字节↔0.48MB）是快速定位配置错配手段。

## 验证与归属
- 验证：会话 session-6e4a0982（基线 a86bf95）禅道 Bug 5945，结论为配置主数据配错非代码 bug。
- 配置对照：busCode=040100，授权委托书 5024000、受托人身份证件原件 504000 应改 5242880（APPENDIX_CONFIG_ID 2108475306731003905 / 2108475136693919746）。
- 涉及文件：institutionRegisterAppendix.js、CompanyRegisterSingleForm.vue、RegisterUploadItem.vue、e2e spec；来源会话：session-6e4a0982-6141-4510-8f0a-ef5f2b44900c。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_config_misconfig",
  "source_extraction_id": "fec19138b36e482986eec549c6e4ea48",
  "version": 1,
  "memory_type": "entities"
}
-->