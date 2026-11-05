# 公告列表类型文字未展示（msgType缺失）
无锡市区小程序嵌入H5中 `NoticeList.vue` 的类型标签一直显示为「-」，因父页面未传递 `msgType`。

## 问题根因
- `NoticeList.vue` 苏住房样式用 `item.msgType` 配合 `getDictLabel` 显示类型
- 父页面 `announcement/index.vue` 在 `res.rows.map` 转列表项时未带上 `msgType`
- `getDictLabel` 在 `val` 为空时返回 `''`，模板落到 `|| "-"` 故类型显示为「-」
- 对比 `project/announcement/index.vue` 用 `...el` 展开保留了 `msgType`，显示正常

## 修复方案
- 在 `announcement/index.vue` 的 map 中补充 `msgType: el.msgType`

## 验证与归属
- 来源会话：636ac7f6-e11f-4469-91e7-916792d8743b；代码基线：none
- 涉及文件：src/pages/announcement/index.vue、NoticeList.vue、src/pages/project/announcement/index.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "notice_msgtype_bug",
  "source_extraction_id": "5279fead9abb4516adfbc3c5bd9fc16c",
  "version": 1,
  "memory_type": "entities"
}
-->