# 产品2.0复杂变更角标与字典显示修复
产品2.0 项目物业变更详情接入单元格右上角红色三角形变更角标，并修复字典标签匹配导致显示代码的问题。

## 背景与原因
- 物业类型等字典在 formatSelectOptionsDisplay 与 detail-template 的 tag 展示中按 value/label 查找，而 getDicts 与 DictTag 实际用 dictValue/dictLabel，匹配不到回退显示代码。
- 所属社区依赖 communityOptions，dictFormatter 与 communityFormatter 等价；变更后街道与原街道不一致时，当前列表无「变更前」社区只能显示代码。
- 若并行拉取「变更前街道」列表，可能被后返回的当前街道请求整表覆盖，合并失效。

## 修改内容
- formatSelectOptionsDisplay：优先用 dictValue/dictLabel，没有再用 value/label。
- detail-template.vue 中 tag 的 getItemValueDisplayString 同样改为 dict 匹配逻辑。

## 验证与归属
- 涉及文件：detail-template.vue、property/complexChange/detail.vue、src/mixins、src/main.js。
- 所属项目：产品2.0；来源会话：b608284d-b42b-4810-99bd-afe869af0cbd；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_change_display_fix",
  "source_extraction_id": "a75d7e23582d403c85e4b150a612f382",
  "version": 1,
  "memory_type": "entities"
}
-->