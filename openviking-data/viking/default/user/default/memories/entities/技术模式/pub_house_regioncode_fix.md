# 经营用房新增行政区划编码缺失修复
产品2.0 的 benefit/pubHouse 新增时因提交缺少 regionCode 编码导致「行政区划不能为空」问题已修复。

## 问题根因
- 提交 /benefit/pubHouse 时表单缺 regionCode 字段（仅有展示用 regionName）
- subdistrict、community 被转成名称，后端需要编码

## 修复方案
- index.vue 列表页新增弹窗：表单增加 regionCode；选择物业管理区域时 row.region→regionCode，subdistrict/community 直接用编码；B端默认填充小区时 project.region 赋给 regionCode
- detail.vue 详情页新增：同步相同修正

## 涉及文件与归属
- 文件：benefit/pubHouse/index.vue、detail.vue、components/pubHouseDialog.vue、pubVenue/detail.vue
- 所属项目：产品2.0；来源会话：b86fe772-d48c-4f14-83ed-0fae40ff6861；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pub_house_regioncode_fix",
  "source_extraction_id": "9a39b38a52124808ace9dff74296b3b4",
  "version": 1,
  "memory_type": "entities"
}
-->
