# 苏住房防汛C端移动查询H5
苏州住房防汛业务查询与办理的 uni-app Vue3 移动端项目（GitLab suzhufang-fe/zhi2-mobile-query-h5），活跃分支 dev。

## 仓库与协作
- 分支：master 落后 dev 131 提交；origin/main 与 dev 分叉（main 15 ahead、dev 133 ahead，差 306 文件），可基于 dev 向 origin/main 开 MR
- 同源于苏住房C（zhi2-mobile-shimin，D:\repository\苏住房C\zhi2-mobile-shimin），接口与跳转由其提供；article/news/study API 在苏住房C测试网关可用，本项目 dev 网关返回 404
- Lead 负责任务分配与构建协调；按 AGENTS.md 在 worktree 分支提交推送后合并回 dev 并清理 worktree，分支命名示例 fix/login-design-align

## 技术栈与部署
- 构建 `bun uni build -m test` 输出 dist；页面由 src/pages/data/ref-assets.ts 的 REF_MAIN_HTML 注入渲染，改该文件即改页面
- 真实 API 失败静默回退 demo 种子数据（保视觉回归），详情页用 item cache 继承真实标题/字段
- 测试：vitest 单元测试（2026-11-09 共 21 项通过）、视觉回归（playwright.visual.config.ts、tests/e2e/visual.spec.ts）
- 部署：nginx 站点 防汛C端.conf（D:\nginx\conf\sites-enabled/），root 指向项目 dist、监听 8095；接口或校验错误统一 toast，不用内联错误横幅

## 页面与接口
- 页面：pages/login（用户/机构 tab）、pages/login-design 验证码登录、pages/mine（接真实用户数据）、pages/index（后端 StudyPortalController article/study/portal）、pages/workbench 项目检查
- 数智页面实现细节见「数智页静态稿还原」；汛期阶段筛选弹窗与工单列表参数透传见「汛期阶段筛选弹窗与工单列表联动」

## 近期改动
- 2026-11-09 构建、部署并截图确认；首页/我的页参考苏住房C调通，8 路由零错误、mine 页视觉回归像素级不变
- 2026-11-11 提交 e7e0b61 推 origin/dev（7089065..e7e0b61）；public/version.json 为未跟踪构建产物、未纳入
- 来源会话：2026-11-09 登录用户信息修复与功能调通；2026-11-11 合并回主分支提交推送

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_mobile_query_h5",
  "source_extraction_id": "e6c9ece10ec04cda8e07002c71bf1e98",
  "source_extraction_ids": [
    "2a8ed897250744a78c48e7a2d2b6732c",
    "fb9a280de88b443990d021a854993dba"
  ],
  "version": 14,
  "memory_type": "entities"
}
-->