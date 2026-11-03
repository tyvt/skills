# ListTemplate模板绑定tableRowStyle缺mixin默认实现
ListTemplate.js模板绑定:row-style="tableRowStyle"但table.js mixin未定义导致的渲染报错与契约修复。

## 问题根因
- ListTemplate.js模板绑定:row-style="tableRowStyle"，该方法应由table.js mixin提供
- subTableMixins→table链路里mixin未定义tableRowStyle，子表渲染命中未定义绑定
- 属于模板与mixin之间的契约缺口，非页面写错选项位置

## 解决方案
- 在table.js的computed中补默认tableRowStyle返回null（无自定义行样式用默认）
- 需要行样式的页面在各自组件里重写该计算属性
- 排查类似问题：ListTemplate模板出现的绑定在页面报未定义，优先怀疑mixin缺默认实现

## 验证与归属
- 验证证据：会话9acb00ce报错组件parkingTable.vue（经zs-tabs/Headline/detail.vue链路）；修复为table.js computed增加返回null默认tableRowStyle
- 涉及文件：zhi2-web-admin/src/mixins/table.js、ListTemplate.js、subTableMixins.js
- 所属项目：产品2.0；来源会话ID：9acb00ce-4277-4a60-97c9-c4001384dfcd；代码基线：76646e6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listtemplate_tablerowstyle",
  "source_extraction_id": "ad869c7e1cac472293a790f179a77c52",
  "version": 1,
  "memory_type": "entities"
}
-->