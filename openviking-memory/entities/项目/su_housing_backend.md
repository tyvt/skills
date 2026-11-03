# 苏住房后端
苏住房（苏州住房）物业系统多模块 Maven Spring Cloud 后端项目，位于 D:\repository\苏住房后端。

## 架构与版本
- 多模块 Maven（Spring Cloud Alibaba）微服务，含网关与多个 server，共 26 个模块
- 版本 zhi2 2.6.1，区别于本机已运行的 zhi3 3.0.0；承载防汛 C 端（防汛巡检）数据

## 核心服务
- zhi2-property-server：防汛巡检"家园区模块"，端口 9604，服务名 zhi2-property，profile dev；2026-10-30 构建 12.6MB jar，target/lib 依赖齐全；截至 2026-11-03 稳定运行，Nacos 注册正常、业务接口未带 token 返 403
- common-framework-server（CommonFrameworkApplication）：鉴权/登录服务，端口 9211，服务名 common-framework，profile dev；截至 2026-11-03 已启动并注册 Nacos；承载 /v2.0/security/auth/login（管理端）与 /v2.0/security/appAuth/login（App/H5 端），token 拦截器校验特定 header
- property(9604) 不承载登录接口（返 404），登录/鉴权由 common-framework(9211) 提供；本机 zhi3 网关(8080) 无法复用其 dev namespace

## 登录与鉴权
- 测试账号：zsbase / Zs@2026Aa!（超级管理员，USER_ID=1，昵称"管理员"，权限 *:*:*，角色 admin）
- 登录密码须 AES 加密再传：AES/CBC/PKCS5Padding，KEY=`A-16-Byte-keyVal`(16字节)，IV=`A-16-Byte-String`(16字节)，Base64；由 common-utils 的 AESUtil 实现；明文致 AuthServiceImpl.validate 空指针
- AESUtil.main 样例密文 YNgpxUfKFMqdompB+t9SEA== 为陈旧向量不可作校验基准
- 服务间 Feign 调用须带 `zhi-project-id` 头，缺失报 MissingRequestHeaderException 致登录"获取用户失败"
- 2026-11-03 联调初 login 9211 用 zsbase 报 NPE（AuthServiceImpl.login:264 用户为 null），根因运行中的 common-framework 处 test profile、连 test DB 无此账号；该账号在 dev 环境有效

## 数据库与测试数据
- 连达梦（Dameng）测试库「苏住房测试」：dameng.v2.suzhufang.shiqu.suzhou.test.zhi.com:5236（非 MySQL）
- 用户表 COMMON_FRAMEWORK.SYS_USER 含 zsbase（USER_ID=1，昵称"管理员"）；密码 BCrypt 哈希不可逆，LOGIN_PASSWORD 为空
- 巡检表 ZHISHU_PROPERTY.T_PATROL / T_PATROL_ITEM / T_PATROL_PLAN / T_PATROL_RECORD 结构齐全；原数据量均为 0
- 2026-11-03 插入样本巡查项/计划，关联真实小区 667562048676123(苏地2021-WG-44号地块) 与 COMPANY_ID 1744632087085916161(苏州明湖房地产开发有限公司)；T_PATROL_ITEM 必填 PATROL_ITEM_ID/COMPANY_ID/ITEM_NAME/THE_STATE
- 样本插入后接口仍返 total=0：BaseDO 含 @TableLogic theState（未删值默认 0）；zsbase 无公司归属，框架数据权限拦截器可能追加 COMPANY_ID 条件；根因截至会话结束未定位（疑日志缓冲）

## 运行依赖
- Java 8 + Maven 3.9.16；远程 Nacos nacos.dev.zhi.com(192.168.1.71，namespace suzhou-shiqu-suzhufang-v2) 需鉴权
- 本机 zhi3 3.0.0 的 common-gateway 占用 8080(PID 23088)，连 yulin namespace(192.168.1.110)，不识别 property 的 dev namespace（返 404）；本地 Redis(6379) 在跑，MySQL 本地未起

## 启动要点
- 须 -Dfile.encoding=UTF-8 -Dsun.jnu.encoding=UTF-8，否则 Nacos UTF-8 中文配置被 GBK 解析致 MalformedInputException、JPush/Seata 缺参启动失败
- 中文路径 jar 需用 workdir 相对路径 -jar zhi2-property-server.jar，避免 Start-Process 中文路径误编码打不开


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "su_housing_backend",
  "source_extraction_id": "f885d6022a954753864f34ddda767516",
  "version": 6,
  "memory_type": "entities"
}
-->