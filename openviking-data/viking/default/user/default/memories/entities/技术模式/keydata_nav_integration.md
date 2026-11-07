# KeyDataNav 与 getKeyData 对接（苏住房G）
苏住房G 首页 KeyDataNav 与 `getKeyData` 接口已完成对接。

## 根因与处理
- `loadKeyData` 原只认 `company`/`complex`/`buildArea`，真实接口为 `companyNum`/`complexNum`/`floorAreaTotal` 等，映射失败致 `keyData` 空
- 模板 `breakdowns` 占位数字（3,000/580/200）无数据时仍显示

## 代码变更
- 新建 `keyDataMap.js`：`isPortalKeyDataBody`/`normalizeKeyData` 把接口 `data` 转成 KeyDataNav 所需结构（类型明细+收费方式两块、面积用 `㎡`、千分位格式化）
- `index-v2.vue`：优先走 `normalizeKeyData`；保留旧 UI 结构与 `toMap` 回退；`keyDataFetchSeq` 防快速切换区域时旧请求覆盖新数据
- 同步调整 `KeyDataNav.vue`、`home.js`、`home-v2-mocks.js`

## 验证与归属
- 所属项目：苏住房G；来源会话：9db759c2-bcb5-46f8-be2a-cc451af4fbef
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "keydata_nav_integration",
  "source_extraction_id": "860342b9e35444b492cc9a51f5ff3149",
  "version": 1,
  "memory_type": "entities"
}
-->