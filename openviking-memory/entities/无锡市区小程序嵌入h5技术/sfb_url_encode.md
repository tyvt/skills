# 苏服办跳转URL中Base64密文"+"被解码为空格致解密失败
无锡市区小程序嵌入H5中苏服办跳转URL的密文参数因URL编码规则被篡改，导致后端解密失败。

## 问题根因
- 苏服办跳转URL中 `phone`、`idNumber` 等参数为Base64密文，包含 `+` 字符
- H5 使用 `URLSearchParams` 解析时按 `application/x-www-form-urlencoded` 规则把 `+` 当成空格解码
- Base64密文里的 `+` 被替换成空格后后端解密失败

## 修复方案
- 在 `h5Context.js` 的苏服办登录逻辑中，读取密文参数后将空格还原为 `+`

## 验证与归属
- 来源会话：1d789cb5-e259-4d57-ada7-dfb786d89609；代码基线：none
- 涉及文件：src/utils/h5Context.js、src/utils/portal.js
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_url_encode",
  "source_extraction_id": "5279fead9abb4516adfbc3c5bd9fc16c",
  "version": 1,
  "memory_type": "entities"
}
-->