# 价格备案详情页按钮置顶布局修复
价格备案等模块详情页按钮组因全局样式问题未置顶，已通过修改全局样式修复。

## 问题根因
- 批量扫描详情页按钮顺序任务在 Windows 因路径解析失败无结果，但布局问题确为全局样式导致
- `.detail-container` 原使用 `column-reverse`，导致按钮组在表单下方

## 解决方案
- 修改 `src/styles/index.scss`：`.detail-container` 改为正常 `column`
- `.operation-btn-group` 设置 `order: -1`，保证按钮组始终置顶

## 验证与归属
- 价格备案详情页验证：按钮 top 128px，表单 top 209px，按钮在表单上方
- 刷新后价格备案、项目管理、预售资金等模块详情页按钮均应回顶部
- 若个别页面异常，发具体菜单路径即可
- 涉及文件：`src/styles/index.scss`、`recordPriceMngSuzhou/index.vue`、`priceParameters/index.vue` 等
- 所属项目：产品2.0；来源会话：a35cd3c7-4871-474b-b545-b9efc1cadd00；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "price_btn_layout",
  "source_extraction_id": "e126efa632a44debbf017f2d54ab133a",
  "version": 1,
  "memory_type": "entities"
}
-->