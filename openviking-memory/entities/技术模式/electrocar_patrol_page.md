# 巡查记录页（电动车管理）
防台防汛 > 电动车管理下的巡查记录页，路由 `#/safety/electricar/patrol`，页面文件为 `src/views/electrocar/patrol/index.vue`（模块目录实为 electrocar，不是 electricar）。

## 按钮权限配置
- 顶部「新增」「批量删除」已绑定权限字符 `electrocar:patrol:add` / `electrocar:patrol:delete`（模板 L23/L31）
- 权限字符由 `permsMixins.js` 按 `moduleName:businessName:action` 规则拼接
- 操作列「编辑」「删除」在巡查记录页写死 `permission: true`（L157/L164），属绕过权限校验
- 同类页 `electrocar/hazard/index.vue`（隐患处置）改用 mixin 的 `editButton` / `deleteButton`

## 权限校验链路
- 校验链：`:permission` → `zs-button` → `checkPermission` → `hasPermission`（permission.js:23-28）
- 超管带 `*:*:*` 时必定通过权限字符校验，不会被权限码挡住
- 权限不足时控制台会打印 `[权限不足]` 警告

## 端别门控历史
- 两个按钮曾带 `v-if="canManagePatrol"`，`canManagePatrol = isBTerminalUser(...)`，仅 B 端物业账号可见
- 超管若为 G 端或无 `terminalType`，按钮被整段隐藏，与权限码无关
- 该门控已在提交 `527247a41`（2026-11-23 10:08）删除，当前模板 L19–L36 已无任何 v-if
- 同页 `detail.vue` 的 `canManagePatrol` 也改为 `!this.isView`，只看查看态、不再看端别

## 后续排查方向
- 页面仍看不到按钮时，先确认部署包是否为 11-23 门控删除之前的旧版本
- 再核对超管账号 permissions 是否既无 `*:*:*`、也未分配 `electrocar:patrol:add` / `:delete`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "electrocar_patrol_page",
  "source_extraction_id": "826fdfb6ec094a1b8e2f625bed9a211e",
  "version": 1,
  "memory_type": "entities"
}
-->