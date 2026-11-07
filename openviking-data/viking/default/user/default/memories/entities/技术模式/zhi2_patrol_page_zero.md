# 巡检事项分页接口返回0排查
苏住房防汛C端 property 服务 `/v2.0/property/patrol/item/page` 联调始终返回 total=0。

## 问题现象
- 同 token、同服务下 `/complex/page` 返回8008条，而 `/patrol/item/page` 返回0
- `selectById` 也返回空对象，但库表有记录

## 已排除假设
- 权限通配 `*:*:*` 对任何权限码放行，非权限问题
- 多租户 `PLATFORM_TENANT_ID` 全库为空，非租户隔离
- 逻辑删除语义反转（默认 `the_state='0'` 有效，探针 `the_state='1'` 仍查不到）
- schema 指向错误（ZHISHU_PROPERTY 与 SERVICE_EXPAND 分别插样本均不生效）
- 表名大小写（达梦大小写敏感但自动转大写可命中）

## 可能根因
- 服务内部存在未公开多数据源切换逻辑，需查 Nacos `zhi2-property-dev.yml` 的 `schema=` 参数

## 验证与归属
- 会话时间 2026-11-03；涉及服务 zhi2-property-server(9604)、common-framework-server(9211)
- 临时权限菜单与样本数据已清理，SERVICE_EXPAND.T_PATROL_ITEM 原有11条未受影响


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_patrol_page_zero",
  "source_extraction_id": "096f9b6f7a22440cbc54f18550665e76",
  "version": 1,
  "memory_type": "entities"
}
-->