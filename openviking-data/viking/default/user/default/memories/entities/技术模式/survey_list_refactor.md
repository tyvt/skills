# 问卷发布统计列表重构
产品2.0 问卷发布详情的 `statistics/index.vue` 已对齐 `release/index.vue` 标准列表写法，使用 `ListTemplate.js` + `listMixins` 精简代码。

## 主要变更
- 使用 `ListTemplate.js` + `listMixins`，去掉手写模板和重复的列表逻辑
- 删除手写的 `getList`、`handleQuery`、`resetQuery`、`handleSelectionChange` 及 `loading/total/tableData` 等冗余 data
- `operationButtons` 返回空数组，不显示新增/删除按钮；`buttons` 只保留 `viewButton`（查看）
- 保留 `initDict` 和自定义 `handleView` 跳转逻辑

## 附带收益
- 接口自动走 `/survey/result/page`；搜索条件自动缓存
- 列表标题自动显示（路由 `meta.title` + 「列表」）；支持列自定义配置
- 页面从 159 行精简到约 90 行，功能与改前一致

## 涉及文件与归属
- 涉及文件：`statistics/index.vue`、`release/index.vue`、`ListTemplate.js`
- 所属项目：产品2.0；来源会话：79d8b01e-dd31-4523-9359-f9809fc997bf；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "survey_list_refactor",
  "source_extraction_id": "a0aa551040bb463183a5bf54308c95b5",
  "version": 1,
  "memory_type": "entities"
}
-->
