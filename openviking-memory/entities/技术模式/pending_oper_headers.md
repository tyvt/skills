# 审计头仅挂编辑保存与列表删除
园区 zhi2-web-admin 用 pendingOperHeaders 标记下一次请求类型，仅编辑保存与列表删除的 PUT/DELETE 附加 menu-name、menu-path、data-id 审计头。

## 问题背景
- 全量请求拦截器统一加审计头易误伤查询/新增，且中文 meta.title 会触发 XHR setRequestHeader 非 ISO-8859-1 异常（编码侧须走 toAsciiHeaderValue）
- 移除对 form 的全局 watch 与 zipdownload 上的菜单头

## 实施方案
- pageRequestContext.js 用 pendingOperHeaders 标记 edit/delete，仅在匹配 PUT/DELETE 消费并附加头
- 编辑：仅 OperationBtnGroup 在 formMode=edit 点保存调用 enableDetailSaveHeaders(primaryKey, form)，带 menu-name(meta.title)、menu-path(meta.filePath)、data-id(form[primaryKey])；editRequest 提交前刷新主键，validate 失败须 clearPendingOperHeaders() 防残留
- 删除：仅 mixins/table.js 的 deleteRequest 前 enableListDeleteHeaders()，带菜单头、不带 data-id；自定义删除需自行 enableListDeleteHeaders()

## 验证与归属
- 验证证据：用户要求仅 OperationBtnGroup 编辑保存与列表删除带请求头；实现 pendingOperHeaders + 拦截器 getOperRequestHeaders
- 涉及文件：zhi2-web-admin/src/utils/request.js、pageRequestContext.js、components/OperationBtnGroup/index.vue、mixins/table.js、mixins/form.js、src/router/index.js、src/utils/zipdownload.js、src/store/modules/permission.js、src/utils/index.js、public/assets/js/sign.js、src/api/index.js、src/views/benefit/components/ApprovalProcessDialog.vue
- 所属项目：园区公共收益；验证证据：src=园区公共收益/005.md；来源会话：9bcf52dd-9166-4405-b7fd-19333080453d；代码基线：f783ca2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pending_oper_headers",
  "source_extraction_id": "df43600672024dfcbf50d56bd62e4d71",
  "version": 2,
  "memory_type": "entities"
}
-->