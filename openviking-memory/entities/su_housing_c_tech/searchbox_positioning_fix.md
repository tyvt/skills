# 首页搜索框定位修复
苏住房C(zhi2-mobile-shimin) 首页 Project_Suzhufang.vue 调整搜索框定位，使其一半叠在 Banner 上。

## 问题原因
- 原 `header-wrap` 用 `padding-bottom: 24px`，搜索框 `bottom: -24px`，两者抵消，搜索框完全落在 Banner 下方

## 修复内容
- 搜索框改为 `bottom: 0` + `transform: translateY(50%)`，以 Banner 底边为中心上下各露一半（48px 高度各 24px）
- `header-wrap` 去掉 `padding-bottom`，改为 `margin-bottom: 24px`，为搜索框下半部分留空间避免与下方导航图标重叠

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_tab/components/Project_Suzhufang.vue`
- 来源会话ID：63ca5f15-1cf5-4d52-b386-3205bad2f5ba
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "searchbox_positioning_fix",
  "source_extraction_id": "b51dc9b7992c496996bab1a49b609341",
  "version": 1,
  "memory_type": "entities"
}
-->