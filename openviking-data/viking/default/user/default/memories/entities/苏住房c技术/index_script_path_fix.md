# 线上脚本加载路径修复
苏住房C H5因`index.html`使用相对路径导致微信/支付宝中脚本404，已改为基于`location.pathname`的绝对路径。

## 问题根因
- `index.html`原用相对路径`./static/js/...`，按当前页面URL解析而非部署目录
- 入口如`https://域名/szffluzm`（无尾斜杠）使`./static/js/hex.js`解析为`https://域名/static/js/hex.js`（404）
- 苏服办App的WebView带`index.html`或尾斜杠，相对路径正常

## 修复内容
- 在`index.html`中根据`location.pathname`计算资源根路径，用绝对路径加载脚本
- 确保`/szffluzm`、`/szffluzm/`、`/szffluzm/index.html`均正确加载`/szffluzm/static/js/hex.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`index.html`、`./static/js/hex.js`
- 来源会话ID：43c2d24d-9340-4131-a043-2b0f220ba0b9；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "index_script_path_fix",
  "source_extraction_id": "1d5777e127fe4ad7ad19ecf01a6caf1e",
  "version": 1,
  "memory_type": "entities"
}
-->