# 资金监管协议详情页与API
资金监管协议详情主页面与CRUD API位置约定，API注释明确为"查询/修改资金监管协议"。

## 核心页面
- 主页面：zhi2-web-admin/src/views/v1/presale/stock/agreement/detail.vue（资金监管协议详情，含计算逻辑）
- 列表页：zhi2-web-admin/src/views/v1/presale/stock/agreement/index.vue
- API：zhi2-web-admin/src/api/agreement/agreement.js（协议CRUD）

## 同类逻辑
- bankC...（bankCompany等）存在相同缺陷的复制/变体逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=淮安存量房
- 所属项目：淮安存量房；来源会话：d95a1342-ee75-4624-826f-714037b1fe02；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regulatory_agreement_detail",
  "source_extraction_id": "73aa677d5dcc4c69894037c8c069e86e",
  "version": 1,
  "memory_type": "entities"
}
-->