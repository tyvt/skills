# 首页Header与Banner间隙修复
苏住房C(zhi2-mobile-shimin) 首页 Project_Suzhufang.vue 调整 `.header-wrap` 与 `.home-nav-wrap` 间距，去除 Banner 与白色区域间隙。

## 问题原因
- `.header-wrap` 原设 `margin-bottom: 24px`，在 Banner 与白色区域(`home-nav-wrap`)间留出空隙

## 修复内容
- 去掉 `header-wrap` 的 `margin-bottom`，使白色区域紧贴 Banner 底部
- 将 `home-nav-wrap` 的 `padding-top` 从 `9px` 调整为 `33px`（24px 搜索框下半部分 + 9px 图标间距）
- 搜索框仍用 `position: absolute` + `translateY(50%)`，保持一半叠在 Banner 上

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_tab/components/Project_Suzhufang.vue`、`pages/index/components/Project_Suzhufang.vue`
- 来源会话ID：8d4ad7df-77b2-4614-8dcd-322eea0ae772
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "header_layout_spacing_fix",
  "source_extraction_id": "b51dc9b7992c496996bab1a49b609341",
  "version": 1,
  "memory_type": "entities"
}
-->