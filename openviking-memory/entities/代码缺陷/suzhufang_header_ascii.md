# 苏住房G请求头中文导致保存报错
在苏住房G项目(zhi2-web-admin)中，请求拦截器将含中文的landPlotCode写入zs-remark请求头，触发浏览器setRequestHeader非ISO-8859-1异常，仅保存链路报错。
## 根因
- request.js自动附加自定义头，pageRequestContext.js的getLandPlotCodeRequestHeaders把表单宗地号landPlotCode写入zs-remark
- HTTP头值仅允许ISO-8859-1，含中文等非ASCII字符时浏览器在setRequestHeader阶段抛错，请求未发出
- GET加载页不带landPlotCode，故仅新增/编辑保存触发，易误判为后端或数据问题
## 解决方案
- 业务字段透传自定义请求头处一律经toAsciiHeaderValue编码(内部encodeURIComponent)，与zs-menu-name同约定
- 修复位置：pageRequestContext.js:178-180对zs-remark使用toAsciiHeaderValue(landPlotCode)
- 排查仅POST报错无响应时，优先grep页面上下文请求头取值来源
## 验证与归属
- 验证：会话369f9db2基线d109b83，项目楼盘表保存异常，定位并修复
- 涉及文件：src/utils/pageRequestContext.js、src/utils/request.js、src/views/building/project/detail.vue
- 所属项目：苏住房G；来源会话：369f9db2-2fde-436c-9e46-1d22237a54a6；代码基线：d109b83

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "suzhufang_header_ascii",
  "source_extraction_id": "6826e403948f4fa8a548e51c974c8ca3",
  "version": 1,
  "memory_type": "entities"
}
-->