# Summary
在苏住房G项目 zhi2-web-admin/src/views/system/regionBankAuth 的 type-left-tree（来源会话 042a2ba8，基线 864b409）发现：要求街道节点（最末级、无子节点）向右缩进一格，原用 display:none 隐藏 .el-tree-node__expand-icon 整块，因 el-tree 层级缩进靠图标盒子占位，去掉后该层文字左移、与上级同级。修复：对该层级写 `display: inline-block !important; visibility: hidden !important;` 保留占位仅隐藏图标内容，宽度仍由图标盒子提供，文字自然多缩进一格，无需补 padding（补 padding-left 会挤歪箭头列）。排查口径：el-tree 某层对齐不对先确认该层是否无 children，仅末级需此处理。
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】pattern
【标题】只控制 el-tree 某一层级「隐藏展开图标」时，去掉图标的盒子会让该层文字左移一格
【内容】场景：左侧行政区划树（如 `views/system/regionBankAuth` 的 `.type-left-tree`）要求「街道节点再往右缩进一格」。原因是街道是最末级、没有子节点，模板里用 `display: none` 把 `.el-tree-node__expand-icon` 整块去掉，Element el-tree 的层级缩进正是靠这个图标盒子占位，去掉后该层文字直接左移，末级与上级在视觉上变成同一缩进，层级感消失。

正确做法是保留占位、只隐藏图标内容：对该层级的 `.el-tree-node__content > .el-tree-node__expand-icon` 写 `display: inline-block !important; visibility: hidden !important;`，宽度仍由图标盒子提供，文字自然比区级多缩进一格，不需要再补 padding（补 `padding-left` 会把箭头列一起挤歪，只在实测仍不够时才加）。

排查口径：遇到 el-tree「某一层对齐/缩进不对」，先确认该层节点是否真的没有 children；末级节点才需要这条「visibility 代替 display」的处理，带子节点的层正常用 display:none 不会错位。
【验证证据】会话 042a2ba8（baseline 864b409）：用户「这个可以往右缩进一格吗」；结论指出原因是街道为最末级、用 display:none 隐藏展开箭头后「箭头占位被去掉，文字会向左靠，层级不明显」，改为保留箭头占位、仅隐藏图标（display:inline-block + visibility:hidden）。
【涉及文件】zhi2-web-admin/src/views/system/regionBankAuth/index.vue
【所属项目】苏住房G
【来源会话ID】042a2ba8-8758-4813-bbd4-08a792c81b3c
【代码基线】864b409

<!-- MEMORY_FIELDS
{
  "event_name": "el-tree末级节点缩进错位处理",
  "goal": "记录样式修复",
  "summary": "在苏住房G项目 zhi2-web-admin/src/views/system/regionBankAuth 的 type-left-tree（来源会话 042a2ba8，基线 864b409）发现：要求街道节点（最末级、无子节点）向右缩进一格，原用 display:none 隐藏 .el-tree-node__expand-icon 整块，因 el-tree 层级缩进靠图标盒子占位，去掉后该层文字左移、与上级同级。修复：对该层级写 `display: inline-block !important; visibility: hidden !important;` 保留占位仅隐藏图标内容，宽度仍由图标盒子提供，文字自然多缩进一格，无需补 padding（补 padding-left 会挤歪箭头列）。排查口径：el-tree 某层对齐不对先确认该层是否无 children，仅末级需此处理。",
  "ranges": "14-20",
  "source_extraction_id": "2a7334fed6014e91901087ed347ef172",
  "version": 1,
  "memory_type": "events"
}
-->