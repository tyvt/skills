# 验证码组件缺少 width:100% 导致换绑手机页对齐异常
在 zhi2-mobile-shimin 移动端项目（苏住房C）中，换绑手机页的 ImgCode 和 VerifyCode 组件缺少 width:100% 样式，导致图形验证码与「获取验证码」按钮右边缘未对齐。

## 问题根因
- zhi2-mobile-shimin/src/pages_my/setting/phone.vue 中的 ImgCode 和 VerifyCode 缺少 width:100% 样式
- 导致换绑手机页中图形验证码与「获取验证码」按钮右边缘未对齐

## 解决方案
- 为组件补上 style="width: 100%"，与登录页、注销账号表单保持一致

## 验证与归属
- 验证证据：extracted source=cursor project=components（src=components/001.md）
- 涉及文件：zhi2-mobile-shimin/src/pages_my/setting/phone.vue、src/pages/login/forget.vue、src/pages.json、src/pages/login/password.vue、src/components/VerifyCode/index.vue、src/components/shared/PhoneForm.vue、src/components/ImgCode/index.vue、src/pages_main/login/forget.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：75a1033e-1d37-4ff3-873c-e61128fd7787；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "verifycode_width_fix",
  "source_extraction_id": "b845dff9aad24c7997c2edff7c839064",
  "version": 2,
  "memory_type": "entities"
}
-->