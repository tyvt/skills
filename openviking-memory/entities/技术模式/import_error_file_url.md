# 导入校验失败拿 data 错误文件地址（noReject 双分支 + /zhi2/ 路径拼法）
苏住房G 后台物业费申报 excelImport 校验失败时，request.js 需在两分支支持 noReject 回传 res.data，且 /zhi2/ 直挂路径不能用 resolveServerAssetUrl 拼。

## 问题根因
- 物业费申报 excelImport（/v2.0/property/feeDeclare2/excelImport）校验不通过返回 code:500 + msg + data（错误 Excel 相对路径 /zhi2/2026/...xlsx），页面须提示 msg 并自动下载。
- 实测只弹 msg、没下载，根因三条。

## 解决方案
- 请求拦截器在 code !== 200 时直接 reject，配置了 noReject 的调用方在 .then 拿不到完整响应；必须在「成功响应的非 200 分支」和「HTTP 错误响应分支」两处都支持 noReject 并回传 res.data。
- 后端文件路径不能用统一的 resolveServerAssetUrl 解析（会拼成 /sz/property/zhi2/... 错误地址），这类 /zhi2/ 直挂路径改用 window.location.origin + filePath 拼绝对地址。
- 导入请求同时加 noMessage:true，否则全局弹窗和页面内 msgError 重复提示两次；调用侧先判 data 是否有值，为空就只提示 msg、跳过自动下载。

## 差异与验证
- 差异点：已知条 1070/289 只说地址收口到 resolveServerAssetUrl 与 noMessage 用法，本条给出「该函数对后端直挂路径是错的」及其替代拼法。
- 验证证据：会话 1f367792 最终结论确认上述三处修改。
- 涉及文件：zhi2-web-admin/src/utils/request.js、zhi2-web-admin/src/views/property/feeDeclare2/components/bulkImportDialog.vue、zhi2-web-admin/src/views/property/feeDeclare2/index.vue。
- 所属项目：苏住房G；来源会话ID：1f367792-daf1-4b22-a41a-28848b798cc5；代码基线：ac184e6。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "import_error_file_url",
  "source_extraction_id": "5e850285f3a947fcac14fa6386b643ab",
  "version": 1,
  "memory_type": "entities"
}
-->
