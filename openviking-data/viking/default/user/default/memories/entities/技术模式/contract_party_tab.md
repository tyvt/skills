# 2016版合同当事人块Tab化
苏州市房地产监测V3 中 2016 版合同买受人块（SzPartyBlock.vue）改造为 zs-tabs 卡片式 4 页签，已验证通过。

## 改动内容
- `chapters/suzhou2016/components/SzPartyBlock.vue`：原纵向堆叠买受人块用 `zs-tabs`（`type="card"`）拆成 4 个页签
- 买受人信息页签：本人/法定代表人 + 姓名、出生日期、国籍/地区、身份/机构 + 证照名称+证照号、联系地址、联系电话、邮政编码、约定共有方式、共有方式+份额；含「成年人」（配偶、未成年子女）与「未成年人」（父亲、母亲、未成年兄弟姐妹）条件块
- 委托代理人页签：委托代理人(机构) 姓名、证照名称/号、联系(注册)地址、联系电话
- 法定代理人（一）信息页签：`form.legalAgents[0]` 全部字段
- 法定代理人（二）信息页签：`form.legalAgents[1]` 全部字段

## 兼容性与验证
- 字段与数据结构（`createParty()`）完全未动，正文填空仍用 `SzBlank`/`SzChoice`
- `chapter1.vue` 传 `form=formData.vendee1/vendee2` 无需改动，`SzContent.getFormData()` 不受影响
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：chapters/suzhou2016/components/SzPartyBlock.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：2f76d8fe-a175-42fa-9dfc-fd796c3d3844；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_party_tab",
  "source_extraction_id": "3891d95391874d31a54dc15319f2aa38",
  "version": 1,
  "memory_type": "entities"
}
-->