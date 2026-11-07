# 网关 zs-param 请求头中文变 ?? 统一改 base64 编码
苏住房C（zhi2-mobile-shimin）经 gateway.js 发请求时业务参数放自定义头 `zs-param`，带中文后端收到全变 `??`，需在 gateway.js 收口 base64 编码。

## 问题现象
- 经 src/api/gateway.js 发出的请求，业务参数放自定义请求头 zs-param；带中文时（如报修 contactName「朱楠」、eventDesc「测试上传」）后端收到中文全变 `??`
- 功能静默失败但不报错，难察觉

## 根因
- HTTP Header 只允许 ASCII（latin-1）字符集，未编码的中文 JSON/查询串在传输层被替换成 ?
- encodeURIComponent 只是把问题推后：值变长且不同网关/代理解 URL 编码行为不一致

## 解决方案
- 在 gateway.js 里收口一处，新增 encodeZsParam：空值直接返回；否则 `btoa(unescape(encodeURIComponent(value)))`（先转 UTF-8 字节再 base64，避免 btoa 对非 ASCII 抛 InvalidCharacterError）
- resolveZsParam 里 GET 走 serializeQueryParams(bizContent)、POST 走 JSON.stringify(bizContent)，统一过 encodeZsParam 再写 zs-param
- 这是前后端契约变更：后端必须先 base64 解码再解析 JSON/查询串，否则全量接口 400，联调须显式同步

## 验证与归属
- 会话 ebbcd94a：用户给出两种编码方案并指定 base64，最终在 gateway.js 新增 encodeZsParam + resolveZsParam，POST 先 JSON 序列化再 base64、GET 先序列化查询参数再 base64，并提示服务端需 base64 解码
- 涉及文件：src/api/gateway.js、src/pages_owner/repair/add.vue；所属项目：苏住房C；代码基线：e04432d

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "gateway_zsparam_base64",
  "source_extraction_id": "f9c3a7f4992547a18e59f7352998fcc3",
  "version": 1,
  "memory_type": "entities"
}
-->