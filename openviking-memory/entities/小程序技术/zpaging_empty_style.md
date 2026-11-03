# z-paging空态插槽无样式导致文字靠左图片不显示
苏住房C「视频看房」等所有用z-paging的页面空态文字靠左、空态图完全不显示。

## 根因
- .paging-empty/.paging-empty-pic/.paging-empty-text全局样式未定义，#empty插槽内为无样式裸元素，文字左对齐不居中
- ZsImage内部width:100%;height:100%，而.paging-empty-pic无显式尺寸，父容器为0时图片宽高皆0，表现为空态图不显示且无报错

## 解决方案
- uni.scss补全局.paging-empty样式（居中布局、空态图定宽高约320rpx、灰色提示文案），一次性修复所有z-paging页面空态
- ZsPaging.vue补对应scoped样式，保证走封装组件同样生效
- 页面#empty插槽去掉mt-300等无效偏移，结构交全局样式控制

## 复用要点
- ZsImage必须放在有确定尺寸的父盒里；凡「图片没显示但网络无报错」先量父容器宽高是否为0
- 验证：会话52f0bdb1（基线9832ba3）「empty组件UI有问题」，修复为uni.scss补全局空态样式+修正houseVideo/index.vue的#empty结构+ZsPaging.vue增scoped样式；涉及文件uni.scss、ZsPaging.vue、ZsEmpty.vue、pages_transaction/houseVideo/index.vue；所属项目苏住房C；来源会话ID 52f0bdb1-df2c-4df1-9f42-40b6d23d7382；代码基线9832ba3

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zpaging_empty_style",
  "source_extraction_id": "0e31f6bb15d24732a33d1e0cad0d9ed7",
  "version": 1,
  "memory_type": "entities"
}
-->