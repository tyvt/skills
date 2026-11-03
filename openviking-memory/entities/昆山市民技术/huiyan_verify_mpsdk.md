# 腾讯慧眼 verify_mpsdk 集成落点与去重
昆山市民（昆物通）uni-app 小程序接入腾讯云慧眼实名核身的目录规范、封装方式与去重结论。

## 集成落点
- 运行目录固定为 `src/wxcomponents/verify_mpsdk/`（非微信原生根目录写法）
- 在 `pages.json` 注册 SDK 活体验证页；在 `App.vue` 的 `onLaunch` 中 `require` 并 `Verify.init()`
- 业务侧通过 `src/utils/useTencentFaceVerify.js` 封装 `wx.startVerify`，承载页为 `src/pages/verify/index.vue`

## 去重结论
- 集成后若 `src/utils/cloud-faceid-micro-sdk-*/` 仍保留完整 SDK 副本且无任何引用，应删除
- 最终删除 `src/utils/cloud-faceid-micro-sdk-v1.0.37/`（81 文件），保留 `wxcomponents/verify_mpsdk`、`useTencentFaceVerify.js`、`pages/verify/index.vue`

## 关键注意事项
- 官方文档要求 `wx.startVerify` 成功回调里 iOS 需约 500ms `setTimeout` 再执行业务逻辑，否则后续代码可能不跑

## 验证与归属
- 所属项目：昆山市民；代码基线：a1b8beb
- 来源会话ID：d204db33-771f-44d5-97bb-400ec850e59f
- 涉及文件：src/wxcomponents/verify_mpsdk/、src/utils/useTencentFaceVerify.js、src/pages/verify/index.vue、src/App.vue、src/pages.json

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "huiyan_verify_mpsdk",
  "source_extraction_id": "e1cb148bd5bc483c98332d56f3ddb01b",
  "version": 1,
  "memory_type": "entities"
}
-->