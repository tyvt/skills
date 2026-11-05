# 用款申请图例颜色与柱体不一致
园区物管2.0 fundPanorama 用款申请图例颜色与柱体不一致。

## 问题根因
- apply.svg 根节点 fill="none"，path 上 fill="#ABAEF1"
- 原先正则只替换第一个 fill，把根节点的 none 改掉，path 仍保持 #ABAEF1，导致图例显示紫色，与 #EEB57F 柱体不一致

## 解决方案
- 只替换 path 上的十六进制颜色（fill="#..."），不再误改 fill="none"
- 刷新后用款申请图例应为 #EEB57F，与柱体一致

## 验证与归属
- 来源会话：74cda9bf-bc09-433c-99cf-1a36768b982a
- 涉及文件：benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "apply_legend_color",
  "source_extraction_id": "849acc699eee47b7ace3de814a0b95e9",
  "version": 1,
  "memory_type": "entities"
}
-->