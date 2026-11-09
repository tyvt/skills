# apply.svg根节点fill=none遭正则误改
园区物管2.0 中 apply.svg 根节点 fill="none" 被正则误改为路径颜色，导致图例紫色异常。

## 问题根因
- apply.svg 根节点 fill="none"，内部 path 为 fill="#ABAEF1"。
- 原正则仅替换首个 fill，误将根节点 none 改为十六进制色，致图例颜色匹配柱体失败。

## 解决方案
- 正则仅匹配 path 上的十六进制颜色 fill="#..."，保留根节点 fill="none"。
- 修复后图例正确匹配 #EEB57F 柱体颜色。
- vite.config.js 中相关 svg 处理插件正则同步修改。

## 验证与归属
- 验证：src=园区物管2.0/039.md；涉及文件 fundPanorama/index.vue、vite.config.js。
- 所属项目：园区物管2.0；来源会话：74cda9bf-bc09-433c-99cf-1a36768b982a；代码基线：none。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "svg_fill_replace",
  "source_extraction_id": "16416ccdf7c044efbfab91c3d016aacd",
  "version": 1,
  "memory_type": "entities"
}
-->