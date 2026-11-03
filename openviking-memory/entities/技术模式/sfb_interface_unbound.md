# 苏服办报相关应用接口未绑定
苏服办开放平台集成打包后报错「相关应用接口未绑定」，因 interface_id 须与平台给该应用绑定的接口一致，须以线上下载的生产包为基准反查。

## 问题根因
- 苏服办是「应用+接口」两套 ID 体系：app_id（本项目 fwzlhtba）与 interface_id 须一一绑定
- 本例生产包取 token 的 interface_id 被手工改成 getSfbToken2https，而 fwzlhtba 绑定的是 szfwzlbasfb2https
- getSfbToken2https 是平台清单里另一条独立条目，名字相近易误绑

## 解决方案
- 排查基准是生产在用的包（线上下载的 zip），而非仓库当前分支代码
- 对照平台接口清单核对每条接口（名称、所属应用、协议、状态、更新时间）
- 把分支代码改回平台为该应用绑定的 ID（本例 szfwzlbasfb2https）重新打包
- 核对清单标「故障」的接口（如房源核验 szfwzlbacqhyjkhttps、备案记录列表 szfwzlbazlbalbhttps）属平台侧故障，勿在前端找原因
- 打包后按优先级验证：苏服办 token → 登录 → 房源核验 → 备案记录列表 → 承租人/代理人新增

## 验证与归属
- 验证证据：会话 fc5779cf，用户诉求 3 报「相关应用接口未绑定」，诉求 5/6 给出生产包地址「以这个为基准」；最终结论为生产包 interface_id 被改、分支代码已是正确原值重新打包即可
- 涉及文件：src/api/gateway.js、src/api/config.js、src/api/publishHouse.js、src/pages/leaseContract/addPersonInfo.vue
- 所属项目：宿迁苏服办；来源会话：fc5779cf-f38b-4d8c-858e-292d91e559a9；代码基线：6996f66

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sfb_interface_unbound",
  "source_extraction_id": "27867a746efe4299a0f31f9b4c78b5d9",
  "version": 1,
  "memory_type": "entities"
}
-->