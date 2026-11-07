# 苏住房防汛C端
苏州市住房防汛C端移动H5项目（uni-app/Vue），对应"苏州市服务监管平台"物业手持端。

## 项目定位
- 移动端H5，技术栈 uni-app（Vue），承载苏州住房防汛与物业监管业务
- 品牌名"苏州市服务监管平台"，主色品牌蓝 rgb(0,79,208)
- 参考原型站：http://localhost:8443/（Figma Make 原型）；本地预览 http://127.0.0.1:8095/（nginx 指向 dist）

## 页面结构
- 登录页：字段为 手机号码 / 身份证号后四位 / 验证码(+获取验证码) / 图形验证码，含"密码登录"切换，按设计图重做
- 底部导航：工作台 / 住房服务 / 首页 / 数智 / 个人中心（共5项）
- 工作台侧栏 tab：项目检查 / 防台防汛（默认项目检查），原"综合查询"tab 已按参考站移除
- 数智页：数据看板（区域pill、关键指标彩卡、公共收益、报事报修环形图、标准化评价、双晒公示排名表），由"建设中"占位复刻为完整看板

## 工程约定
- 本地开发用 worktree 基于 dev 分支；构建后 dist 由 nginx 托管到 8095
- 视觉回归：playwright.visual.config.ts + tests/e2e/visual.spec.ts 对 8095 做截图与几何断言
- 2026-11-06 Lead 明确要求防汛相关模块 UI 按 localhost:8443 参考站 100% 还原，并需 e2e 测试验证还原度 100%
- 参考站各 tab 页需 100% 像素对齐，页头高 56px，各页首元素间距已统一（home 8 / workbench 18 / housing 28 / systems 12 / data 12）

<!-- MEMORY_FIELDS
{
  "category": "前端项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "d3f319ff31a8447b9ad240803cec9013",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->