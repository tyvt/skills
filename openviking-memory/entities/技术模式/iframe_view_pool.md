# 智能问答iframe切页签强制刷新修复
无锡市区G项目中，智能问答（iframe容器页）在答案生成中切页签再切回，页面强制刷新、内容丢失。

## 问题根因
- `AppMain.vue` 使用 `<router-view :key="$route.fullPath" />` 且全项目无 keep-alive
- 切页签即销毁 InnerLink 组件 → iframe 从 DOM 移除（流式请求中断）
- 切回时 iframe 整页重载；iframe 不能用 keep-alive 修（DOM 摘下再挂回必然重载）

## 解决方案
- 采用 RuoYi 式 **iframe 视图池**方案：常驻渲染所有已打开 InnerLink 页签
- 新建 `src/utils/innerLink.js`：池准入判定 `isInnerLinkRoute()` + src 拼接 `buildInnerLinkSrc()`（保留 token/deptId 与 `#` 哈希处理）
- 新建 `src/layout/components/iframeToggle/index.vue`：iframe 池 v-for 常驻渲染所有已打开 InnerLink 页签
- 新建 `src/layout/components/iframeToggle/InnerLinkFrame.vue`
- 共改动 9 个文件，约 165 行

## 验证与归属
- 所属项目：无锡市区G
- 来源会话：2a5bfa8e-2977-4228-8985-a83a230944d2
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "iframe_view_pool",
  "source_extraction_id": "2f6469fe1cbc4dcbb44647f0742c2751",
  "version": 1,
  "memory_type": "entities"
}
-->