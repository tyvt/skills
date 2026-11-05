# 园区物管2.0后端（estate-manage）
园区物管2.0（榆林G）Spring Cloud 微服务后端，仓库 http://gitlab.zhi.com/zhishu/estate-manage，分支 develop/v2.6.2-yulin。

## 架构与服务
- 多模块 Maven Spring Cloud Alibaba（gateway + 14+ 服务），Java 8，Nacos 配置/注册，Dameng，无 Docker。
- 关键端口：common-gateway(8080)、common-framework(9211，鉴权/登录/部门树)、zhi2-property(9604，物业区域备案列表)。
- Nacos nacos.test.zhi.com namespace yulin-all-wuguan；配置 application.yml/shared-druid.yml/shared-redis.yml/shared-seata.yml。

## 数据库
- 达梦「榆林G-物管后端」dameng.v2.wuguan.all.yulin.test.zhi.com:5236，SYSDBA/DaMeng_qZXhjHBFdEB8kInP（已加 DBX 连接）。
- 单实例多 schema：COMMON_FRAMEWORK(SYS_DEPT 部门树)、ZHISHU_PROPERTY(T_COMPLEX)、DATA_PROPERTY、SERVICE_EXPAND。
- Redis 172.10.0.2:6379(密码 Redis_gqpVKeIEUGia1tQe)；Seata 192.168.10.10:8091。

## 本地启动要点
- Java 8 必须 -Dfile.encoding=UTF-8 防 Nacos 中文 YAML 被 GBK 解析失败（首次本地启动根因）。
- 登录密码前端 AES 加密后传输（与苏住房同套机制）；服务间 Feign 须带 zhi-project-id 头。
- 部门树：榆林市(825)→榆阳区(826)/横山区(827)/神木市(837)…(DEPT_TYPE 0)；子区域(高新区/科创新城)无独立节点。
- 临时测试账号须赋有 SYS_PROJECT_MENU(wuguan) 映射的角色（如 role 9 市州）才能加载动态路由；USER_ID=1 或 1152921504609992704 才被视为 admin。

## 联调注意
- 共享测试 Nacos 集群，本地启动服务会注册进去与测试实例混部，可能破坏 Feign 调用；验证完应停止本地服务。
- 前端 zhi2-web-admin 的 vite rootDir 指向父目录，多 worktree 构建互相覆盖 dist，须用 --outDir 隔离。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "estate_manage_backend",
  "source_extraction_id": "3827b637d846433b90af0efe5c8dc023",
  "version": 1,
  "memory_type": "entities"
}
-->