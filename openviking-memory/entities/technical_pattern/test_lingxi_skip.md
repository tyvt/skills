# 测试环境不可跳过灵锡第三方授权
惠山二期H5 中测试环境原可跳过灵锡房屋授权，无法验证第三方登录流程。

## 问题根因
- checkLingxiHouseAuth 原仅在 VITE_APP_OUT_LOGIN=false 且 MODE==='development' 时跳过校验，env.test 下仍弹授权提示
- 无法验证第三方登录流程

## 解决方案
- .env.test 与 .env.production 设 VITE_APP_OUT_LOGIN=true
- lingxi.js 定义 skipLingxiHouseAuth = !isOutLoginEnabled，外部登录关闭时一律跳过房屋授权检查
- 测试环境打包走完整灵锡流程

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 验证：src=惠山二期H5/002.md
- 涉及文件：src/utils/lingxi.js、package.json、vite.config.ts、node_modules/uni-preset-vue/src/utils/lingxi.js、src/pages/index/newHome.vue、src/pages/index/components/complexCard.vue、index.html、src/pages/login/index.vue、src/utils/index.js
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：0f545aba-3c46-42a6-8e9b-1967f22cd702, acf753e7-5c5e-4a4b-813f-ee605ac49acf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "test_lingxi_skip",
  "source_extraction_id": "81ea005e02284cf9a207c22dfc8a128a",
  "version": 3,
  "memory_type": "entities"
}
-->