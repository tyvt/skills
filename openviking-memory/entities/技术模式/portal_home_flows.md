# 门户首页业务中心接口全量驱动
门户 B 端首页三块业务中心（商品房/存量房/住房租赁）在 `/portal/home/functions` 配置 `data.businessCenters` 时，以接口为唯一展示来源。

## 数据映射规则
- `fetchFunctions`/`mapFlowsFromApi` 直接映射标题、副标题、步骤名称、数量、图标与顺序
- 不再走 `mergeBusinessFlows → mergeFlowSteps` 用 `DEFAULT_BUSINESS_FLOWS` 覆盖文案或裁掉非默认步骤
- 接口空或异常时才回退 `DEFAULT_BUSINESS_FLOWS`

## 显隐与图标
- 显隐按权限：`listPerms` 的 `portal:bizSection:{functionCode}` 过滤
- 租赁板块兼容后端 `leaseBusiness` 编码，别名 `leaseBusiness → housingRental` 用于命中租赁橙主题
- 步骤图标：服务端 `functionIcon` 经 `resolveServerAssetUrl` 解析，缺省回退 `BIZ_ICON_BY_CODE`

## 维护注意
- 与早期「改 homeLayout 本地 defaults 即生效」方式相反，改菜单应优先改后端配置
- 验证证据：会话 f4b6f504 用户确认接口读取已配置，移除 merge 强制覆盖

## 涉及文件与归属
- zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/api/portal/home.js
- 所属项目：门户；来源会话 f4b6f504-0c81-40e8-a14a-fc8a60a930be；代码基线 fd73e47

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_home_flows",
  "source_extraction_id": "cabaf046dae94cc2ac7e371aef4ebe99",
  "version": 2,
  "memory_type": "entities"
}
-->