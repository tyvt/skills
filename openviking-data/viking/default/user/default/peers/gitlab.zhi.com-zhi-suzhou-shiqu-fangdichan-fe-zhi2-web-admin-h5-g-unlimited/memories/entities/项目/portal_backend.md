# 门户后端
门户后端是 门户(Portal) 项目的 Java 微服务后端仓库，与 zhi2-web-admin 前端子模块配合提供对外信息配置等后台能力。

## 构建要求
- 基于 Spring Boot 3，父 pom 指定 <java.version>21</java.version>，必须用 JDK21 构建（JDK8 会因编译器 --release 不支持而失败）
- Maven 构建，依赖镜像 nexus.zhi.com，本地仓库 D:/maven-repo；skipTests 构建 common-gateway 与 common-portal-server 两个可执行 jar

## 运行依赖
- Nacos 配置/注册中心：nacos.dev.zhi.com:8848（鉴权账号 nacos/nacos123qwe），服务启动后注册实例
- Redis：192.168.1.110:16379，db 3（登录失败计数等缓存）
- 达梦数据库：dameng.v2.fangchanzonghe.shiqu.suzhou.dev.zhi.com:5236，schema ZHISHU_PORTAL（bootstrap.yml 写的 192.168.1.101:15236 非实际库，以 Nacos common-portal.yml 覆盖为准）

## 服务与接口
- common-portal-server 端口 9222，common-gateway 端口 8080；网关路由前缀 /v2.0 与 /v3.0（无 /api 前缀）
- 门户登录 POST /v3.0/portal/login/login，入参 {userName, password}，Spring Security bcrypt 校验，无验证码
- 超管 userId=1 直接获取全部菜单（含 对外信息配置 MENU_ID 20031），无需单独授权角色

## 本地联调
- 启动顺序先 common-portal-server 再 common-gateway；前端 nginx 站点需将 /api/v2.0|v3.0/* 去 /api 前缀反代网关 8080
- 本地测试可将达梦库 admin 用户密码重置为已知 bcrypt 值（如 Admin@12345）以便端到端登录；该密码仅限本地/测试环境

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "项目",
  "name": "portal_backend",
  "source_extraction_id": "c97f0fab19dc4b2d88395d460dc20c77",
  "version": 1,
  "memory_type": "entities"
}
-->