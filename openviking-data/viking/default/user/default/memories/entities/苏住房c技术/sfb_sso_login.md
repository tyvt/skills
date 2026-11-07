# 苏住房C登录统一改苏服办SSO封装
zhi2-mobile-shimin移除自有登录页，完全走苏服办容器SSO，封装utils/sfb.js并全量替换登录跳转。

## 背景与原因
- 苏住房C运行在苏服办App轻应用容器，登录凭证由容器JSSDK下发ticket换token
- 保留手机号/密码登录会产生两套身份来源，且脱离容器无法登录

## 实施方案
- 新增src/utils/sfb.js作为唯一登录出口：hasLightAppJssdk判容器、ensureSfbTicket/triggerSfbLogin取ticket、loginWithSfbTicket换token拉用户信息、initSfbUser供App.vue静默登录、promptSfbLogin用户主动登录
- 全仓跳转/pages/login/index替换为promptSfbLogin()：包括utils/index.js的goMenu鉴权拦截、My_Suzhufang.vue、收藏/二手房详情/在线课堂点赞等页、实名认证重复账号弹窗按钮改「苏服办登录」
- 非容器环境统一提示「请在苏服办App中打开」
- 新增需登录能力一律调promptSfbLogin，禁止写router跳登录页

## 验证与归属
- 来源会话92b16b83（2026-07-15，基线77666f8）新增sfb.js并删除pages.json中login/*四条路由
- 涉及文件：utils/sfb.js、App.vue、pages.json、utils/index.js、My_Suzhufang.vue
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "sfb_sso_login",
  "source_extraction_id": "39b4e56e7fd44001bc1b6da652c64178",
  "version": 1,
  "memory_type": "entities"
}
-->