# 惠山二期G
惠山二期G 的 estate-manage 前端与后端 e2e 联调项目，2026-11-16 实测联调环境可用。

## 联调架构
- 前端交付：nginx 8119 → `D:/repository/惠山二期G/dist`
- 代理分流：`/api/v2.0/autonomy/` → 本地 `localhost:9606`（剥 /api 前缀，timeout 120s）；其余 `/api/` → dev 网关 unlimited
- dev 网关：`g.h5.admin.web.v2.product.huishan.wuxi.dev.zhi.com`（192.168.1.30）
- 本地后端：estate-manage 各子模块切 `develop/v2.6.2-huishan`（父仓留 yulin），`mvn -pl zhi2-autonomy/zhi2-autonomy-server -am install`（48s，本地仓 `D:\maven-repo`），`java -jar target/zhi2-autonomy-server.jar --spring.cloud.nacos.discovery.register-enabled=false`（必须 false 防污染共享 dev 命名空间）

## 配置与数据库
- `bootstrap active=dev`；Nacos=`nacos.dev.zhi.com:8848`，namespace `wuxi-huishan-product`，账号 nacos / 密码取 `viking://~/privacy/credential/nacos-taicang-dev#/values/password`
- Nacos API：先 `/nacos/v1/auth/users/login` 换 accessToken，再 `/nacos/v1/cs/configs?dataId=&tenant=wuxi-huishan-product` 拉配置；gateway 路由在 `zhi2-gateway.yml`
- DB：达梦 `v2.product.huishan.wuxi.dev.zhi.com:5236`，库 `ZHISHU_AUTONOMY`（SYSDBA/SYSDBA001），dbx 已存连接“惠山dev-自治模块”

## 登录与排查
- 惠山 dev 管理端（`/security/auth/login`）：zsbase / ZS001Aa! 登录成功（2026-11-16 Playwright 实测 code:200）
- 旧记录“1300异常”属门户系统，不适用于物管管理端
- 会话主题：选择户室卡死排查 + estate-manage 后端 e2e 联调；复现脚本在 `D:\repository\惠山二期G\.task-state\e2e-autonomy-repro.mjs`

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "惠山二期G",
  "source_extraction_id": "98bf75d1fcc24834a25f679e0b9228b4",
  "version": 1,
  "memory_type": "entities"
}
-->