# 后台列表页块间间距与操作栏对齐统一进全局 index.scss
产品2.0 多个同构列表页的搜索区与表格卡片间距、操作栏垂直居中应写进全局 scss 语义类，而非各页面写一套。

## 问题现象
- 经营资产/资源租赁合同、停车泊位租赁管理三同构列表页出现搜索区与表格卡片上下间距不均
- 标题、按钮行与预警说明文字高度不齐、不垂直居中

## 根因
- 各页手写 margin 调间距，未统一列表骨架样式

## 解决方案
- 列表容器统一加语义类 `lease-contract-list`（搜索区与表格卡片间距固定 12px）
- 标题/按钮行与预警说明合并进 `list-card-header`（min-height:48px + padding:12px，内容垂直居中，说明文字同用 12px 上下内边距），规则写进 `src/styles/index.scss` 一处，三模块只挂类名
- 子表金额/面积列缺千分位时用 `amountFormatter`（1000 → 1,000.00），不手写 formatter
- 子表底部边距不足时补 `sub-container` 包裹（详情页子表容器既有约定），不給表格加 margin-bottom
- 边界：跨页复用骨架进 index.scss，单页特性仍留组件 scoped，不冲突

## 验证与归属
- 验证证据：会话 e48b01c6 三 index.vue 统一调整上下间距一致、操作栏垂直居中、说明文字纳入表头、全局样式写入 index.scss；顺带修复 houseTable.vue 面积列用 amountFormatter、subAdvertiseTable.vue 增 sub-container 包裹
- 涉及文件：d:\repository\产品2.0\zhi2-web-admin\src\styles\index.scss、src\views\benefit\assetsLeaseContractFiling\index.vue、src\views\benefit\resourcesLeaseContractFiling\index.vue、src\views\benefit\parkingSpaceContractFiling\index.vue
- 所属项目：产品2.0；来源会话：e48b01c6-3065-4048-9afa-2de4be8dac2a；代码基线：49a7aa3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_spacing_global_scss",
  "source_extraction_id": "864f8e223f1e4bbc8b0262bd6bfcb62d",
  "version": 1,
  "memory_type": "entities"
}
-->