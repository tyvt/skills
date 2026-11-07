# zs-table 固定列边框分页条件异常
园区物管2.0 的 zs-table 固定操作列多余边框只在有分页的页面出现，因修复样式挂在无分页才加的条件 class 上。

## 现象
- 列表页操作列 fixed="right"，列多出现横向滚动条时，固定操作列下方叠出多余边框。
- 问题只在「有分页组件」的页面出现（哪怕共 1 条）。

## 根因
- 隐藏固定列多余边框的修复样式写在 `.zs-table-container--bottom-spacing` 下，该 class 只有没分页时才加，有分页页面样式不生效。
- zs-table 的 syncFixedColumnOffset 被注释掉，横向滚动条高度未计入固定列，放大视觉偏差。

## 解决方案
- 把固定列边框修复从条件 class 移到 `.list-card .zs-table-container`（有分页也生效），在全局 styles/index.scss 收敛。
- 恢复 zs-table 组件内 syncFixedColumnOffset，让固定列高度与横向滚动条对齐。
- 排查「只在部分列表页出现」的表格样式问题时，先看目标样式挂的容器 class 是否被分页等条件渲染分支决定。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/styles/index.scss、zhi2-web-admin/src/components/zs-table/zs-table.vue。
- 所属项目：园区物管2.0；来源会话：f85b6a27-7ef0-4292-b55b-eede0e63b03e；代码基线：736a824e7。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_fixed_border",
  "source_extraction_id": "f614d32fd9654c25aca3ddc2036cbb52",
  "version": 1,
  "memory_type": "entities"
}
-->