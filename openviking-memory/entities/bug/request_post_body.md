# 区域接口 POST 缺少请求体修复
产品2.0 加密改造后非白名单接口统一改为 POST，无参 GET 请求（如 region/listTree）因缺少 body 报 Required request body is missing，已修复。

## 问题原因
- 加密改造后非白名单接口统一 POST，但 request('/system/region/listTree') 等原本无参 GET 未携带 body。
- 后端 @RequestBody 要求必须有请求体，导致 Spring 报错。

## 修复方式
- 在 request.js 拦截器中，POST 请求若 data 为空则默认补 {}。
- 覆盖 store/modules/common.js 的 saveAreaInfo、getRegions 及各处 $get('/xxx/listTree') 无参场景。

## 验证与归属
- 涉及文件：src/utils/request.js、src/store/modules/common.js 等（路径前缀 d:/repository/产品2.0/zhi2-web-admin）。
- 所属项目：产品2.0；来源会话：fcb686e6-73e3-4f1f-8aff-ccc07305e948；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "request_post_body",
  "source_extraction_id": "ca8df38d951f447aa2e165a2d2c0fccf",
  "version": 1,
  "memory_type": "entities"
}
-->