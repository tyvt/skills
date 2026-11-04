# 地下车库在未开户状态不检查 account 字段
在 empj_EstateDetail.js 中，地下车库的逻辑未检查 account，与地上逻辑不一致。

## 问题
- changeBuild 将 floor<0 归类到 mapUnit['地下车库']；页面 "未开户" 使用 image/no.png 且类为 gray。
- 地下车库仅依据 purpose 和 isInitpayment 判断，未检查 account，与上层不一致。

## 文件与来源
- 涉及文件: empj_EstateDetail.js, empj_EstateDetail.shtml, empj_EstateDetail.css, BuildingMapper.xml.
- 源会话: 47a15a5b-96fc-44bf-a48d-4d88ec7e305c.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "underground_garage_account",
  "source_extraction_id": "946821cb168e4998b6ec501f63eecd13",
  "version": 1,
  "memory_type": "entities"
}
-->