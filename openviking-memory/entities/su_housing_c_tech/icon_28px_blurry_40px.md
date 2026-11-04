# 原图标28px于40px显示放大模糊
阳光物业页面菜单图标原分辨率 28×28 在 40px 显示放大模糊。

## 问题根因
- 阳光物业页面菜单图标原分辨率 28×28
- 在 40px 显示时放大模糊

## 解决方案
- 替换 icon_complex_11.png 等 7 个文件为 56×56 版本，路径 src/static/images/new/complex/
- 必要时 icon-size 调至 48

## 验证与归属
- 验证证据：extracted source=cursor session=80701608-ca7d-409a-88df-69b50cc0ccd2
- 涉及文件：pages/property/index.vue、pages/index/components/MenuCard.vue、components/ZsImage/ZsImage.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：80701608-ca7d-409a-88df-69b50cc0ccd2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "icon_28px_blurry_40px",
  "source_extraction_id": "6e5b846ebcdc448fb91edbfc90ee8dc1",
  "version": 1,
  "memory_type": "entities"
}
-->