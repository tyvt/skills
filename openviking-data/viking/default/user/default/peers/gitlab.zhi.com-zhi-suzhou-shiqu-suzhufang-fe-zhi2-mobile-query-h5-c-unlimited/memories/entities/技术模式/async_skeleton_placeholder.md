# H5 异步数据区域骨架占位改造
苏住房防汛C端移动查询H5 改造中，只在异步数据单元内放骨架占位，保留静态控件与原有分页行为。

## 落点范围
- 检查模板、检查记录详情、整改详情、门户设置资料等异步数据区域补骨架占位
- project-check 记录页由 z-paging 管理分页加载，候选列表与统计卡都是接口数据，占位放在这些异步单元内
- page-query 的动态统计与查询列表是改造重点

## 边界
- 搜索、筛选、发起检查等静态控件保持原样，不把表单或静态框架整体替换成占位
- 登录页和入口菜单属静态界面，不加骨架
- 已有加载/空态的 z-paging 列表保留原有分页行为与搜索交互

## 验证与归属
- 所属项目：苏住房防汛C端移动查询H5（peer: gitlab.zhi.com-...-mobile-query-h5-c-unlimited）
- 实施日期：2026-11-15，前提为按已审核计划实施；H5 基线构建通过（21 秒，退出码 0）

## 落地与复核结果（2026-11-15）
- 覆盖门户与首页、数智统计、查询列表、检查记录与详情、模板表单；接口数据区与异步图片均显示骨架，静态标题、筛选控件、菜单与表格结构保持可见。
- 异步图片含资料设置页头像、检查详情照片、签字图与整改附件：加载中显示同尺寸骨架，加载失败切换本地占位图。
- 新增独立包装组件 `SkeletonImage.vue`，路径 `D:/repository/苏住房防汛C端/src/components/SkeletonImage.vue`。
- 请求竞态由当前有效请求控制，页面卸载会作废旧请求。
- 验证：`npm run build:h5` 与 `git diff --check` 通过；`npm run typecheck` 仅失败于未改动的 `src/store/user.ts`、`src/utils/index.ts`、`src/utils/watermark.ts`。
- 未运行 Playwright：E2E 用例会向真实后端提交巡检记录；改动保留在工作区，未提交、未推送。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "async_skeleton_placeholder",
  "source_extraction_id": "f1f982dc60c8406ea75a62d865257726",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->