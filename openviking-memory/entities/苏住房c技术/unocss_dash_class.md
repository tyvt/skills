# 苏住房C UnoCSS 水平内边距短横线类名
苏住房C 移动端 UnoCSS 水平内边距需用短横线分段写法 `p-x-32`，写错为 `px-32` 不报错但静默不生效。

## 现象与根因
- 「两智一全」等列表页给列表项写 `px-32` 想留 32rpx，实际图片贴屏幕左边，搜索栏区域正常
- 根因：项目 UnoCSS preset 里水平内边距类名是 `p-x-32`（见 uno.config.ts），`px-32` 不匹配任何规则，类名原样留元素上但无 CSS
- 编译不报错、控制台不警告，只能靠肉眼看布局异常；uni-app 生态与 Tailwind 习惯多为 `px-4` 连写，易从别处抄错

## 解决方案
- 改 `px-32` → `p-x-32` 即恢复左右各 32rpx，与搜索栏对齐；垂直方向对应 `p-y-*`
- 新增或复刻页面先打开 uno.config.ts 确认 padding/margin 命名规则，全项目统一
- 发现「某间距类完全没效果、但元素结构与其他页一致」时，第一反应核对类名拼写规则，而非加 !important 或改父容器 padding

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：用户反馈列表图片太贴边；goodProject/index.vue 改 px-32 为 p-x-32 后列表左右留 32rpx 与搜索栏一致
- 涉及文件：uno.config.ts、pages_transaction/goodProject/index.vue、pages_transaction/newHouse/index.vue
- 所属项目：苏住房C；来源会话ID：f0a63c2c-8cc1-48d5-b969-3d5c734700b9；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "unocss_dash_class",
  "source_extraction_id": "822c31f3d8f34cd88bf5d0b804a2c0f8",
  "version": 1,
  "memory_type": "entities"
}
-->