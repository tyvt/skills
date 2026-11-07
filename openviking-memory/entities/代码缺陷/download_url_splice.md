# 资源下载路径拼接丢失部署前缀
在苏住房G项目(zhi2-web-admin)对账文件(pubRecBankFile)下载，重构后改用window.origin+filePath拼接，多级部署前缀丢失致404。
## 根因
- 8月17日重构(f5e7d0f54)将下载地址改为window.origin+filePath
- 应用部署在子路径(如/zhi2-test前还有部署前缀)时，window.origin仅到域名，拼出地址少部署前缀，请求打到根目录
- 图片资源正常因一直走统一解析函数resolveServerAssetUrl
## 解决方案
- 下载/预览复用resolveServerAssetUrl按当前部署目录还原相对地址
- 改用fetch(resolveServerAssetUrl(filePath))→blob→URL.createObjectURL生成<a download>，禁手拼window.origin
- 与已知1070「地址解析统一收口」互补，本条补下载链路消费方
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话684bd892，错误地址https://szf.szzfcjj.cn/zhi2-test/2026/...缺前缀；修复恢复fetch(resolveServerAssetUrl(filePath))
- 涉及文件：src/views/benefit/pubRecBankFile/index.vue、src/utils/resolveServerAssetUrl.js、src/utils/imgPrfix.js
- 所属项目：苏住房G；来源会话：684bd892-9f31-405c-be6b-c5c9fdc86eef；代码基线：864b409

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "download_url_splice",
  "source_extraction_id": "3c7e2243800241628db95ed98f7b1f96",
  "version": 1,
  "memory_type": "entities"
}
-->