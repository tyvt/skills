# 靖江商品房
靖江商品房（Jingjiang commercial housing）前端管理/交易后台项目，仓库名 zhi0-web-admin-h5-g-unlimited，主分支 taizhou-jingjiang-shangpinfang-dev-v1.0.0。

## 技术栈与构建
- Vue 2 + Vue Router 3（hash 模式）+ Element UI，vue-cli-service 构建
- outputDir 为 dist/web，publicPath 相对路径 "./"，CopyWebpackPlugin 将 ROOT 拷贝到 dist

## 目录与路由
- ROOT/ 含 index.html（主管理 shell，iframe 加载 web/）、login.html（登录页）、static/、web/（Vue SPA 子应用）
- 登录页三按钮走 jumpRegister() 再 window.open(MAINIP + 路由)，MAINIP = origin + "/web/#/"
- API 经 $Mechanism 调 ZS_Mechanism 端点，external/* 为公开免登录接口

## 注册页现状
- /register 存在，对应 register.vue「开发企业信息备案」对外自助表单
- /InternetRegister、/brokerInterRegister 路由不存在，也无对应自助注册页
- stokeRoomOnlineSignSys 下经纪机构/经纪人注册信息页为后台管理页（需登录）

## 部署与验证
- 线上地址 112.4.105.145:8996；本地 nginx 站点靖江商品房.conf 监听 8118 反代至 112.4.105.145:10000/web/
- App.vue created() 生产环境无 token 强制跳 login.html（注册页拦截根因）
- 代码基线提交 eff2b994

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-taizhou-jingjiang-shangpinfang-fe-zhi0-web-admin-h5-g-unlimited",
  "category": "项目",
  "name": "jingjiang_shangpinfang",
  "source_extraction_id": "7c519f5a9aad44dd937f91c65e673c68",
  "version": 1,
  "memory_type": "entities"
}
-->