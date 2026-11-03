# 双份网关实现清理：保留 gateway.js 删除 dispatcher.js
苏住房C 市民端 src/api 下 gateway.js 与 dispatcher.js 重复实现苏服办网关配置（sfbConfig）、SM3 签名与 header 组装。

## 现象与根因
- 两份实现看起来像同功能两种方案，维护时不知改哪个。
- 判定：全仓 grep dispatcher 确认无任何 import，属未接入备用实现（fetch/uni.request），与 gateway.js 功能重复。

## 解决方案
- 确认真实调用链：index.js / v1Instance.js → httpInstance.js → gateway.js（axios + 苏服办网关封装）。
- 删除 dispatcher.js，后续只维护 gateway.js 及环境变量 VITE_APP_SFB_*。
- 复用原则：一份能力两份实现时，先画调用链定唯一事实来源再删死代码；删除前确认零引用，删除后环境变量清单同步收敛。

## 验证与归属
- 验证：会话 b91754cb（基线 a444c05）用户要求「用实际用的，移除冗余的」；保留 gateway.js 链路，删除 dispatcher.js。
- 涉及文件：src/api/gateway.js、src/api/dispatcher.js、src/api/index.js、src/api/httpInstance.js、src/api/v1Instance.js
- 所属项目：苏住房C；来源会话ID：b91754cb-4f69-4526-932a-d2e80e20327e；代码基线：a444c05。


<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "dual_gateway_cleanup",
  "source_extraction_id": "c0fd305100de4799a4169c34e9bea617",
  "version": 1,
  "memory_type": "entities"
}
-->