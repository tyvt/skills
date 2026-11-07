# 整改通知书业务状态默认清空（苏住房G）
苏住房G 项目整改通知书列表页搜索条件「业务状态」默认值由「已备案」改为空，修复默认只查已备案数据的问题。

## 改动说明
- 在 zhi2-web-admin/src/views/evaluation/rectificationNotice/index.vue 第 108 行，将 `bizState` 由 `'2'`（已备案）改为 `undefined`（空）
- 页面首次加载时「业务状态」下拉框默认为空；点击「重置」后恢复 `data()` 初始值 `undefined`
- 未选择业务状态时，列表接口不传该筛选条件，可查询全部状态数据
- 详情页新增时选择物业区域的弹窗过滤逻辑未改动（仍按已备案过滤）
- 与同页其他筛选项（`noticeStatus`、`sourceDept`）的默认值写法一致，代码层无 lint 错误

## 涉及文件
- zhi2-web-admin/src/views/evaluation/rectificationNotice/index.vue（主改动）
- zhi2-web-admin/src/views/evaluation/rectificationNotice/detail.vue（弹窗逻辑未改动）
- 早期 053.md 来源还列出 mixins/listMixins.js、ListTemplate.js、table.js，本次 cursor 提取聚焦 index.vue 改动

## 验证与注意
- 若本地曾访问且 Vuex 缓存了 `bizState: '2'`，首次打开可能仍显示旧值，点击「重置」即可恢复
- 所属项目：苏住房G；来源会话：952fd9dc-40f6-4af0-88c2-cdd449ab3e96；验证证据：extracted source=cursor project=苏住房G（另见 src=苏住房G/053.md）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rectification_bizstate_default",
  "source_extraction_id": "abdb91ea921d455b818bda502a994c7b",
  "version": 2,
  "memory_type": "entities"
}
-->