# v3 后端本地构建与启动（data-property）
为复现人事变更详情 400 而本地构建并启动 v3.0.0 data-property 服务的构建链、Nacos 配置与卡点。

## 构建链
- 从 v3.0.0 建 worktree `estate-manage-v3`（避开 yulin 脏主检出）；data-property gitlink 78879c2e，另检出 common-utils、common-api、external-common 的 v3 版本。
- 本地 Maven 仓库是 `D:\maven-repo`（不是 ~/.m2）；v3 构建需 JDK21（机器默认 JAVA_HOME 为 JDK8）；私服 nexus.zhi.com 可达；无预编译 data-property jar，必须本地构建。
- data-property 依赖极简：仅 `common-api:3.0.0-SNAPSHOT` + Spring 官方包，本地仓库已有部分 3.0 公共 jar。
- install 顺序：common-utils → common-api → data-property；external-common 依赖 common-api 但 data-property 不直接用，可后补。
- 关键坑：用 v3 gitlink 源码 install 的 common-api jar 缺 coManagement / property.api.houseObligee 等类（这些类只在私服 4-7 时间戳版 jar 里），反而比私服版缺类；删掉本地 install 的 SNAPSHOT jar 让 Maven 用私服时间戳版后即 BUILD SUCCESS，fat jar 325MB。

## Nacos 与配置
- v3.0.0 bootstrap.yml 指向 `192.168.1.110:18848` + namespace `zscloud`；旧分支文件里的 `wuxi-huishan-product` 是惠山线，不适用于苏州；本地 gateway 连 `yulin`（profile=test），两个 Nacos 都可达。
- 已运行服务的 Nacos 客户端缓存 `~/nacos/config` 含明文配置；发现的 namespace：`zscloud`（redis 192.168.1.110:16379）、`suzhou-shiqu-suzhufang-v2`（苏州 v2 线，redis 192.168.1.12:6379 db15）、`yulin`。
- zscloud 与 yulin 下都读不到 v3 需要的 Redis 键：v3 升级 Spring Boot 3.2 后 Redisson 读 `spring.data.redis.host/port`，共享配置却是旧键 `spring.redis.*` → redissonClient 初始化 `MalformedURLException: "null"`；用 JVM 参数覆盖新键即可，RedissonConfig 里 setDatabase(1) 硬编码。
- 苏州 v2 线 dataId 为 `zhi2-property.yml`（达梦 172.9.1.1:5236，SCHEMA=ZHISHU_PROPERTY），v3 代码加载 `data-property.yml`（空）→ `dynamic-datasource can not find primary datasource`；需注入 `spring.datasource.dynamic.primary=master` 与 `spring.datasource.dynamic.datasource.master.*`。
- 目标 dev 库（DBX「房地产监测V3」，含 2 个有效 changeId）为达梦 `dameng.v2.fangchanzonghe.shiqu.suzhou.dev.zhi.com:5236`、SCHEMA=DATA_PROPERTY；其明文凭据仍未知（`SYSDBA/SZdt~1234@` 属 172.9.1.1 苏住房 dev，连该库报用户名或密码错误）。

## 启动与验证
- 服务端口 9212，可直接调 9212 复现详情接口，无需 gateway（8080）转发；服务需注册到与目标库配套的 namespace。
- 启动失败时日志出现 ContextClosedEvent 即启动中途回滚；`GET /{id}` 传任意不存在的 id 即可触发 NPE 抓堆栈，不必依赖库内 changeId。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "v3_backend_startup",
  "source_extraction_id": "0b0b9d460a884399bd77607e85481cf4",
  "version": 1,
  "memory_type": "entities"
}
-->