# rent-pro页留言空值禁用且mock提交
在 @src/pages-rent/rent-pro 评价区块下新增留言区块，采用 textarea 绑定 messageContent 并限制 500 字。

## 实现做法
- 提交函数 submitMessage 触发 uni.showLoading 后延时 600ms 清空输入并 uni.showToast 提示。
- 提交按钮空内容时禁用，并应用主色 #4281EA 与 0.5 透明度样式。

## 涉及文件
- @src/pages-rent/rent-project-detail.vue
- 来源会话：0bc20f1f-ffa2-45b3-af16-c1871ca5ce82；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_msg_mock",
  "source_extraction_id": "db1981a4ff084175a289148b91ebb620",
  "version": 1,
  "memory_type": "entities"
}
-->