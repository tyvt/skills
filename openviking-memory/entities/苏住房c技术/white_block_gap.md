# 两个白色区块加10px间距的稳定做法
移动端表单页提示语与表单间留10px且灰底铺满整屏，在苏住房C多个SFC因结构包裹层与高度未撑满而失效。

## 问题根因
- 两个 .card 之间夹着 uni-forms 包裹层，.card + .card 相邻兄弟选择器命中不了，写了间距不生效。
- 页面容器没撑满视口，白色块之外是默认底色而非目标灰底 #f4f5f7，10px 间隙看不到灰。
- 只给区块加 margin-top 而父级是整块圆角卡片时，会在卡片内部留空白把样式撑错位。

## 解决方案
- 不依赖兄弟选择器，直接给锚定块（通常是上一个白色块）设 margin-bottom:10px。
- 非 scoped 样式块写 page{height:100%}，容器 .container 设 min-height:100% 让灰底铺满，与同目录 TypeChoose.vue、FormManual.vue 既有写法一致。
- 若某字段单独加间距后所在分组变「半截卡片」，就把该字段改成独立圆角卡片避免中间留空错位。

## 验证与归属
- 验证证据：会话 fa080114（基线 9cdf7b8）FormLocal.vue 因 .card+.card 被 uni-forms 隔开失效，改第一个区块 margin-bottom 并加 page/container 高度撑满；会话 dc600b95（基线 8fc3cc5）intention/add.vue 两处10px并把手机号改独立圆角卡片。
- 涉及文件：d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_my\verification\FormLocal.vue、d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_my\verification\TypeChoose.vue、d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_transaction\intention\add.vue
- 所属项目：苏住房C；来源会话ID：fa080114-764a-417c-9755-a4295d80e743, dc600b95-4ec1-4576-a1ed-8a5607eda4a7；代码基线：9cdf7b8 / 8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "white_block_gap",
  "source_extraction_id": "2df5dc51c76245cd8e19edc921ee51af",
  "version": 1,
  "memory_type": "entities"
}
-->