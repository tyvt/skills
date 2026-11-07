# ZsPrint 用 window.origin 拼模板地址，子路径部署必丢前缀
开户申请详情点「打印」后生成的 Word 模板打开错误地址，因 ZsPrint/index.vue 用 window.open(`${window.origin}${res.data}`) 拼绝对地址，子路径部署（如 /test/）会丢部署前缀。

## 现象与根因
- 开户申请详情点「打印」后 Word 模板打开错误地址；用户原话「打印的打开路径要改为相对的」
- 全局打印组件 ZsPrint/index.vue 用 window.open(`${window.origin}${res.data}`) 直接拼绝对地址
- window.origin 只含协议+域名+端口，不含部署目录，子路径部署（如 https://szf.szzfcjj.cn/test/zhi2-test/...）被削成 https://szf.szzfcjj.cn/zhi2-test/... 丢 /test/ 段，必 404 或落错误站点；开发环境常部署根路径故本地复现不出

## 解法与影响
- 两处改走 resolveServerAssetUrl(res.data)：printWay == 2 的 Word 模板分支，及 HTTP 模板地址分支（解析完再拼 token 等参数）
- 与回单凭证、对账文件等资源下载走同一套相对路径解析，按当前部署目录自动补全前缀
- 本条补充已知 1070「资源地址解析统一收口在 resolveServerAssetUrl」：新增此前漏收口消费点，明确「打印模板地址属静态资源，禁止用 window.origin/location.origin 手拼」
- ZsPrint 是全局组件，改它同时影响所有多模板打印页（开户通知书、各类申请表），改完需回归非子路径环境打印

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 a423ec75「打印的打开路径要改为相对的」→ window.open(`${window.origin}${res.data}`) 在 /test/ 部署下丢前缀，改为 resolveServerAssetUrl(...)，printWay==2 与 HTTP 模板地址两处同改
- 涉及文件：d:\repository\苏住房G\zhi2-web-admin\src\components\ZsPrint\index.vue；benefit\pubRegulatoryAccount\detail.vue；components\OperationBtnGroup\index.vue
- 所属项目：苏住房G；来源会话ID：a423ec75-91b1-4249-9830-1fd5d9f6e665；代码基线：864b409


<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "zsprint_relative_url",
  "source_extraction_id": "397984d9306b4d00ab495e7e01753845",
  "version": 1,
  "memory_type": "entities"
}
-->