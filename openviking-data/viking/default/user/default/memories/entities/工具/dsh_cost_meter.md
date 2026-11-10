# dsh-cost-meter
DSH 的 token 成本计量工具，源码阈值已为 10k。

## 实现
- 源码位于 dsh 仓库，安装副本位于 profiles\web\node_modules\dsh-cost-meter\lib\index.js
- 2026-11-10 发现安装副本仍为 15k 导致提醒误报 >15k，已用源码覆盖为 10k

## 注意事项
- 修改后需重启 web 才能对新会话生效（运行中 web 不生效）
- 核验标志为 `?? 10_000`

## 关联
- 与 token_optimizer 技能同源成本数据


<!-- MEMORY_FIELDS
{
  "category": "工具",
  "name": "dsh_cost_meter",
  "source_extraction_id": "c90ece93bbe24ec7a37656fc59cb0ff1",
  "version": 1,
  "memory_type": "entities"
}
-->