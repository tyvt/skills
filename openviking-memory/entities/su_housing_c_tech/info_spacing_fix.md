# 信息页模块间距统一为10px
苏住房C小程序将 6 个信息页的模块间距统一为 10px，与 `baseCard` 组件的 `.base-card + .base-card` 规则保持一致。

## 修改页面（一）
- 小区信息 `project/info/index.vue`：`mt-20`（20rpx）→ `module-gap`（10px）
- 物业合同 `company/info/contracts.vue`：合同信息、收费标准、附件列表间距 20rpx → 10px
- 物业服务企业 `company/info/index.vue`：底部导航区间距 20rpx → 10px

## 修改页面（二）
- 街道信息 `subdistrict/info/index.vue`：基本信息卡片间距 20rpx → 10px
- 社区信息 `community/info/index.vue`：基本信息卡片间距 20rpx → 10px
- 业委会信息 `pages_owner_extra/committee/info/index.vue`：基本信息、委员卡片、议事规则间距 20rpx → 10px

## 原因与归属
- 原先部分页面用 20rpx 间距，大屏设备随 rpx 换算显宽，统一 10px 保持视觉一致
- 所属项目：苏住房C；来源会话ID：a98e9087-2a10-4769-bbf6-6e47eb7b7590

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "info_spacing_fix",
  "source_extraction_id": "aba249f47836403c914050f6abb992f1",
  "version": 1,
  "memory_type": "entities"
}
-->
