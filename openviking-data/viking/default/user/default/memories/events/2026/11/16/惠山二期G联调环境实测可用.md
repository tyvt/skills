# Summary
2026-11-16，惠山二期G 的 e2e 联调环境经实测可用：前端由 nginx 8119 交付 `D:/repository/惠山二期G/dist`，`/api/v2.0/autonomy/` 代理到本地 localhost:9606（剥 /api 前缀、timeout 120s），其余 `/api/` 走 dev 网关 unlimited；本地 estate-manage 各子模块切到 develop/v2.6.2-huishan（父仓留 yulin）构建启动，且必须以 `register-enabled=false` 启动以防污染共享 dev 命名空间。
# 2026-11-16 (Monday) ChatLog:
**user**: # 惠山二期G e2e联调环境（2026-11-16 实测可用）

## 联调架构
- 前端交付：nginx 8119 → D:/repository/惠山二期G/dist。
- 关键代理分流：/api/v2.0/autonomy/ → 本地 localhost:9606（剥/api前缀，timeout 120s），其余 /api/ → dev 网关 unlimited.g.h5.admin.web.v2.product.huishan.wuxi.dev.zhi.com（192.168.1.30）。
- 本地后端：estate-manage 各子模块切 develop/v2.6.2-huishan（父仓留 yulin），mvn -pl zhi2-autonomy/zhi2-autonomy-server -am install（48s，本地仓 D:\maven-repo），java -jar target/zhi2-autonomy-server.jar --spring.cloud.nacos.discovery.register-enabled=false 启动（必须 register-enabled=false 防污染共享 dev 命名空间）。bootstrap active=dev，Nacos=nacos.dev.zhi.com:8848 namespace wuxi-huishan-product（nacos/{{ov_privacy:default:viking://~/privacy/credential/nacos-taicang-dev#/values/password}}），DB=达梦 dameng.v2.product.huishan.wuxi.dev.zhi.com:5236 ZHISHU_AUTONOMY（SYSDBA/SYSDBA001，dbx 已存连接“惠山dev-自治模块”）。
- Nacos API：先 /nacos/v1/auth/users/login 换 accessToken，再 /nacos/v1/cs/configs?...

<!-- MEMORY_FIELDS
{
  "event_name": "惠山二期G联调环境实测可用",
  "goal": "确认e2e联调环境可用",
  "summary": "2026-11-16，惠山二期G 的 e2e 联调环境经实测可用：前端由 nginx 8119 交付 `D:/repository/惠山二期G/dist`，`/api/v2.0/autonomy/` 代理到本地 localhost:9606（剥 /api 前缀、timeout 120s），其余 `/api/` 走 dev 网关 unlimited；本地 estate-manage 各子模块切到 develop/v2.6.2-huishan（父仓留 yulin）构建启动，且必须以 `register-enabled=false` 启动以防污染共享 dev 命名空间。",
  "ranges": "0-4",
  "source_extraction_id": "98bf75d1fcc24834a25f679e0b9228b4",
  "version": 1,
  "memory_type": "events"
}
-->