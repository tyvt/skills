# curl payload BOM 坑
PowerShell 用 [Text.Encoding]::UTF8 写 curl payload 会带 BOM，被网关判 400，须改用无 BOM 编码。

## 关键事实
- 现象：PowerShell `[Text.Encoding]::UTF8` 写出的 curl payload 带 BOM，网关返回 400
- 修复：改用 `[System.Text.UTF8Encoding]::new($false)`（即 UTF8Encoding($false)）写无 BOM 文件
- 场景：主控模型批量测试等需直连网关发 curl 请求时踩到

## 关系
- 属于网关请求编码限制；与 controller-bench 直连网关测试相关

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "curl_payload_bom",
  "source_extraction_id": "27dc3a02159a41108099a55bb308f46c",
  "version": 1,
  "memory_type": "entities"
}
-->