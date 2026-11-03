# Headline 收起占位导致内嵌 Tab 露出修复
淮安物管详情页 Headline 收起后内嵌 zs-tabs/表格仍露出的 CSS/逻辑修复约定。

## 现象
- 公共查询等详情 Headline 点收起后标题藏但内嵌 tab/表格仍显示。

## 根因
- Headline .hide 只设 height:0 未清 padding，height auto→0 过渡不可靠。
- 外层包裹（如 .benefit-asset-section）收起态保留 padding-bottom。

## 做法
- Headline .hide 补 padding:0、overflow:hidden。
- 区块 padding 只绑展开态 :not(.hide)，收起态 padding:0。
- 与折叠强绑定的 Tab/表格用 v-show 跟 Headline 展开状态同步。

## 涉及文件
- zhi2-web-admin/src/components/Headline/index.vue
- zhi2-web-admin/src/views/publicQuery/complex/detail.vue

## 验证与归属
- 验证：会话 ecf792d3 经营资产信息收起后 tab 仍可见；修 detail.vue + Headline/index.vue。
- 所属项目：淮安物管；来源会话：ecf792d3-a14e-431a-bd1e-dd28a0cdae7b；代码基线：dc21427

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_collapse_tab_fix",
  "source_extraction_id": "1b1428061edc4326a5a704254c0befaf",
  "version": 1,
  "memory_type": "entities"
}
-->