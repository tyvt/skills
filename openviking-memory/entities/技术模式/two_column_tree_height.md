# 左树右内容两栏页左栏高度锁视口剩余高度
维护类模块「左侧分类树 + 右侧列表」两栏布局，左栏默认随树节点增高撑长整页，需用 flex 拉伸 + min-height:0 + 内部分区滚动锁定高度。
## 问题现象
- 设施设备 facility/index.vue、标准维修项目 standardItem、设施定义 facilityDefinition 为左树右列表两栏布局
- 左栏随树节点数量增高，节点多时整页撑长、右侧列表被顶到视口外，出现两条独立滚动条
## 根因
- 左栏是内容驱动块级高度，不读视口也不参与父容器高度约束
- 树区无独立滚动出口，overflow 落在整页上
## 解决方案
- 页面容器统一 height: calc(100vh - 120px)，与同模块既有页面保持一致，不各写一个减法常量
- 左栏 flex 布局用 align-self: stretch + min-height: 0 撑满剩余高度而非撑内容
- 树放在 sort-left-body 内层盒滚动，顶部「物业管理区域」选择与搜索框留在滚动区外固定
- 改动前先搜同模块已有左栏高度写法对齐，避免同一模块出现两个减法基准
## 验证与归属
- 涉及文件：facility/index.vue、facilityDefinition/index.vue、standardItem/index.vue、src/styles/index.scss
- 所属项目：产品2.0；代码基线：2f68042
- 来源会话ID：7c1acafc-7c01-47e5-b2e6-f66543e21e10

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "two_column_tree_height",
  "source_extraction_id": "5a1f60793990469a86c8c5a93e7974f0",
  "version": 1,
  "memory_type": "entities"
}
-->