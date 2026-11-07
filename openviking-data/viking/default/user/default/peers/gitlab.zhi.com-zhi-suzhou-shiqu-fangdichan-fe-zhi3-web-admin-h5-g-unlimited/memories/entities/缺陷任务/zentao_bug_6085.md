# 禅道Bug 6085 价格备案参数区域选择
价格备案参数维护详情页「区域」用级联控件展示全国省市区，需求仅可选苏州市的缺陷任务。

## 根因
- 详情页用 location-cascader 展示全国省市区，需求仅可选苏州市

## 修复方案
- 改 zs-region-select，取 platformConfig.region=320500 的直属下级区县
- 提交仍组合 320000,320500,区码
- 补齐 regionName 展示与区划数据加载
- 改动 priceParameters/detail.vue +24/-8

## 验证与交付
- 提交 a3039d8ac
- 禅道 resolvedBy=tiany/assignedTo=zhunan

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6085",
  "source_extraction_id": "38eac9a37d954bfca6e3c6b80c3dec62",
  "version": 1,
  "memory_type": "entities"
}
-->