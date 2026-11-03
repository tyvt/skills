# 证件类型已提交但列表卡片仍显示二代居民身份证
新增承租方选「统一社会信用代码」保存成功，但列表/卡片仍显示「二代居民身份证」——展示层写死文案没走字典翻译，不是保存失败。

## 问题根因
- addPersonInfo.vue 已把 idCardType 提交到接口，非保存失败
- 承租方/出租方卡片、代理人卡片、代理人新增/详情页顶部信息区把证件类型写死成「二代居民身份证」
- 未按接口返回的 idCardType 查字典翻译，后端存对前端也永远显示旧文案

## 解决方案
- 分清「读」与「写」两条链路：确认提交体字段名与接口一致（idCardType），再看展示端取的是否同一字段
- 新增统一字典翻译入口 src/utils/dict.js 的 getDictLabel，按字典 transaction_idNumberType 取文案，兼容 001/002 带零填充写法
- 逐个消费点替换：leaserCard.vue、infoCard.vue、addAgent.vue、detailAgent.vue（既有字段绑错又有写死文案一起改）
- 若改完仍显示 -，多半是列表接口 lesseeList 没返回 idCardType，需后端在列表项带上该字段

## 验证与归属
- 验证证据：会话 8eb8b2fc，用户诉求 1「选统一社会信用代码保存完还是显示二代居民身份证」；最终结论原因在展示层写死、非保存失败，列出五处改法
- 涉及文件：src/utils/dict.js、src/pages/leaseContract/components/leaserCard.vue、infoCard.vue、addAgent.vue、detailAgent.vue、addPersonInfo.vue
- 所属项目：宿迁苏服办；来源会话：8eb8b2fc-49e0-4dd4-af29-f27328e9f2fc；代码基线：6996f66

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "idcard_display_dict",
  "source_extraction_id": "27867a746efe4299a0f31f9b4c78b5d9",
  "version": 1,
  "memory_type": "entities"
}
-->