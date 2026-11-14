# 苏住房防汛C端移动查询H5
苏住房防汛C端移动查询H5（GitLab suzhufang-fe/zhi2-mobile-query-h5）是面向苏州住房防汛业务查询与办理的 uni-app Vue3 移动端项目，活跃开发分支为 dev。

## 仓库与协作
- 分支：master 落后 dev 131 提交；origin/main 与 dev 分叉（main 15 ahead / dev 133 ahead，306 文件差异），可基于 dev 向 origin/main 开 MR
- 与苏住房C（zhi2-mobile-shimin，D:\repository\苏住房C\zhi2-mobile-shimin）同源，由其提供接口与跳转；article/news/study API 在苏住房C测试网关可用，但本项目 dev 网关返回 404
- 项目负责人 Lead，负责任务分配与构建协调；按 AGENTS.md 在 worktree 分支提交推送后合并回 dev 并清理 worktree，功能分支命名示例 fix/login-design-align

## 技术栈与部署
- 用 `bun uni build -m test` 产出部署包，构建产物输出 dist；页面由 src/pages/data/ref-assets.ts 的 REF_MAIN_HTML 注入渲染，改该文件即改页面
- 模式感知数据服务：真实 API 失败时静默回退 demo 种子数据（保视觉回归），详情页用 item cache 继承真实标题/字段
- 测试：vitest 单元测试（2026-11-09 为 21 项通过）、视觉回归测试（playwright.visual.config.ts、tests/e2e/visual.spec.ts）
- 部署：nginx 站点 防汛C端.conf（D:\nginx\conf\sites-enabled\），root 指向项目 dist，监听端口 8095，本地访问 localhost:8095
- 接口或校验错误统一使用 toast，不使用内联错误横幅

## 页面与汛前检查接口
- 页面：登录页 pages/login（用户/机构 tab）、pages/login-design 验证码登录、pages/mine（接真实用户数据）、pages/index（后端 StudyPortalController article/study/portal）、数智页数据看板、pages/workbench 项目检查
- 手持端 src/stores/flood.ts 的 fetchTemplate 原调 /v2.0/safety/flood/event/page（后端 FloodEventServiceImpl.page 带 @DataScope 按部门过滤）
- B 端新增检查单走 /event/options（FloodEventServiceImpl.options 只返已备案且阶段匹配，不受部门权限）；阶段参数：汛前=2、汛中=3、汛后=4
- 禅道 Bug 6413（2026-11-10）：手持端原用 /event/page 致物业账号看不到市住建预警，后改同 B 端 /event/options
- 数智页区域顺序：全市数据、张家港市、常熟市、太仓市、昆山市、吴江区、吴中区、相城区、姑苏区、工业园区、高新区（共 11 项，按苏州行政区划补全）

## 近期改动
- 2026-11-09 构建部署截图确认；同日前首页/我的页参考苏住房C调通，8 路由零错误、mine 页视觉回归像素级不变
- 2026-11-09 数智页补全原先被「…」折叠隐藏的区；<main> 上内边距由 pt-16 改为 pt-4 消除顶部留白；末尾「…」省略按钮保留，是否删除待用户确认
- 2026-11-11 提交 e7e0b61「feat(data): 数智页按最新设计稿重构,实现全部tab切换与图表」推 origin/dev（7089065..e7e0b61）
- 该提交变更 src/pages/data/index.vue（响应式多态渲染 + tab 切换）、src/pages/data/ref-assets.ts（各 tab 态片段 + 补全 utility）、tests/e2e/shuzhi-visual.spec.ts（新设计基准 + tab 切换断言）；public/version.json 为未跟踪构建产物未纳入
- 来源会话：2026-11-11 合并回主分支提交推送任务；2026-11-09 登录用户信息修复与功能调通任务

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_mobile_query_h5",
  "source_extraction_id": "7ae04454831046bcb82f87ff183e0cf8",
  "source_extraction_ids": [
    "2a8ed897250744a78c48e7a2d2b6732c",
    "fb9a280de88b443990d021a854993dba"
  ],
  "version": 4,
  "memory_type": "entities"
}
-->