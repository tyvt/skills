# 公示公告空状态居中修复
产品2.0 首页公示公告空状态现已在内容区内水平、垂直居中显示。

## 问题根因
- `.notice-body` 原未占满剩余高度，空状态未居中

## 解决方案
- `.notice-body` 改为 flex 纵向布局，占满剩余高度
- `.empty-tip` 使用 `flex: 1` 并配合 `align-items`/`justify-content: center` 实现居中

## 验证与归属
- 刷新后「暂无公告数据」显示在区域正中央
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`home/index-new.vue`、`home/index-wrapper.vue`、`layout/components/AppMain.vue`、`layout/index.vue`
- 来源会话：0ae813a4-8369-4c2b-a411-ca813e60468b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "notice_empty_center",
  "source_extraction_id": "b7c4512054fb4b70bf552a713aed3145",
  "version": 1,
  "memory_type": "entities"
}
-->