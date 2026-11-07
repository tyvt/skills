# flex 长文本挤掉右侧元素解法
园区物管2.0 顶栏标题很长时右侧昵称被推出屏幕外，因 flex 子项默认 min-width:auto 与 nowrap 组合撑死最小宽度。

## 问题根因
- flex 容器子项默认 min-width:auto（宽度不能小于内容最小宽度），标题 white-space:nowrap 被算成超长内容
- 左侧整块最小宽度被撑死，中间 flex:1 拿不到空间，右侧整组被挤出视口；嵌套多层 flex 每层都要处理

## 解决方案
- 给每层 flex 容器（.navbar、.top-nav-container 等）加 min-width:0 并配 overflow:hidden 打破最小宽度约束
- 标题用 flex:1 1 0% + min-width:0 + text-overflow:ellipsis 单行省略
- 不应收缩内容（logo、右侧操作区）显式 flex-shrink:0
- 昵称等可变长文案去掉固定 width，改 max-width: min(240px, 32vw) + 省略
- 这是所有「flex 长内容把兄弟元素顶飞」问题的通用解法

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 93662ada-0765-4626-a08c-941236de904d 中 Navbar.vue 长标题把右侧昵称顶出屏幕；结论为 min-width:auto + nowrap 根因，逐层 min-width:0 + ellipsis + flex-shrink 修复
- 涉及文件：src/layout/components/Navbar.vue
- 所属项目：园区物管2.0；来源会话ID：93662ada-0765-4626-a08c-941236de904d；代码基线：5a57bb20d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flex_ellipsis_pattern",
  "source_extraction_id": "8e90ed7f7e304631b0c6fbdcf7cbe027",
  "version": 1,
  "memory_type": "entities"
}
-->