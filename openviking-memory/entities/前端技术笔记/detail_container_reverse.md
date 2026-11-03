# 详情页骨架依赖 detail-container 的 column-reverse
产品2.0 的 zhi2-web-admin 详情页，页头必须放进 detail-container，套 list-container 会掉到页底。

## 问题现象
- 详情页「页头（返回/标题/附件/流程查看等 operation-btn-group）」跑到页面最底部而非顶部
- 页面残留 list-container 包裹（列表页骨架写法）时页头掉到底部

## 根因
- 详情页骨架约定 detail-container 内部样式为 flex-direction: column-reverse，写在该容器内页头放 DOM 后面也渲染到顶部
- 页头被放在外层 list-container 等普通纵向布局容器里，按 DOM 顺序排到表单内容下方

## 修复做法
- 详情页不要套 list-container，operation-btn-group 必须是 detail-container 的子节点
- 新增/复刻详情页时对照同模块已正确页面（如 creditDeclarationComponents/detail.vue）核对骨架层级
- 排查「页头位置错乱」先看元素落在哪个容器，再判断该容器是否依赖 column-reverse 反转

## 验证与归属
- creditChangeDeclaration/detail.vue 的页头被放在 detail-container 外的 list-container 中导致显示在底部，移入后恢复
- 涉及文件：src/views/evaluation/creditChangeDeclaration/detail.vue、src/styles/index.scss；来源会话 7f4c692f-1a01-4348-afe9-003fd8ee2a08；代码基线 414029f~f59c6be

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "detail_container_reverse",
  "source_extraction_id": "dce3834ae6534892beb7c0f65614063a",
  "version": 1,
  "memory_type": "entities"
}
-->