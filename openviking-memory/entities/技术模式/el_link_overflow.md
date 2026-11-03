# el-link 文件名压住删除按钮修复
上传文件列表长文件名把右侧删除按钮压住，通过图标与文件名拆节点 + flex 布局解决。

## 问题根因
- 情况：上传后文件列表长文件名（如 cd6dd466-ce5e-...）把右侧「删除」按钮整块压住，用户描述样式错乱、文件名遮挡。
- 根因：① el-link 是 inline 元素，作为 flex 容器不参与宽度收缩，长文本撑开外层溢出到相邻按钮；② 图标与文件名同 span，文本溢出省略号失效无法分配宽度。

## 解决方案
- 图标与文件名拆两节点（<i class="el-icon-document" /> + <span class="file-name-text">）；el-link 内部改 flex 布局，文件名区 flex:1; min-width:0 并单行省略。
- 「删除」按钮 flex-shrink:0 保证完整，必要时加 margin-left；min-width:0 是关键缺了不收缩。
- 适用面：凡「图标+长文本+尾部操作按钮」单行卡片（文件列表、附件项、标签行）都按此骨架写。

## 验证与归属
- 验证证据：会话 614f10e0（基线 864b409）区域银行授权与 pubRegulatoryAccount 详情页样式错乱，修复后长文件名省略不遮挡删除。
- 涉及文件：zhi2-web-admin/src/components/FileUpload/index.vue；zhi2-web-admin/src/views/system/regionBankAuth/detail.vue；zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue
- 所属项目：苏住房G；来源会话ID：614f10e0-c3d4-4701-9abf-9cf9b6f48dc6；代码基线：864b409

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_link_overflow",
  "source_extraction_id": "e592ee3a3b1f492981b1f3ffdc20f2ce",
  "version": 1,
  "memory_type": "entities"
}
-->