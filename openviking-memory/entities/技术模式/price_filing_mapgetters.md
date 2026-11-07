# 价格登记页面缺少 mapGetters
在 zhi2-web-admin (产品 2.0) 中，价格登记页面没有 mapGeters('common', ['areas'])，导致 Vuex getter 错误。
## 问题根因
- 组件 recordPriceMngSuzhou 中缺少 mapGetters('common', ['areas'])。
## 解决方案
- 在价格登记页面补全 mapGetters('common', ['areas'])。
- 通过 currentRoute 规范化验证；69 个 E2E 测试通过。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：758460b0-2a05-4d83-8594-0821de46c25c
- 验证证据: cursor session=758460b0-2a05-4d83-8594-0821de46c25c
- 涉及文件: src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue, src/store/modules/permission.js
- 所属项目: 2-0; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_filing_mapgetters",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->