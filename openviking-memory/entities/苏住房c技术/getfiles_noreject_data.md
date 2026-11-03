# getFiles在noReject模式需读res.data.data取附件数组
苏住房C小程序附件列表整块空白，根因为getFiles在noReject模式下响应被包两层，附件数组实际位于res.data.data。

## 问题现象
- 物业合同扫描件等附件列表整块空白，接口已正常返回（appendixConfig + appendices 都在）
- noReject 模式将响应原样返回不抛错，属于静默失败，无任何报错提示

## 根因
- src/api/common.js 的 getFiles 在 noReject 模式响应被包两层，外层是通用壳，附件数组在 res.data.data
- 老代码按普通模式只取 res.data（即整个业务对象或壳），页面拿到非数组，附件区判定为空

## 解决方案
- 在 noReject 分支显式按 res.data.data 解析附件数组，不要和普通分支共用同一个取值路径
- 同步到子模块同源分支：main-v2.1 的 df64ea39 与 sfb 的 6dd541c3，改完切回 -mp 工作分支

## 验证与归属
- 验证：会话 0abe2b53 附件事例返回体含 appendixConfig 与 appendices 数组但页面不显示，定位为 getFiles 在 noReject 模式取 res.data.data
- 涉及文件：src/api/common.js、pages_owner/company/info/contracts.vue、pages_owner/components/FileList/FileList.vue
- 所属项目：苏住房C；来源会话ID：0abe2b53-4747-4832-ada4-d092ef565928；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "getfiles_noreject_data",
  "source_extraction_id": "fe7c48b530a64b4a9825c5f0ecbd6ae5",
  "version": 1,
  "memory_type": "entities"
}
-->