# B端默认物业管理区域不可修改
园区物管2.0 在 pubRegulatoryAccount、pubRegAccountChange、pubRegulatoryStopAgreement 三页加入与 pubManagementOrg 一致的 B 端逻辑。

## 公共逻辑
- 新增 `isBTerminal` 计算属性。
- B 端：物业管理区域输入框禁用，隐藏搜索图标，禁止弹出选择框。
- 新增模式且为 B 端时，自动填充当前选中的物业管理区域。

## 各页差异
- `pubRegulatoryAccount`：自动填充接口 `/benefit/pubManagementOrg/page`，同步填充公共收益账户名称。
- `pubRegAccountChange`：同接口，带 `accountId` 跳转时不自动填充（沿用原账户数据）；G 端可点击选择。
- `pubRegulatoryStopAgreement`：接口 `/benefit/pubRegulatoryAccount/page`，同步填充管理主体、管理银行等相关字段；抽取 `applyPropertyProjectRow` 方法供自动填充与手动选择共用。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：benefit/pubManagementOrg/detail.vue 等。
- 所属项目：园区物管2.0；来源会话：93317773-d26a-4a23-9229-5c568913c133；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_mgmt_area",
  "source_extraction_id": "5b28c23ba34f4fcf8f92896fe45914b5",
  "version": 1,
  "memory_type": "entities"
}
-->