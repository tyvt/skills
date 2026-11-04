# ZsImage未指定subpackage致跨包图标加载失败
苏住房C 移动端 `ZsImage` 未指定 `subpackage` 时默认跨包读取 `pages_owner` 的 `yiwen.png` 导致图标不显示。

## 问题根因
- `ZsImage` 未指定 `subpackage` 默认跨包读取 `pages_owner` 资源
- 导致 `yiwen.png` 在其它包中不显示

## 修复要点
- 在 `pages_transaction/publishHouse/type.vue` 指定 `subpackage="pages_transaction"`
- 设 `tip-img` 宽高 `28rpx`、引入 `form2.scss` 补分割线
- 按钮 `margin-top` 调为 `160rpx`

## 涉及文件
- src/pages_transaction/publishHouse/type.vue
- src/pages_owner/house/owner/authentication.vue
- src/components/ZsImage/ZsImage.vue
- src/utils/index.js
- src/pages_transaction/publishHouse/verification.vue
- src/pages_transaction/stockHouseSign/apply.vue
- src/pages_transaction/publishHouse/additionalInfo.vue
- src/pages_owner/house/verify.vue

## 验证与归属
- 验证证据：extracted source=cursor session=0a834aef-a81b-437e-98de-264832c5f82e
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：0a834aef-a81b-437e-98de-264832c5f82e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsimage_subpackage_bug",
  "source_extraction_id": "c9e7566efee64f47b3959dda50f459d4",
  "version": 1,
  "memory_type": "entities"
}
-->