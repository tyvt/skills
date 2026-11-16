# 数智页 main 标签 class 对齐
苏住房防汛C端数智页按新参考稿还原时，通过补齐参考稿 `<main>` 开标签 class 消除大面积像素偏差的排查与修复模式。

## 问题根因
- 参考稿 `<main>` 开标签带 pt-16（64px 顶部内边距），uni-app 实现侧 buildInnerHtml 漏掉该类，造成像素 diff 36%
- 偏差表现为顶部留白，根因不在 chips 或卡片内容

## 处理方法
- 对齐设计稿时先比对 `<main>` 开标签 class，再逐 section 比对内容
- 补齐缺失的 main class 后，默认态整页逐像素 diff 归零

## 验证与归属
- 所属项目：苏住房防汛C端；会话 shuzhi-data-nav-20261116，dev 分支 commit c1ca8f3
- E2E 终态 3/3 通过，390×3629 像素比对 DELTA 24 / MAX_RATIO 0.001

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "数智页main标签对齐",
  "source_extraction_id": "38ea00fe848f4c998b177ae5d1ed1de6",
  "version": 1,
  "memory_type": "entities"
}
-->