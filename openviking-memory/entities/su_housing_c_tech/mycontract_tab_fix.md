# 我的合同页顶部Tab撑满修复
苏住房C「我的合同」页面顶部 tab 未撑满的问题已修复，根因为父容器与子元素宽度设置不当。

## 问题根因
- 父容器 `.my-contract-box` 设置 `align-items: center`，子元素按内容宽度收缩
- `tab-line` 未设置 `width: 100%`，白色 tab 区域只占中间一小块

## 修复内容
- 给 `tab-line` 增加 `class="tab-line"` 并设置 `width: 100%`
- 将 `:deep(.filter)` 改为 flex 全宽布局，`justify-content: space-around`
- 给每个 `.button` 设置 `flex: 1` + `text-align: center`，让「新房」「二手房」均分整行

## 涉及文件与归属
- 涉及文件：pages_main/my/myContract.vue、pages.json
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：79b57ec7-807a-4bf3-a5c0-808a9f8fbf51

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "mycontract_tab_fix",
  "source_extraction_id": "be4cb5694a9049d2b5d24d217f92a0dc",
  "version": 1,
  "memory_type": "entities"
}
-->
