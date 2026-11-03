# zs-operate-column单按钮不居中
园区物管2.0 列表操作列只剩一个按钮时，因动态列宽下容器默认起点对齐，按钮在较宽列里靠左不居中。

## 现象与根因
- 现象：列表操作列只剩一个「查看」按钮时，按钮在较宽列里靠左，视觉不居中
- 根因：组件按按钮文字动态算列宽后，.operate-column-button-container 仍是默认 flex 主轴起点对齐；列宽大于内容宽度时单按钮贴左

## 解决方案
- 给按钮容器补 justify-content: center
- 注意：已知清单已有「不要传固定 :width、交给组件自适应」，本条是自适应列宽场景下的对齐补充，不是再传 width

## 验证与归属
- 验证证据：会话 eb429bff 用户截图单按钮不居中；在 operate-column-button-container 增加 justify-content:center 后单「查看」在操作列居中
- 涉及文件：zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- 所属项目：园区物管2.0
- 来源会话：eb429bff-03b8-43b5-9e7a-77b8f20a182a
- 代码基线：7814a0c2a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_operate_column_center",
  "source_extraction_id": "8987a09e8af843cf8262f55c4984e353",
  "version": 1,
  "memory_type": "entities"
}
-->