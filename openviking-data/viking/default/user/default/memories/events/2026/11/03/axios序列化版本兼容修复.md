# Summary
在苏住房G项目 zhi2-web-admin 前端中，列表页 created 阶段调用 getList 时直接抛出 AxiosError: options must be an object，列表空白。根因为项目实际使用 axios 0.28，而请求封装里传了老版本的函数签名 paramsSerializer，新版把 serializer 当对象处理从而报错。修复方式为移除 request.js 中的自定义 paramsSerializer，改为在 getQueryParams 里手工将数组参数 join 成逗号串（如 propertyTypes=low,multi、complexIds=1,2,3），不再出现 xxx[] 键。来源会话 466205e5，代码基线 4fad664。
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】axios 0.28 下自定义 paramsSerializer 与数组参数会抛 AxiosError: options must be an object（页面 created 直接炸）
【内容】现象：页面加载即报 `[Vue warn]: Error in created hook: "AxiosError: options must be an object"`，堆栈落在列表页 index.vue 的 created，且整条 getList 未发出、列表空白。根因：为让后端收到 `propertyTypes[]=a&propertyTypes[]=b` 形式，在请求封装里传了自定义 `paramsSerializer`（老版本 axios 的函数签名），而项目实际是 axios 0.28——新版把 serializer 当对象处理，传函数或在其中读错参数位置就抛 options must be an object。这与「后端契约错误」「代理 404」都无关，是纯粹的库版本兼容问题。做法：不要为单个页面的数组参数去动 request.js 的 paramsSerializer；把多选数组在 getQueryParams 里手工 join 成逗号串（`propertyTypes=low,multi`），导出的 ID 集合同理（`complexIds=1,2,3`），从此不再出现 `xxx[]` 键。差异点：已知 #338 只界定「改 utils 请求体形态、不动路径」，#740 只讲逗号串回显；本条补的是「数组参数序列化的版本兼容根因」——先确认 axios 版本再用自定义 serializer，否则整个页面的生命周期钩子一起挂掉。
【验证证据】会话 466205e5（基线 4fad664）：用户报 `[Vue warn]: Error in created hook: "AxiosError: options must be an object"`，指向 publicQuery/complex/index.vue；结论「根因是 axios 0.28 与自定义 paramsSerializer 不兼容，页面 created 阶段调用 getList 时触发」，修复为移除 paramsSerializer、在 getQueryParams 里把 propertyTypes / complexIds 转逗号串。
【涉及文件】zhi2-web-admin/src/views/publicQuery/complex/index.vue
【所属项目】苏住房G
【来源会话ID】466205e5-ee7c-4c88-9a01-a864233745f0
【代码基线】4fad664

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "event_name": "axios序列化版本兼容修复",
  "goal": "axios兼容修复",
  "summary": "在苏住房G项目 zhi2-web-admin 前端中，列表页 created 阶段调用 getList 时直接抛出 AxiosError: options must be an object，列表空白。根因为项目实际使用 axios 0.28，而请求封装里传了老版本的函数签名 paramsSerializer，新版把 serializer 当对象处理从而报错。修复方式为移除 request.js 中的自定义 paramsSerializer，改为在 getQueryParams 里手工将数组参数 join 成逗号串（如 propertyTypes=low,multi、complexIds=1,2,3），不再出现 xxx[] 键。来源会话 466205e5，代码基线 4fad664。",
  "ranges": "0-7",
  "source_extraction_id": "306ba4a7365b4d7aac64e8634a2722fa",
  "version": 1,
  "memory_type": "events"
}
-->
