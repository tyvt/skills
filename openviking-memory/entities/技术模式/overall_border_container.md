# 整体边框样式须设置于容器
边框需作用于容器而非表格区域，使左侧银行列表与右侧表格作为整体显示外边框。

## 问题现象
- 边框原仅作用于表格区域，未覆盖左侧银行列表与右侧表格整体

## 解决方案
- 在 `src/views/system/yhlhhgl/index.vue` 中为 `.content-container` 添加 `border`、`border-radius`、`background`、`overflow: hidden`、`padding`

## 验证与归属
- 验证证据：extracted source=cursor session=d23831b9-3b10-488b-b73f-6265a9af4069
- 涉及文件：src/views/system/yhlhhgl/index.vue
- 所属项目：园区物管2.0；代码基线 none；来源会话：d23831b9-3b10-488b-b73f-6265a9af4069

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "overall_border_container",
  "source_extraction_id": "6399c380350447e9ad0523af8f3bf37f",
  "version": 1,
  "memory_type": "entities"
}
-->