# 设施详情页用formMode判断查看态
设施详情页（FacilityDetail）使用 detailMixins 的 formMode（add/edit/view）判断查看态，而非 dialogMode。

## 问题背景
- 巡检周期弹窗模板曾误用 `dialogMode`，但 FacilityDetail 未定义该属性，导致 Vue 警告
- `dialogMode` 一般出现在独立弹窗子组件（通过 props 传入）
- 本页详情走 `detailMixins` 里的 `formMode`

## 修改做法
- 将第 955 行改为 `<DetailTemplate v-if="formMode == 'view'" :data="inspectionCycleInfo" />`
- 与页面其他区块（contentInfo、contentInfo3）的 `formMode == 'view'` 判断一致
- `facilityChange/detail.vue` 中有相同写法，已一并修改

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/facility/detail.vue、facilityChange/detail.vue、mixins/detailMixins.js
- 所属项目：产品2.0；来源会话：46f27f37-13c0-41e5-8c63-7986f337f5da；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "facility_detail_formmode",
  "source_extraction_id": "6e0f002672a049a3a4a088edec38ef06",
  "version": 1,
  "memory_type": "entities"
}
-->
