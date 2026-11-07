# 微信preloadRule合并体积超限80058
苏住房C市民端小程序因单条preloadRule的packages合计体积超2MB触发错误码80058，导致目标分包资源未下发而白屏。

## 问题现象
- 安卓从个人中心→电子业主卡→投票表决→参与决策进入后白屏、图片不显示、按钮点不动，不能100%复现，iPhone正常
- 报错 Error: 系统错误，错误码：80058，preloadRule source size 2662KB exceed max limit 2MB

## 根因
- 微信对单条preloadRule的packages合计体积限制2MB（2048KB），pages/index/project配置了packages:["pages_tab","pages_transaction"]，编译后合计约2686KB超限
- 超限后该预加载规则整体失效，表现像分包路由问题而非配置错误，仅在安卓冷启动低端机明显

## 解决方案
- 看到白屏+图片不显示+点击无响应且仅安卓复现时，先搜80058而非查页面代码
- 删除超限preloadRule或仅保留一个轻量分包；大分包pages_transaction不要合并预加载，改为首次进入按需加载
- 已预加载过的分包（如pages_tab）无需重复配置；修复后复查其他preloadRule是否接近上限

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话4a12fc00（基线f1939b0）用户报白屏贴出80058，修复为删除pages/index/project预加载规则
- 涉及文件：src/pages.json、src/utils/menuNav.js、src/pages/redirect/index.vue、src/pages_owner/ownerCard/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：4a12fc00-b2b5-4a2f-9855-3ac716f228d9；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "preload_rule_2mb",
  "source_extraction_id": "1d9fd369a2874e6797cb9e988e9c0653",
  "version": 1,
  "memory_type": "entities"
}
-->