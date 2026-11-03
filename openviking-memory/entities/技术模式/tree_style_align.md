# 左侧树样式对齐设施定义页规范
园区物管2.0 中 publicQuery/complex/index.vue 左侧树 UI 需对齐 maintenance/facilityDefinition/index.vue 的样式层规范。

## 问题描述
- publicQuery/complex/index.vue 左侧树 UI 与设施定义页容器、节点样式不一致

## 解决方案
- 仅修改样式层：容器卡片、标题、背景、树节点 hover/current 态
- 未触及业务逻辑与接口调用，保持功能不变

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue、zhi2-web-admin/src/views/maintenance/facilityDefinition/index.vue
- 所属项目：园区物管2.0；代码基线：none；来源会话：968a5e94-2c53-439a-b27e-9288474c649a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_style_align",
  "source_extraction_id": "39b925c8e09649388134551189dae6f4",
  "version": 1,
  "memory_type": "entities"
}
-->