# 苏住房G
苏住房G 是一个前端 Web 管理后台代码仓库（zhi2-web-admin）。

## Description
- 仓库路径为 `d:\repository\苏住房G\zhi2-web-admin`
- 包含企业（company）相关 6 个页面，位于 `src/views/company/` 下
- 前端路由由后端菜单动态注册，文件路径即路由路径（如 `company/companyManagement/property`）

## Architecture
- 列表/详情通过 mixin（`src/mixins/table.js`）拼接 REST 路径：`/${moduleName}/${businessName}/${apiSuffix}`
- 无独立 `src/api/company/*.js` 接口定义文件
- 业务状态字典来自全局 store（`main.js` 注入 `bizStateOptions`）
- 列表 `bizState` 列使用 tag 渲染

## Key Components
- 费用申报批量导入组件 `src/views/property/feeDeclare2/components/bulkImportDialog.vue` 的导入参数含必填 `feeMode`
- `src/utils/request.js` 的 401 拦截逻辑含 `isLoggingOut` 标志，主动退出时抑制过期弹窗
- `src/utils/resolveServerAssetUrl.js` 提供按当前页面地址解析的资源 URL 方法，适配子路径部署
- `src/views/publicQuery/monthlyReport/index.vue` 的「是否提交」列使用 `dictUrl: 'monthly_report_submitted'`
- 求援工单模块：`src/api/flood/index.js:251` 的 `getRescue(rescueId)` 请求 `GET /safety/flood/rescue/{rescueId}`，列表/详情全链路只用数字主键 `rescueId`，`rescueNo` 仅作编号展示列

## Relations
- 涉及模块：物业服务企业等公司管理模块

## 维修资金代码迁移
- 维修资金前端当前为补缺迁移而非整包对齐园区：已迁入园区有而苏住房无的约 19 个子目录及对应 API/组件/工具，构建已过
- 同名路径 diff 约 501 处不一致（如 accountOpen、accountQuery、accountCancel）；园区仍有至少 7 个文件苏住房暂无（PrintDialog、VoteTip、RefundInterestDialog 等）；苏住房独有 accRefund、wxjjBO、planDecision 不应被园区覆盖
- 2026-11-25 用户决定对 maintenance 目录做园区全量覆盖；执行中发现全量覆盖园区 ruoyi.js 会冲掉苏住房侧工具，已恢复苏住房 ruoyi.js 并仅合并园区维修资金所需导出
- 若要维修资金等于园区 V2 最新，可全量覆盖 src/views/maintenance（会冲击苏住房定制）或按菜单清单逐模块替换同名目录并回归

## 菜单与 DBX
- 菜单存于库表 COMMON_FRAMEWORK.SYS_MENU（关联 SYS_PROJECT_MENU、SYS_ROLE_MENU），可用 DBX 做库表迁移
- 苏住房 dev（DBX「苏住房dev」）根菜单「维修资金」MENU_ID=10000311，整棵子树约 134 条，PATH/COMPONENT 含 maintenance 约 55 条
- 苏住房 dev 按 gbDeposit 查菜单/组件为 0 条，新迁入的国补/资金屏页面很可能尚无菜单入口
- 园区侧网关为 unlimited.g.h5.admin.web.v2.benefit.yuanqu.suzhou.dev.zhi.com（项目「园区公共收益」）；当前 DBX 连接列表无「园区公共收益」Dameng，无法在会话内直接 SELECT 园区菜单
- 迁移流程：先加园区 dev/test 的 COMMON_FRAMEWORK 连接或导出 SYS_MENU，按 COMPONENT 对齐迁入路径，在 dev/演示做 MERGE/INSERT 并处理 MENU_ID/PARENT_ID/PERMS/BUS_CODE，同步 SYS_PROJECT_MENU 与 SYS_ROLE_MENU；写库前备份并确认目标环境（dev/test/uat）

<!-- MEMORY_FIELDS
{
  "category": "软件项目",
  "name": "苏住房G",
  "source_extraction_id": "1ec6dc92632b4adbb003e7a38a4ff93e",
  "version": 4,
  "memory_type": "entities"
}
-->