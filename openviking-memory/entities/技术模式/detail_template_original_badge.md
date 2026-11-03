# 详情模板变更前原值角标
detail-template 新增「变更显示」能力，单元格右上角红色三角显示原值，需保证原值与主值走相同 formatter/字典/区划链路。

## 问题根因
- 原值单独放在详情接口返回的 originalObj，与主对象字段同名，但未走与主值相同的格式化
- 字典展示有两套键：getDicts/DictTag 用 dictValue/dictLabel，旧函数只查 value/label 导致静默露码（物业类型、所属社区）
- 所属社区依赖 subdistrict 社区列表，变更前后街道不同时并行请求会竞态覆盖 communityOptions
- 原值不经 formatter 时日期、金额、字典字段两侧不可比

## 修复方案
- 字段配置挂「变更前取值」绑定 originalObj 同名 key，渲染走与主值完全相同的 formatter/字典/区划链路后比较，相同则不出三角
- 字典展示统一优先 dictValue/dictLabel 再回退 value/label
- 社区选项顺序加载：先拉当前 subdistrict 社区，若 originalObj.subdistrict 存在且不同再拉一次 merge，不做并行
- formatSelectOptionsDisplay 与 detail-template 的 tag 展示串改 dictValue/dictLabel；所属社区改走 formatCommunityDisplay
- detailCallback 用 loadCommunityOptionsForDetail 顺序请求并 merge 避免竞态覆盖

## 验证与归属
- 验证证据：用户诉求 1-6 与最终结论（formatSelectOptionsDisplay、detail-template tag 串改、loadCommunityOptionsForDetail 顺序合并）
- 涉及文件：detail-template.vue、property/complexChange/detail.vue、detailMixins.js、area.js、dict-tag.vue
- 所属项目：产品2.0；来源会话：b608284d-b42b-4810-99bd-afe869af0cbd；代码基线：6da8974

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_original_badge",
  "source_extraction_id": "13dd120e07024e50a04d22b10abf5663",
  "version": 1,
  "memory_type": "entities"
}
-->