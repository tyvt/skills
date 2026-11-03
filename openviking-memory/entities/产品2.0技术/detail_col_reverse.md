# 详情页按钮组因 column-reverse 跑到表单下方
多个模块详情页操作按钮组（.operation-btn-group）因全局样式 .detail-container 使用 flex-direction: column-reverse 被顶到表单下方，属全局副作用。

## 问题根因
- 全局样式 src/styles/index.scss 中 .detail-container 用 flex-direction: column-reverse
- column-reverse 把 DOM 最后一个子节点显示在最上面，许多详情页把 operation-btn-group 写在模板末尾故被顶到顶部
- 改此容器方向会同时波及所有详情页，属典型全局副作用

## 正确做法
- 不要用 column-reverse 当「置顶某块」手段，需置顶就显式改 DOM 顺序或用 order
- 历史页面已依赖 reverse 则改为正常 column + 给置顶块设 order: -1，而非逐页调顺序
- 改完按下标量：按钮组 top 应小于表单 top（实测 128px < 209px），刷新抽查 2 个以上模块详情页
- 该文件是全站公共 scss，改动同步到同源项目

## 验证与归属
- 来源会话 a35cd3c7：将 .detail-container 从 column-reverse 改为 column，给 .operation-btn-group 设 order: -1，验证按钮 top 128px 在表单 top 209px 之上
- 涉及文件：zhi2-web-admin/src/styles/index.scss；所属项目：产品2.0；代码基线：5169909

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "detail_col_reverse",
  "source_extraction_id": "90d1b0f9d9774c0d9a37f9b9cd45eeee",
  "version": 1,
  "memory_type": "entities"
}
-->