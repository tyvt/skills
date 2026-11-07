# 移动端请求约定：then内不判code由拦截器统一toast
zhi2-mobile-shimin约定接口调用then里直接写成功逻辑，失败由httpInstance拦截器统一reject并toast，配套清理noReject。

## 背景与原因
- 拦截器已对code!=200主动reject并弹toast，then里再判等于错误处理两遍
- api层带noReject:true会让非成功响应当成功继续，then判断成唯一防线，导致失败进成功分支或错误弹两次

## 约定规则
- then内直接写成功逻辑，不判code
- 业务失败分支（如add.vue的501与失败页跳转）改写到catch里，不留在then的else
- api层去掉noReject:true让非成功响应正常reject
- 清理不再使用的showToast等import
- 新写接口调用默认不判code，自定义失败页跳转只能在catch补，不在then加回判断

## 验证与归属
- 来源会话732c8290（2026-07-15，基线77666f8）批量改10个Vue文件+2个API文件移除code==200判断
- 涉及文件：api/httpInstance.js、api/autonomy.js、api/property.js、pages_owner/house/owner/add.vue等
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "request_no_code_check",
  "source_extraction_id": "39b4e56e7fd44001bc1b6da652c64178",
  "version": 1,
  "memory_type": "entities"
}
-->