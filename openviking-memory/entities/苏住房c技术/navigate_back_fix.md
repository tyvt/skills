# 子页返回写死navigateBack(delta:1)致栈重复
苏住房C 跳转类页面因入口双事件重复 navigateTo 使页面栈重复，子页返回写死 delta:1 需多次才退干净，应查页面栈一次性回退。

## 问题现象与根因
- 我的求购→添加求购信息→点搜索框选小区，第一次选完停在搜索页，第2-4次才退回添加页
- 根因：add.vue 搜索框同时挂外层 div @tap 与 ZsSearch @focus 两跳转事件，一次点击连触两次 navigateTo，栈出现重复搜索页
- search.vue 选中小区后只 navigateBack({delta:1})，每次只退一层重复页

## 解决方案
- 入口页只保留单一跳转事件，统一用 @click.native，去掉重复 @tap/@focus
- 子页返回不假设只入栈一次：用 getCurrentPages() 按路由路径查目标页算出 delta 一次性退回
- 验证路径：我的求购→添加→点搜索框→选小区，第一次选择直接回添加页并回填
- 凡「A页→选数据页→回带结果给A页」结构均按此模式写返回逻辑

## 验证与归属
- 验证：会话 9e111257「搜索到小区然后第一次都不会自动弹到添加求购信息页面，后面的2、3、4次才会」
- 涉及文件：src/pages_transaction/intention/add.vue、search.vue、src/components/ZsSearch/ZsSearch.vue
- 所属项目：苏住房C；来源会话ID：9e111257-31c8-47e5-b4c2-c258dbd7cb93；代码基线：d43894b

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "navigate_back_fix",
  "source_extraction_id": "26d7a6fd99de463182bdf8dc2795cc18",
  "version": 1,
  "memory_type": "entities"
}
-->