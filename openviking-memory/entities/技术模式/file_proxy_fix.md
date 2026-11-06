# 文件代理指错环境导致附件 404 修复（苏州市房地产监测V3）
苏州市房地产监测V3 修复本地 8081 文件代理指错环境导致附件图片 404、页面仅显示蓝色文件名链接的问题。

## 根因
- 8081 请求 /zhi2/...png 被转发到 unlimited.g... 环境，该环境无此文件 → 404
- 接口在 58.210.252.230:9002，文件也在同机 /zhi2/... 下

## 修改内容
- env/.env 中 VITE_APP_FILE_PROXY_ADDRESS 改为 http://58.210.252.230:9002
- 修改 env 后须重启 dev（Vite 不自动生效）
- 前端展示加固：项目备案详情「国有土地出让合同」改为 el-image 缩略图 + 点击预览

## 验证与归属
- 涉及文件：ProjectCertificateTabs.vue、detail.vue、env/.env
- 所属项目：苏州市房地产监测V3
- 来源会话：f85f7cf0-8601-48a0-855b-e95d48138343
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "file_proxy_fix",
  "source_extraction_id": "bf450a2d11c2459da691fafe70ea3219",
  "version": 1,
  "memory_type": "entities"
}
-->