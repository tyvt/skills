
# 苏住房防汛C端
苏住房防汛C端移动查询H5项目，基于 uni-app Vue3 的 C 端移动网页，包含数智页面等模块。

## Description
- 项目为 uni-app Vue3 H5 移动查询应用，主工作区 dev 分支，构建产物部署至 nginx 8095 站点（root 指向主工作区 dist）
- 工作区路径含 D:\repository\苏住房防汛C端（worktree 曾用 D:\repository\苏住房防汛C端-wt-shuzhi）
- 页面路由含 src/pages/data/ 数智页面，参考本地 HTML 静态稿重新实现

## Tech Notes
- 数智页面通过注入参考页运行时导出的 DOM 与 Tailwind CSS 实现同源还原，字体在 index.html 静态声明
- 已知技术坑：uni-app 根字号 16.64px 需强制 16px、Material Symbols 图标字号易被覆盖、Vue ref 在 uni-app 自定义元素不绑定需改用 getElementById
- E2E 视觉测试使用 Playwright，配置 playwright.shuzhi.config.ts 与 shuzhi-visual.spec.ts，npm script 为 test:e2e:shuzhi
- typecheck 存在既有错误 Ref8443Inspection.vue 的 InspectionType，与数智页改动无关

## Relations
- 负责人为 Lead（peer_id: gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited），任务分配与构建协调由其负责
- 与苏住房C（zhi2_mobile_shimin）为不同项目，但同属苏住房系列


<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "苏住房防汛C端",
  "source_extraction_id": "683a7724a08d47f09d03c984a5111d0c",
  "version": 1,
  "memory_type": "entities"
}
-->