# 列表页行政区域筛选标准接入
在 V3 后台列表页新增「行政区域」筛选时，应使用项目公共 area mixin + region-select 搜索项类型，避免手写下拉。
## 问题根因
- 项目已把区划能力沉淀在公共 mixins/area.js（regionOptions、region-select 控件），手写会造出第二套区划数据源与口径。
## 解决方案
- 引入 @/mixins/area.js；queryParams 增加 regionCode 参数随列表请求传后端。
- 筛选项配 type:'region-select'，与 building/plot 等既有列表页写法一致。
- 街道/社区升级为按编码联动下拉时参考 autonomy/preparatoryApply/index.vue，重写 currentRegionCode 并改用 subdistrictCode/communityCode 编码字段。
- 与已知条目 #595 区别：#595 是页面同名 regionOptions 与 mixin computed 撞车，本条是标准接入方式。
## 验证与归属
- 验证证据：会话 56dbde32 在 pubManagementOrg/index.vue 筛选栏加行政区域筛选采用三件套写法。
- 涉及文件：zhi2-web-admin/src/mixins/area.js、zhi2-web-admin/src/views/benefit/pubManagementOrg/index.vue。
- 所属项目：产品2.0；来源会话ID：56dbde32-7046-4d21-81d3-05ad6a8e4261；代码基线：64fa9e2~94b86fa（2026-05~07）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_mixin_region_select",
  "source_extraction_id": "95867fed974048d29a326f877b61667d",
  "version": 1,
  "memory_type": "entities"
}
-->