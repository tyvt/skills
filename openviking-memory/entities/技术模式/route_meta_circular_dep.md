# route_meta_circular_dep
苏房页面标题/返回路径公共逻辑须收进纯函数模块 routeMeta.js，store 与 utils 不得反向依赖 ruoyi（循环依赖 + 静默 undefined）。

## 场景与坑
- 整改通知书需统一页签标题与返回目标，多处（tagsView store ADD_VISITED_VIEW、ListOperationButtonContainer 列表标题、OperationBtnGroup/main.js goBack）按同一口径判断当前路由是否为列表/详情页。
- 若把判定写在 utils/sidebarActivePath.js 会引依赖环：它 import @/utils/ruoyi，ruoyi.js 又 import router 与 store；tagsView.js 是 store 模块被 store/index.js 聚合，形成 router→store→tagsView→sidebarActivePath→ruoyi→router/store 环，初始化顺序不对时导出 undefined 或偶发白屏。
- 无用 import（sidebarActivePath.js 早期 import router 却没用）加重环。

## 解法
- 拆两层：routeMeta.js 只 import constants，导出 isXxxDetailRoute/isXxxListRoute/getXxxPageTitle 纯函数供 store 与公共组件；sidebarActivePath.js 保留需查路由表的路径解析（getXxxUnifiedListPath/getSidebarActivePath/getBackPathFromRoute），由 layout 与按钮组件按需引用，可 re-export routeMeta 但内部实现必须落在 routeMeta。
- 判定函数内部克制：列表路由 filePath 用严格相等而非 startsWith，否则未来 index1 同级页误判为列表页，标题/返回/高亮三条逻辑一起错。

## 验证与涉及
- 验证：会话 a19337fd HIGH 审查结论 tagsView.js 顶层 import sidebarActivePath 导致环；filePath.startsWith 过宽、未用 router 导入加剧依赖。仓库实现：tagsView.js 只引 @/views/evaluation/rectificationNotice/routeMeta，sidebarActivePath.js 保留 ruoyi 依赖并 re-export；routeMeta.js 用 filePath === RECTIFICATION_NOTICE_LIST_FILE_PATH 严格相等 + 路径正则双判定。
- 涉及文件：zhi2-web-admin/src/views/evaluation/rectificationNotice/routeMeta.js、zhi2-web-admin/src/views/evaluation/rectificationNotice/constants.js、zhi2-web-admin/src/utils/sidebarActivePath.js、zhi2-web-admin/src/store/modules/tagsView.js、zhi2-web-admin/src/components/ListOperationButtonContainer/index.vue
- 所属项目：苏住房G；来源会话：a19337fd-e97d-478d-a10f-deee6d572a15；代码基线：315702f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "route_meta_circular_dep",
  "source_extraction_id": "3a85eaede4c4445db42f39130147b4c2",
  "version": 1,
  "memory_type": "entities"
}
-->