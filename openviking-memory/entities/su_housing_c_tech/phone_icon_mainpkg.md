# 手机号授权页图标主包化修复
苏住房C 安卓手机号授权弹窗图标原先放 `pages_main` 分包且未打入构建产物，导致不显示，已迁入主包改用 ZsImage。

## 问题根因
- 图标原先放在 `pages_main` 分包，且未打入构建产物，致授权弹窗顶部图标不显示

## 修复要点
- 将 `phone-auth-icon.png` 放 `src/static/images/`，`mainStaticPaths.js` 注册 `images/phone-auth-icon.png` 与兜底图 `images/warn.png`
- 删除 `pages_main/static/images/phone-auth-icon.png` 避免重复维护
- `WechatPhoneAuthPopup.vue` 原生 `<image>` 改 `<ZsImage>` 支持加载失败回退，去掉硬编码 `pages_main` 分包路径

## 涉及文件
- `mainStaticPaths.js`、`WechatPhoneAuthPopup.vue`
- `zhi2-mobile-shimin/src/pages/login/index.vue`、`src/pages/components/PhoneForm.vue`、`src/pages_my/verification/UnauthorizedPage.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：a1a45147-a211-4056-89f4-a6d870d42790
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "phone_icon_mainpkg",
  "source_extraction_id": "f38b441ffd5e41d498bcfbd97a45fa4b",
  "version": 1,
  "memory_type": "entities"
}
-->