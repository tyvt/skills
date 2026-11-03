# GET下载接口须用downloadGet
产品2.0 物业费账单「下载错误报告」接口是 GET，但页面用固定走 POST 的 this.download() 导致下载失败。

## 问题现象
- 接口 property/spFeeBill/import/errorReport/{id} 是 GET，页面用 this.download() 调用后下载必然失败
- 前端表现为下载无反应/报错，易被误判为权限或网关问题

## 根因分析
- 挂到 Vue.prototype 的 this.download 内部固定用 POST 发请求拿 blob，接口方法不对时后端不返回文件流

## 解决方案
- 在 src/api/index.js 新增 downloadGet 方法（GET 请求 + blob 响应），main.js 挂载 Vue.prototype.downloadGet
- 页面里 GET 下载一律改用 this.downloadGet；接入下载类接口先确认 HTTP 方法，POST 用 download、GET 用 downloadGet

## 验证与归属
- 会话 e7bc06b9 结论：错误报告接口 GET 但 this.download() 走 POST 致失败；新增 api/index.js downloadGet + main.js 挂载，import.vue/importUploadDialog.vue 改用 downloadGet
- 涉及文件：src/api/index.js、src/views/property/spFeeBill/components/import.vue、importUploadDialog.vue；所属项目：产品2.0；来源会话：e7bc06b9-bcea-4473-b16e-d02f4f8e8045；代码基线：018ae18

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "download_get_method",
  "source_extraction_id": "bc5533b031084dca9b5380a9980fa8ec",
  "version": 1,
  "memory_type": "entities"
}
-->