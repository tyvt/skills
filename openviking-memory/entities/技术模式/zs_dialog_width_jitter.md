# zs-dialog下拉弹窗宽度抖动
楼幢维护编辑户室弹窗展开/收起「房屋类型」下拉时，弹窗内部宽度抖动约8px，根因为滚动条出现消失挤压内容盒。

## 问题根因
- 公共组件 zs-dialog 的弹窗内部滚动容器（.el-dialog__body / .dialog-right / .form-box 等）在展开下拉时纵向滚动条临时出现/消失
- Windows Chrome 原生滚动条约8px，一旦出现就挤压内容盒宽度，表现为弹窗内部宽度抖动
- 这是全局性问题，不止户室弹窗，任何触发 dialog 高度重算的下拉均可能触发

## 修复方向
- .el-dialog__body 固定 overflow-y: auto 再加 scrollbar-gutter: stable
- .dialog-left / .dialog-right / .form-box 等内部滚动容器统一加 scrollbar-gutter: stable
- 关键点：仅加 scrollbar-gutter 不够，非滚动态（overflow:visible）不预留槽位，从 visible 切到 auto 瞬间仍会抖动，必须同时固定 overflow-y:auto

## 验证与归属
- 验证：Playwright + 系统 Edge 复现，修复前滚动/非滚动态内容宽度差8px，修复后 delta=0；zs-dialog.vue eslint 通过
- 提交：子模块 zhi2-web-admin 0d306c0f9，父仓库 8813f0e（develop/v3.0.0）
- 禅道回写：bug 6246 resolved/fixed，resolvedBy=tiany，resolvedBuild=trunk，assignedTo=lichandan
- 涉及文件：zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- 所属项目：苏州市房地产监测V3；代码基线：0d306c0f9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_width_jitter",
  "source_extraction_id": "fdd6fda301264ddfa4e0e8cc2a8561f5",
  "version": 1,
  "memory_type": "entities"
}
-->