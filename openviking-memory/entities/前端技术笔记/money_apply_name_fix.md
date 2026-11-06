# 用款申请物业管理区域弹框街道社区名称修复
修复园区公共收益项目用款申请「物业管理区域名称」弹框街道、社区列显示编码而非中文名称的问题。

## 问题原因
- 弹框街道、社区列直接绑定接口返回的编码字段（如 `320571053`），未用字典 formatter 转中文

## 修复内容
- 在 `pubUseMoneyApply/detail.vue` 的 `showPropertyProjectDialog` 中为街道、社区列补充 formatter
- 街道列 `formatter: this.subdistrictFormatter`，社区列 `formatter: this.communityFormatter`
- 页面通过 `detailMixins` 引入 `area` mixin，组件创建时加载街道/社区字典并映射为名称
- 处理方式与资产租赁合同备案、公共房屋等同类弹框一致

## 验证与归属
- 涉及文件：pubUseMoneyApply/detail.vue、ruoyi.js、pubParkingRate/detail.vue
- 所属项目：园区公共收益；来源会话：414b600e-25ec-4a22-8966-2b35fffacd1d

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "money_apply_name_fix",
  "source_extraction_id": "a0a0a0c0aaa74832979fdcae5833192c",
  "version": 1,
  "memory_type": "entities"
}
-->