# 弹窗内复用详情页容器类导致样式错乱：选择类弹窗按数据量分双形态
园区物管2.0 中弹窗表格区复用详情页 sub-container 容器类会导致样式错乱与加载闪烁，约定按数据量分双形态。

## 问题根因
- sub-container 是详情页子表样式契约（边框、padding 按详情容器设计），弹窗环境无对应高度链与父容器，样式必然不匹配
- 表格分支判定只看容器形态不看数据量，total=0 时仍走表格分支弹出带搜索栏的空表格
- 数据未返回前先渲染表格结构造成闪烁

## 解决方案
- 弹窗按数据量双形态：≤6 条（含无数据）用 form-box + 勾选卡片布局配 mini（616px）档位
- >6 条用 dialog-right + 搜索 + 表格 + 分页配 common（900px）档位
- 无数据显示 el-empty 而非空表格+搜索栏；打开时先 loading 再渲染内容避免布局闪烁
- 表格加 max-height（如 360）防止弹窗过高

## 验证与归属
- 验证：根因含布局容器用错 sub-container、total=0 仍走表格、medium 尺寸偏大、加载闪烁四类
- 涉及文件：zhi2-web-admin/src/views/building/houseImport/detail.vue、zhi2-web-admin/src/views/building/houseImport/components/HouseTable.vue
- 所属项目：园区物管2.0；代码基线 193a9a3b6；来源会话 5b2911f5-d317-4814-93d2-d063ea72a749

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "dialog_dual_layout",
  "source_extraction_id": "376a889d69774d27a4b297f122696b26",
  "version": 1,
  "memory_type": "entities"
}
-->