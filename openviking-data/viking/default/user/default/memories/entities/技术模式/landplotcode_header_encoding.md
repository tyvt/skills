# 宗地号含中文致保存报服务器异常
园区公共收益物业管理区域新增保存报「服务器异常」，根因是请求头写入了中文。

## 问题根因
- 报错 `Failed to execute 'setRequestHeader' on 'XMLHttpRequest': String contains non ISO-8859-1 code point.` 是浏览器对请求头的硬限制：请求头值只能是 ISO-8859-1，含中文即抛异常。
- 异常抛在 axios 的 xhr adapter，被 `request.js` 响应错误拦截器用 `showErrorDialog()` 弹成「异常提示」，看着像服务器异常。
- `property/complex/detail.vue` 的宗地号 `landPlotCode` 为必填手输文本框；`getForm()` 把整个 form 作为 POST body；全局拦截器 `request.js` 调 `getLandPlotCodeRequestHeaders()`；`pageRequestContext.js` 把 `landPlotCode` 原样写进 `zs-remark` 请求头（未编码）。宗地号含中文（如 `苏地2019-WG-1号`）即触发。

## 解决方案
- 对写入请求头的 `landPlotCode` 做编码处理（同类逻辑早已有编码处理可复用）。
- 相关页面：property/complex/detail.vue、building/project/detail.vue、building/projectChange/detail.vue。

## 验证与归属
- 涉及文件：request.js、property/complex/detail.vue、pageRequestContext.js、building/project/detail.vue、building/projectChange/detail.vue。
- 所属项目：园区公共收益；来源会话：ceb36a3f-e16b-42a0-aa46-df6b3904665d；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "landplotcode_header_encoding",
  "source_extraction_id": "03289f07c5334576ab4bc228a9de1fd1",
  "version": 1,
  "memory_type": "entities"
}
-->