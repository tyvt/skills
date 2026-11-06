# 银行网点管理详情页 HeadTitle 接入
苏州市房地产监测V3 在银行网点管理详情页按项目惯例接入 HeadTitle 展示操作人/操作时间。

## 改动说明
- 顶部状态条：查看模式在「基本信息」区块上方展示 `HeadTitle`，含操作人、操作时间（排在银行名称等字段之前）
- 基本信息：从 `DetailTemplate` 的 `contentInfo` 移除底部操作人、操作时间避免重复
- 组件注册：引入并注册 `@/components/HeadTitle/index.vue`，写法与预售等业务详情页一致

## 涉及文件
- `supervision/bank/jgwd/detail.vue`
- `@/components/HeadTitle/index.vue`
- 监管银行弹窗 `superviseBank/components/YhwdDialog.vue` 如需同样调整可一并改

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor；来源会话ID：abcd2ddd-f06a-43ce-b7fd-b84b6f04e622

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_jgwd_headtitle",
  "source_extraction_id": "e053260580a2474bb0e49eda780f9845",
  "version": 1,
  "memory_type": "entities"
}
-->