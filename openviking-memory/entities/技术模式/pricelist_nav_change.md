# 共用列表导航漏change致变更跳备案
苏州市房地产监测V3 价格备案与变更列表共用记录页及 buildDetailNavigation，变更菜单 pathHint 含 change 但导航按 detail 匹配误命中首个备案 detail 路由。

## 问题现象
- 价格备案备案与变更列表共用 views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue 及 buildDetailNavigation
- 变更菜单 pathHint 含 change，但导航按 detail 匹配误命中首个备案 detail 路由

## 解决方案
- utils/ruoyi.js 中 pathHint 含 change 时解析 changeDetail
- 解析路由不含 pathHint 则回退列表路径 /${id}

## 验证与归属
- 验证证据：cursor session=dbc55dba-6010-4384-9d71-56be65335631
- 涉及文件：views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue、mixins/listMixins.js、views/autonomy/regulation/change/index.vue、utils/ruoyi.js、e2e/modules/price-filing-routes.spec.js、e2e/modules/price-filing-view-refresh.spec.js、路由信息.json、store/modules/permission.js
- 来源会话ID：dbc55dba-6010-4384-9d71-56be65335631

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pricelist_nav_change",
  "source_extraction_id": "e4d17952d7944d45bd6e4325da53fe2a",
  "version": 1,
  "memory_type": "entities"
}
-->