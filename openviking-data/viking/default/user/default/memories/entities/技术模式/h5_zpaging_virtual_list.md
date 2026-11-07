# H5 z-paging 虚拟列表宽度修复
H5 项目 main.ts 全局开启 z-paging 的 use-virtual-list: true，虚拟列表需测量 cell 宽高、滚动区须占满横向宽度。

## 问题根因
- main.ts 全局 use-virtual-list: true，虚拟列表测量要求滚动区域占满横向宽度
- .list-container 上 align-items: center 使子元素水平方向不拉伸，内部 scroll-view 宽度随内容收缩甚至为 0，虚拟列表算高失败，列表不显示

## 解决方案
- 去掉 .list-container 的 align-items: center（列表项已有 margin: 20rpx auto 0 仍可居中）
- width: 100vw 改为 width: 100% 并加 min-width: 0，避免 flex 子项被撑破/溢出
- .list-item 的 94.4vw 改为 94.4%（相对父级全宽）
- .publicity-title 去掉固定 80vw，改为 max-width: 100%

## 验证与归属
- 验证证据：extracted source=cursor project=H5
- 涉及文件：main.ts、src/pages/benefit/index.vue
- 来源会话：5ddd3520-e931-43a9-9abb-08080d4f075f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "h5_zpaging_virtual_list",
  "source_extraction_id": "18b10a22986c4cf9b78c51c8d85f5db8",
  "version": 1,
  "memory_type": "entities"
}
-->