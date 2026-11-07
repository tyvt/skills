# MenuImage组件尺寸修复
苏住房C(zhi2-mobile-shimin)中小程序端多个tab页因MenuImage组件样式隔离导致图标尺寸异常，已通过集中管理尺寸修复。

## 问题根因
- 首页正常因主要用原生`<image>`标签；其他tab页大量用`MenuImage`组件，小程序里父组件scoped/:deep()样式无法可靠约束子组件尺寸，图标按原图大小铺满。

## 修复方案
- `MenuImage.vue`集中管理尺寸：用`img-class`属性传递尺寸类（小程序比`class`更可靠），内联`style`尺寸映射兜底，增加全局（非scoped）尺寸样式表。
- 所有`MenuImage`调用改为`img-class`：`MenuSection`（慧物业/我的/掌服务）、`HaveBgItem`、`HomeNavItem`、`MidModuleGrid`、`Project_Suzhufang`、`Community_Suzhufang`。
- 开启`virtualHost: true`，改善小程序端组件class合并。

## 验证与归属
- 构建已通过；需重新编译并在开发者工具刷新检查苏找房、慧物业、掌服务、我的等页面区域。
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`MenuImage.vue`、`src/pages`、`src/pages/index/project.vue`、`src/pages/index/temp.vue`等
- 来源会话ID：fd31d266-ac37-45f4-a828-8a29b307c443；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "menuimage_sizing_fix",
  "source_extraction_id": "1cce340fb61d44689d381b5141b1cc0e",
  "version": 1,
  "memory_type": "entities"
}
-->