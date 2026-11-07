# 自定义列表列顺序保存后表格不重排修复
园区公共收益项目中使用自定义列表模板（非 ListTemplate.js）保存列顺序后，el-table 缓存列顺序导致界面不重排，需给 zs-table 补 :key="tableColumnsKey"。

## 现象
- 使用「自定义列表显示」且页面自写模板时，displayColumns 顺序保存后数据已更新，但 el-table 缓存列顺序，仅改 v-for 列顺序界面不变。

## 根因
- Element UI el-table 会缓存列顺序，通用列表模板已在 zs-table 绑 :key="tableColumnsKey"，自定义页未绑定该 key。

## 修复方案
- 自定义页（property/complex/index.vue、complexChange/index.vue）给 zs-table 加 :key="tableColumnsKey"。
- 列 v-for 的 :key 与 ListTemplate 保持一致：(column.prop||'')+'-'+(column.label||'')。
- 组件层已用 refreshColumnOrderKey 处理列变更时，仍应验证「仅改用户列配置顺序」场景是否需此 key。

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：会话 4b2a6426 物业管理区域备案列表自定义排序保存后列顺序没变，根因缺 tableColumnsKey。
- 涉及文件：property/complex/index.vue、complexChange/index.vue、ListTemplate.js、listMixins.js。
- 所属项目：园区公共收益；来源会话：4b2a6426-193d-4d85-9729-2061d23f61d0；代码基线：0c9b8c2。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_columns_key",
  "source_extraction_id": "29c980d82c364957b8a38a2d08250317",
  "version": 1,
  "memory_type": "entities"
}
-->