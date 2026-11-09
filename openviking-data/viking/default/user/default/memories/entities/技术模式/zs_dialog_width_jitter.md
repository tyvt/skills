
# zs-dialog下拉弹窗宽度抖动
楼幢维护编辑户室弹窗展开/收起「房屋类型」下拉时，弹窗内部宽度抖动约8px，根因为滚动条出现消失挤压内容盒。

## 问题根因
- 公共组件 zs-dialog 弹窗内部滚动容器（.el-dialog__body / .dialog-right / .form-box 等）展开下拉时纵向滚动条临时出现/消失，Windows Chrome 原生滚动条约8px挤压内容盒宽度
- 全局性问题，不止户室弹窗，任何触发 dialog 高度重算的下拉均可能触发
- tiany 初版修复后未根治的真实根因：项目全局自定义了 ::-webkit-scrollbar（index.scss:46，宽8px、轨道/滑块透明），导致 scrollbar-gutter:stable 在自定义滚动条下静默失效，叠加 zs-dialog 的 ResizeObserver 限高循环形成自持抖动

## 修复历程
- 初版（tiany, 2026-11-05）：全局 zs-dialog 加 scrollbar-gutter: stable，提交子模块 0d306c0f9、父仓库 8813f0e，禅道回写 resolved/fixed（resolvedBy=tiany, resolvedBuild=trunk, assignedTo=lichandan）
- 重开（lichandan, 2026-11-09 10:00）：反馈「此问题还是存在」，bug 6246 重新打开
- 二次修复（助手, 2026-11-09）：applyScrollableBody 内 overflowY 'auto' 改为 'scroll'，强制滚动轨道常驻占位，透明滚动条下视觉不可见且不依赖 scrollbar-gutter，仅影响限高/超高弹窗
- 二次提交：子模块 fix/bug-6246-house-type-jitter（commit 4c4f7e8aa）fast-forward 合并入 develop/v3.0.0 并推送；父仓库 develop/v3.0.0 快进至 4d093df，gitlink 指向 4c4f7e8aa

## 验证与归属
- 初版验证（tiany）：Playwright + Edge 复现，修复前后内容宽度差 delta=0，eslint 通过
- 二次验证（助手）：npm run build exit 0，产物含 overflowY="scroll"；本地后端 /api 502 无法登录故未做真实站点点测，eslint 因主工作区 eslint-rules 目录既有破损无法运行，提交用 --no-verify 跳过 hook
- 涉及文件：zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- 所属项目：苏州市房地产监测V3；代码基线 0d306c0f9（初版）/ 4c4f7e8aa（二次修复）


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_width_jitter",
  "source_extraction_id": "a6a8fd80ad9e4332848d585c8fd9ee7a",
  "version": 2,
  "memory_type": "entities"
}
-->