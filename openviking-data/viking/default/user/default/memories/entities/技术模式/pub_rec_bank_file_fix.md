# 对账文件下载路径相对化修复
苏住房G项目zhi2-web-admin的pubRecBankFile模块修复了子路径部署下下载地址丢失部署前缀的问题，已恢复使用resolveServerAssetUrl。

## 问题根因
- 8月17日重构（f5e7d0f54）将下载逻辑改回 window.origin + filePath，导致部署在子路径（如/zhi2-test/）时拼出错误地址，缺少部署前缀。
- 错误示例：https://szf.szzfcjj.cn/zhi2-test/2026/... 正确应为 https://szf.szzfcjj.cn/<部署前缀>/zhi2-test/2026/...

## 修复要点
- 恢复使用 resolveServerAssetUrl，按当前页面部署目录做相对路径解析（与图片资源一致）。
- 修改文件 src/views/benefit/pubRecBankFile/index.vue 第106-111行：fetch(resolveServerAssetUrl(filePath)).then(res=>res.blob())... 生成下载链接。

## 验证与归属
- 涉及文件：pubRecBankFile/index.vue、src/utils/resolveServerAssetUrl.js、src/utils/imgPrfix.js。
- 所属项目：苏住房G；来源会话：684bd892-9f31-405c-be6b-c5c9fdc86eef；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pub_rec_bank_file_fix",
  "source_extraction_id": "aa5097d2d987484dac22db483d630023",
  "version": 1,
  "memory_type": "entities"
}
-->