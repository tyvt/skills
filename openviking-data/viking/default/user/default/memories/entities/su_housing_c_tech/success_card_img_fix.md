# 认证成功页SuccessCard图片路径修复
苏住房C小程序中SuccessCard.vue的success状态误用原生`<img>`导致微信端500错误，已改为ZsImage修复。

## 问题原因
- success状态使用原生`<img>`且路径写`images/authorized.png`
- 微信小程序中相对路径按组件所在目录解析，变成不存在的`/components/shared/images/authorized.png`
- fail、warning等状态使用`ZsImage`经`resolveStaticUrl`正确解析到主包`static/images/authorized.png`

## 修改内容
- 将success状态的`<img>`改为`<ZsImage>`，与其他状态保持一致
- 修改文件：`SuccessCard.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`SuccessCard.vue`、`AuthorizedSuccess.vue`、`mainStaticPaths.js`
- 来源会话ID：1b2ede19-fcac-48a1-8f1a-9548ba379034

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "success_card_img_fix",
  "source_extraction_id": "72981d96a43e4556801acb220899f2b0",
  "version": 1,
  "memory_type": "entities"
}
-->