# 测试环境开启第三方登录
惠山二期H5在测试与生产环境开启灵锡第三方登录，开发环境仍用账号密码。

## 环境变量
- 三个环境文件新增VITE_APP_OUT_LOGIN开关
- .env.test=true：测试环境开启第三方登录
- .env.development=false：本地开发仍用账号密码登录
- .env.production=true：生产环境开启第三方登录

## 逻辑调整
- src/utils/lingxi.js新增isOutLoginEnabled，读取VITE_APP_OUT_LOGIN
- 调整skipLingxiHouseAuthInTest：之前测试、开发环境都跳过灵锡房屋授权；现在仅在「未开启第三方登录」且为开发环境时跳过
- 测试环境打包（npm run test）走完整灵锡流程：带requestCode回跳自动登录、业主决策等入口校验灵锡房屋授权、添加/绑定房屋跳转第三方授权页

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 涉及文件：.env.test、.env.development、.env.production、src/utils/lingxi.js
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：0f545aba-3c46-42a6-8e9b-1967f22cd702；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "test_out_login",
  "source_extraction_id": "42e42a6c3c634f6c89552210c79fc318",
  "version": 1,
  "memory_type": "entities"
}
-->