# align-items:center 致虚拟列表失效
main.ts 全局开启 z-paging 虚拟列表，.list-container 的 align-items:center 致滚动区宽度收缩为 0 算高失败。

## 问题根因
- main.ts 全局开启 z-paging 虚拟列表
- .list-container 的 align-items: center 致滚动区宽度收缩为 0 算高失败

## 解决方案
- 去除 align-items、宽改 100% 加 min-width:0
- 子项宽改百分比

## 验证与归属
- 验证证据：src=H5/001.md
- 涉及文件：main.ts
- 来源会话：5ddd3520-e931-43a9-9abb-08080d4f075f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "align_items_vlist",
  "source_extraction_id": "4912fc41379d43e8b448ed8171c58129",
  "version": 1,
  "memory_type": "entities"
}
-->