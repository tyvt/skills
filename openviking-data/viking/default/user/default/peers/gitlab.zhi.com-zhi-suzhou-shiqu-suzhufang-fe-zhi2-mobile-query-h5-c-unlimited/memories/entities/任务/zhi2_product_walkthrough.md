# zhi2 管理端APP产品走查修复
zhi2-mobile-query-h5-c 管理端APP「产品走查」sheet 第 2-15 行共 14 条 bug 已全部修复，覆盖首页、个人中心、工作台、物业检查、区县检查、防汛检查六个模块。

## 任务范围与组织
- 需求：修复「管理端APP-产品走查」sheet 第 2-15 行 14 条 bug，涉及 14 个文件。
- 按文件不重叠分三组并行：A 组 UI 文案（首页/个人中心/门户）、B 组发起与表单（start/form/flood）、C 组详情与整改（records/detail/rectify），Lead 统一补类型与跨组项。
- 第 10 行签字板点击无反应原表已注明「浏览器切移动端即可」，未改代码。

## 关键根因与修复
- 首页通知去手写图标、详情去「发布单位」；banner 改 2 张默认渐变图轮播且不跳转。
- 个人中心名称统一「我的」并移除「个人设置」；工作台入口改显示应用名称（setNavigationBarTitle）并放大搜索图标。
- 行政区划改四级级联 picker；物业管理区域下拉改聚焦加载+防抖搜索；仅街镇(checkType='2')展示检查信息与检查频次/异常情况。
- 整改保存字段 rectifyDeadline 改 replyTime 对齐后端，空反馈项过滤后可只存整体反馈；防汛选项新增 parseFillOptions 优先 JSON.parse，避免 `["有`/`"无"]` 被拆字。
- 区县检查企业名加 pickCompanyName 兜底、图片 resolveAssetUrl 补相对路径；查看整改通知书改直接打开 PDF。

## 交付与验证
- 构建 npm run build（demo）通过；vue-tsc 26 个错误均为预存（store/user.ts、utils/index.ts、utils/watermark.ts），本次 14 文件零新增。
- 改动 14 个文件均未提交 git，等待用户决定提交/推送。
- 遗留：PDF 用 window.open 打开不带鉴权头，若后端强制鉴权需调整；行政区划街道/社区依赖后端 region/list 真实数据。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "任务",
  "name": "zhi2_product_walkthrough",
  "source_extraction_id": "e11b65cc3a0546ff94a8dd391196f8c5",
  "version": 1,
  "memory_type": "entities"
}
-->