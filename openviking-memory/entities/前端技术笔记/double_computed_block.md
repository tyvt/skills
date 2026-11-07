# 组件重复 computed 块致属性丢失
在 Vue 组件中写两个 computed: { } 块会导致后者覆盖前者，先写的计算属性静默变 undefined。

## 现象
- 大屏/地图页组件先后写两个 computed 块（如 districtStatsByName 和 threeAssetsMax 分居两处），悬停地图板块报 Cannot read properties of undefined（读区名），弹窗起不来，无编译期警告。
- 与 data 和 computed 同名会警告不同，对象字面量重复键连 Vue warn 都不会有。

## 根因
- 组件选项是普通 JS 对象，重复键遵循后者覆盖前者，第二个 computed 块把第一个整块顶掉，先写的计算属性静默丢失，运行到引用处才暴露。

## 修复做法
- 每个组件只保留一个 computed: { ... }，多个计算属性在其内并列声明。
- 审查或复制粘贴拼页面时，grep 组件内 computed: 出现次数，>1 即隐患；同类静默覆盖也适用于 methods/watch 等对象型选项。

## 关联信息
- 涉及文件：src/views/benefit/mapOverview/index.vue；所属项目：园区物管2.0；来源会话 ID：15514253-88df-4a75-b299-5e0fcb7ba067；代码基线：e75a12737。
- 验证：index.vue 写两个 computed，后块 threeAssetsMax 顶掉 districtStatsByName 变 undefined，悬停执行 this.districtStatsByName['锡山区'] 报错；修复为合并进同一个 computed。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "double_computed_block",
  "source_extraction_id": "ac7ed565a11941f68e3ba3d720da30ae",
  "version": 1,
  "memory_type": "entities"
}
-->
