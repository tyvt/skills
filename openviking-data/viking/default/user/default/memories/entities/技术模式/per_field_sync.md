# 个人资料双页字段同步模式
个人资料展示页 per.vue 与编辑页 perEdit.vue 数据模型独立，扩展字段须双页同步声明否则数据断层。

## 问题背景
- 个人资料展示 (per.vue) 与编辑 (perEdit.vue) 数据模型独立，字段须同步声明。
- 未同步会导致数据断层（展示与编辑不一致）。

## 解决方案
- 在 per.vue 的 detail 与 detailKeys 增加 receiveAddress、workUnit 并在 onLoad 回调赋值。
- 在 perEdit.vue 的 model 增加同名字段 receiveAddress、workUnit。
- 表单项添加绑定 model.receiveAddress 与 model.workUnit 的 wd-input 及 $t 标签。

## 验证与归属
- 验证证据：extracted source=cursor session=163cd24f-0205-4241-941b-7ad8647f2e4c
- 涉及文件：per.vue ; perEdit.vue
- 来源会话ID：163cd24f-0205-4241-941b-7ad8647f2e4c
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "per_field_sync",
  "source_extraction_id": "a78421c8f06d47cb898e0bdb94bb7664",
  "version": 1,
  "memory_type": "entities"
}
-->