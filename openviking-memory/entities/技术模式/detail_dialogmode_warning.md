# 详情页误用dialogMode触发Vue警告
园区物管2.0 设施详情页因 FacilityDetail 未定义 `dialogMode` 属性、却依赖 detailMixins 的 `formMode`，触发 Vue 警告。

## 问题根因
- FacilityDetail 未定义 `dialogMode` 属性
- 详情页依赖 detailMixins 的 `formMode` 判定视图模式

## 解决方案
- `facilityDetail/detail.vue` 第 955 行改 `v-if="formMode == 'view'"`
- `facilityChange/detail.vue` 模板同步改为 `v-if="formMode == 'view'"`，与其他区块一致

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/082.md
- 涉及文件：maintenance/facility/detail.vue、mixins/detailMixins.js、mixins/form.js、maintenance/facilityChange/detail.vue
- 来源会话：46f27f37-13c0-41e5-8c63-7986f337f5da；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_dialogmode_warning",
  "source_extraction_id": "36adc3f9f252485a8b7cdd7530b6990f",
  "version": 1,
  "memory_type": "entities"
}
-->