# 本地批量启动多后端须禁 Nacos 注册
本地一次性启动 12 个后端服务时必须加 spring.cloud.nacos.discovery.register-enabled=false，否则会注册进团队共用 Nacos 命名空间污染同名服务。

## 问题根因
- 本地一次性启动 common-gateway(8080)、common-framework(9211)、data-property(9603)、zhi2-property(9604)、zhi2-maintenance(9605)、zhi2-autonomy(9606)、zhi2-credit(9616)、zhi2-external(9701)、zhi2-benefit(9803)、zhi2-evaluation(9608)、service-expand(9610)、common-flowable(9700) 共 12 个实例时，不加参数会自注册进 Nacos
- 这些服务连团队共用命名空间（如 suzhou-shiqu-suzhufang-v2），环境里已跑着 172.10.1.1 上的同名服务
- 本地实例注册后同名服务列表多出本机地址，网关负载均衡随机转发，请求打到本地机器，表现为「同事的环境莫名跑着我的代码」，极难定位

## 解决方案
- 本地启动统一带 spring.cloud.nacos.discovery.register-enabled=false，一并规避只注册不发现的问题
- 端口规划固定成表（8080 网关 + 9603~9803 业务服务），一次起 12 个不冲突
- 启动后逐个核对端口 LISTEN（12 个全在）再谈「服务可用」
- 联调前跟同组人打招呼这条纪律，避免别人环境被本地实例污染
- 启动参数留档（哪几个模块、哪些端口、关了注册），方便复现同一套本地环境

## 验证与归属
- 验证：会话 2010156f（基线 02900b8）用户诉求初始化所有子模块并启动检查，最终结论「12/12 全部在跑」并主动决策 12 个实例带 register-enabled=false 启动，给出 12 个端口与服务对应表
- 涉及文件：common-gateway、common-framework、data-property、service-expand 等 12 个模块
- 来源会话ID：2010156f-5fb3-49c1-859a-daa3a63a94f2；代码基线：02900b8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "local_nacos_register_disable",
  "source_extraction_id": "78022cce1a9f47399e4e2c302bec722c",
  "version": 1,
  "memory_type": "entities"
}
-->