# ZsImage图片高度塌成0的双重条件
苏住房C移动端ZsImage组件因外层盒子无固定高度且页面scoped样式穿不透内部img，导致图片高度计算为0只显示占位框。

## 问题现象
- 部分图示/图标整块不显示（如我的房屋→未查询到房屋的三张图示、电子业主卡入口图标）
- 图片文件存在、路径正确，属纯CSS问题，易被误判成「图片资源缺失/路径错」

## 根因
- ZsImage内部真实img写height:100%，高度依赖外层盒子
- 外层.img-box无固定高度，页面.img-box .img是scoped样式无法穿透子组件内部img，img计算高度0

## 解决方案
- 先确认文件真实存在再查样式链；用:deep(.img){height:auto}穿透子组件让图片按原比例撑开
- 若伴路径问题显式给ZsImage传subpackage指定分包，与同目录正常页面写法对齐
- errorTip/errorTipOne/errorTipTwo同目录同类页面一并改，避免漏改

## 验证与归属
- 验证：会话293e9168用户反馈图标不显示附截图，agent定位ZsImage内部height:100%加.img-box无高度加scoped无法穿透，三处加:deep(.img){height:auto}并补subpackage
- 涉及文件：src/pages_transaction/publishHouse/errorTipOne.vue、errorTipTwo.vue、src/components/ZsImage/ZsImage.vue
- 所属项目：苏住房C；来源会话ID：293e9168-99d3-401f-9f8a-68fd6f4853a1；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zsimage_height_zero",
  "source_extraction_id": "1783407079064bbfa35c5b8e02609550",
  "version": 1,
  "memory_type": "entities"
}
-->