# landPlotCode自动写入zs-remark请求头
园区公共收益同源 Web 后台(zhi2-web-admin)约定：请求体或参数带 landPlotCode 时，拦截层自动写入 zs-remark 请求头。

## 映射规则
- request.js 拦截层读取本次请求 params 或 body 中的 landPlotCode 字段，存在则写入请求头 zs-remark（值来源仍是 landPlotCode，头名不是 landPlotCode）
- 页面上下文类头统一加 zs- 前缀：data-id → zs-data-id，menu-name → zs-menu-name，menu-path → zs-menu-path

## 删除链路与编码
- 列表/详情删除走 listMixins 时若已向删除接口传 landPlotCode，无需改调用方，拦截器自动带 zs-remark
- 本条补「字段名→头名」映射与删除链路覆盖，非字符集问题
- 头值含中文等非 ASCII 时需经 pageRequestContext 的 toAsciiHeaderValue（与 zs-menu-name 同套），否则 setRequestHeader 在浏览器侧抛错

## 验证与归属
- 验证：会话 266e6df1 用户要求所有接口按参数 landPlotCode 加请求头，删除 mixin 同步；头名从 landPlotCode 改为 zs-remark，并给 data-id/menu-name/menu-path 加 zs- 前缀
- 涉及文件：src/utils/request.js、src/utils/pageRequestContext.js、src/mixins/listMixins.js、src/mixins/detailMixins.js
- 所属项目：园区公共收益；来源会话：266e6df1-f448-4947-a921-472f6e91ee3d；代码基线：635e747

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "landplotcode_zs_remark",
  "source_extraction_id": "29493589c3594a7899ab33fce14ca423",
  "version": 1,
  "memory_type": "entities"
}
-->