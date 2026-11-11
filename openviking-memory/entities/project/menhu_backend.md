# 门户后端
Java/Maven 多模块后端项目，供门户H5等前端调用。
## Description
- 本地目录 D:/repository/门户后端，当前分支 feature/feat-dzc-261111（HEAD 484848e 固定短信验证码，联调用；禅道1431：管理端APP接入统一门户登录）。
- 模块含 common-gateway、common-portal-server 等。
- 网关模块 common-gateway 已构建，jar 位于 target/，端口 8086，作为 API 入口；路由为 /v3.0/**、/v2.0/** 不带 /api 前缀（生产由入口层剥离，本地 nginx 代剥），处理 /v3.0/portal/... 等请求。
- 前端代理 /api/v2.0、/api/v3.0、/zhi2* 均指向该网关；本地 门户H5(8091) 已改代理到 127.0.0.1:8086 并剥除 /api 前缀联调成功。
- 依赖远程 Nacos（nacos.dev.zhi.com，命名空间 suzhou-shiqu-fangchanzonghe，auth nacos/nacos123qwe）做服务注册与配置中心，profile=dev；本机需连通该 Nacos 才能起服务。
- 项目使用 Java 21 构建（应用类 class 65）并需用 Java 21 运行；早先误用 Java 8/17 导致 UnsupportedClassVersionError。JDK21 路径为 D:\sdk\apps\temurin21-jdk\21.0.13-9.0；因 PowerShell 会把 -Dfile.encoding=UTF-8 的 JVM 参数吞掉（Java 误将 .encoding=UTF-8 当主类），须用 JAVA_TOOL_OPTIONS 环境变量传入 JVM 参数启动。
- 2026-11-11 启动状态：gateway 8086 ✅（Nacos 注册名 common-gateway-portal，本机 192.168.1.129:8086，后台任务 pwsh-e170938d997849a4，日志 gateway-console.log）、portal-server 9222 ✅（Nacos 注册名 common-portal，192.168.1.129:9222，后台任务 pwsh-ad165702c1dc4150，日志 portal-console.log）已起并连 dev Nacos；Nacos 中 192.168.10.10 上的同名实例均为 enabled=false，网关只命中本地；framework-server 9219 ❌ 因 dev Nacos 中某 URL 配置含未解析 ${...} 占位符报 Illegal character found in host: '{'，暂不影响门户登录接口。
## Relations
- 与「门户H5」前端联动；2026-11-11 用户要求将门户H5接口代理改指本地该后端以联调。

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "menhu_backend",
  "source_extraction_id": "9dc220d03ae24e38ab5418f3cb518480",
  "version": 3,
  "memory_type": "entities"
}
-->