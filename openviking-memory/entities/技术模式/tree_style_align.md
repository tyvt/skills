# 左侧树样式对齐设施定义页规范
园区物管2.0 中 publicQuery/complex/index.vue 左侧树 UI 需对齐 maintenance/facilityDefinition/index.vue 的样式层规范。

## 问题描述
- publicQuery/complex/index.vue 左侧树 UI 与设施定义页容器、节点样式不一致

## 解决方案
- 仅修改样式层：容器卡片、标题、背景、树节点 hover/current 态
- 未触及业务逻辑与接口调用，保持功能不变

## 具体调整点
- 左侧区域改为“标题 + 内容卡片”结构，与参考页一致容器感
- 增加左侧标题「行政区域」
- 原顶部统计行改为卡片内 `sort-left-header`，统一背景、圆角、字号
- 左侧容器改为浅灰背景、圆角边框、内边距和间距对齐参考页
- 树节点样式对齐：节点高度、hover 高亮、current 高亮、展开箭头颜色和字号、行内布局（名称省略、数量右对齐）
- 新增 `node-count` 样式让右侧数量显示更清晰
- 修改仅样式层，lint 报项目已有 ts-plugin `never` 相关错误，未引入新逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue、zhi2-web-admin/src/views/maintenance/facilityDefinition/index.vue
- 所属项目：园区物管2.0；代码基线：none；来源会话：968a5e94-2c53-439a-b27e-9288474c649a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_style_align",
  "source_extraction_id": "d5fc2c74eca741f8999f76ec348a4ddc",
  "version": 2,
  "memory_type": "entities"
}
-->