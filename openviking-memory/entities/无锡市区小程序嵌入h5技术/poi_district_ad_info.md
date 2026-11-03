# 周边POI的district须取自ad_info
无锡项目周边 POI 应展示接口返回的 ad_info.district，禁止在 UI 写死其它城市区县。

## 问题根因
- 无锡项目周边 POI 曾在 UI 写死「姑苏区」等其它城市区县，与接口实际返回不符
- 用户反馈无锡项目出现姑苏区，定位为硬编码行政区导致

## 解决方案
- 在 mapPlaceSearchRows 映射 district 字段，项目详情与「全部周边配套」展示为 `{{ item.district }} | {{ item.address }}`
- district 取自腾讯 ad_info.district（如滨湖区、梁溪区），不硬编码
- 去掉未使用的地址解析试探与调试 log

## 验证与归属
- 验证会话：d1940235-a770-4bdf-9633-338e20518be0
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/project/info/index.vue、src/utils/index.js、src/pages/facility/index.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：afae6cd

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "poi_district_ad_info",
  "source_extraction_id": "0957e23374eb461f907f3dcfd6432d36",
  "version": 1,
  "memory_type": "entities"
}
-->