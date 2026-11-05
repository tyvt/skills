# 阳光物业页面菜单图标清晰度修复
苏住房C 小程序「阳光物业」页面的 7 个菜单图标因原图分辨率低被放大显示而模糊，已替换为更清晰的 @2x 版本。

## 问题原因
- 原图标多为 28×28 像素，在页面以 40px 显示时被放大，显得模糊

## 修改内容
- 替换 7 个菜单图标为 56×56 或更高清版本，路径 `zhi2-mobile-shimin/src/static/images/new/complex/`
- 涉及菜单项：物业服务企业、物业人员、服务标准、工作动态、物业服务企业账户、年度预算、服务周报
- 若仍不够清晰，可把 `icon-size` 从 40 调到 48，或提出进一步调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/pages/property/index.vue`、`src/pages/index`、`src/pages/index/components/MenuCard.vue`
- 来源会话ID：80701608-ca7d-409a-88df-69b50cc0ccd2

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "property_icons_fix",
  "source_extraction_id": "53b1b22b039b46d69c1ec62dee8a5258",
  "version": 1,
  "memory_type": "entities"
}
-->