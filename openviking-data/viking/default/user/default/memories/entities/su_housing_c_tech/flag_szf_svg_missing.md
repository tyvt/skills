# flag-szf.svg 丢失致构建未解析报错
ResultStatistics.vue 与 StepConfirm.vue 引用的 pages_owner/static/images/svg/flag-szf.svg 在工作区丢失，构建报 didn't resolve at build time。

## 问题根因
- ResultStatistics.vue 与 StepConfirm.vue 引用 pages_owner/static/images/svg/flag-szf.svg
- 该 SVG 文件在工作区丢失导致构建报 didn't resolve at build time

## 解决方案
- 从提交 266eadbb 恢复该 SVG 文件

## 验证与归属
- 验证证据：extracted source=cursor session=0a4a1e3a-c1d1-4977-b31d-897f98dd9f49
- 涉及文件：pages_owner/decision/sort/ResultStatistics.vue、pages_owner/decision/components/StepConfirm.vue、pages_owner/decision/styles/sort.scss
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：0a4a1e3a-c1d1-4977-b31d-897f98dd9f49；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "flag_szf_svg_missing",
  "source_extraction_id": "6e5b846ebcdc448fb91edbfc90ee8dc1",
  "version": 1,
  "memory_type": "entities"
}
-->