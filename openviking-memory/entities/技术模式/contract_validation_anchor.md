# 合同未填项双通道定位
苏州市房地产监测V3 中 2016 版合同保存时按「跟以前一样」实现未填项精确定位，采用前端校验 + 后端兜底双通道。

## 根因
- `suzhou2016/mixins/szForm.js` 的 `checkValidate()` 为空实现，保存时前端不校验，`SzContent` 滚动到 `.is-error` 不触发，只能由后端报 `请输入商品房总价款`

## 实现思路
- 各 `Sz*` 填空组件从 `v-model` 表达式自动推导字段名，渲染成 `data-field` 锚点（`components/fieldAnchor.js`）用于精确查找高亮

## 通道一前端校验
- 点保存 → `SzContent.getFormData()` 逐章校验，命中首个未填项即红框高亮 + 闪烁 + 聚焦 + 平滑滚动居中 + toast 并中断保存
- 正文必填项登记在 `suzhou2016/validation.js` 的 `CHAPTER_REQUIRED`，按章节条款登记，二选一 / 条件条款按分支校验

## 通道二与归属
- 通道 2 拦截后端报错文案作兜底
- 涉及文件：`suzhou2016/mixins/szForm.js`、`components/fieldAnchor.js`、`suzhou2016/validation.js`、`index.vue`
- 来源会话：2ad932d3-7ddf-426e-a8a3-320e8d8f9b66；所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_validation_anchor",
  "source_extraction_id": "c9b7683152ec4919bda99ba8cded66d5",
  "version": 1,
  "memory_type": "entities"
}
-->