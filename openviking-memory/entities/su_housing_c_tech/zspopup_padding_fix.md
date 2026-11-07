# ZsPopup弹窗留白修复
苏住房C小程序中认证失败弹窗左右留白20px问题已通过宽度约束修复。

## 问题根因
- `ZsPopup.vue`的`.popup-container`未限制宽度，导致弹窗左右留白不符合预期

## 修复内容
- `.popup-container`增加`width: 360px; max-width: calc(100vw - 40px); margin: 0 auto`
- `max-width: calc(100vw - 40px)`保证左右各留20px
- `margin: 0 auto`使弹窗水平居中，大屏仍保持最大360px宽度

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`zhi2-mobile-shimin/src/components/ZsPopup/ZsPopup.vue`、`pages_my/verification/FormLocal.vue`、`pages_owner/house/components/TypeChoose_Suzhufang.vue`
- 可在微信开发者工具打开`pages_my/verification/FormLocal`触发认证失败弹窗验证
- 项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：2795d7c1-b57e-448c-bc6a-90330c419f2b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zspopup_padding_fix",
  "source_extraction_id": "dd1e2a6351994e95ac5b5cd35121b3c0",
  "version": 1,
  "memory_type": "entities"
}
-->