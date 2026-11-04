# dialogMode未声明致模板渲染警告
模板使用dialogMode == 'view'但data()未声明该响应式属性，触发Vue警告。

## 问题根因
- 模板第25行使用dialogMode == 'view'判断
- data()中未声明dialogMode响应式属性，导致Vue渲染警告

## 解决方案
- 在data中增加dialogMode: 'add'消除警告
- 弹窗当前仅用可编辑表单，不涉及view模式渲染
- 涉及文件：building/building/index.vue、building/mapProperty/index.vue、mixins/listMixins.js、main.js

## 验证与归属
- 验证证据：src=产品2.0/080.md
- 来源会话ID：00c2a786-4f55-4891-9c14-a133f9c5c856
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialogmode_undeclared_bug",
  "source_extraction_id": "d9a197141e654eb98942cde621312789",
  "version": 1,
  "memory_type": "entities"
}
-->