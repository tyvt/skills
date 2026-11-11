# 苏住房G端首页统计接口
苏住房G(zhi2-web-admin) 首页 V2 统计接口清单，作为手持端数智页数据接入的参考基线（Bug 6456，2026-11-11）。

## 已有接口（后端已实现）
- getKeyData→/property/portal/getKeyData、getBenefitData→/benefit/portal/getBenefitData、getRepairData→/property/portal/getRepairData（PortalController/BenefitPortalController 已实现）✅
- getCheckData→/evaluation/portal/getCheckData（evaluation PortalController 已实现）✅
- getSunshineOverview→/msg/publicNotice/statistics/overview（PublicNoticeController 已实现）✅
- 区域列表 GET /v2.0/system/region/list（parentCode=320500）已实现 ✅

## 缺失接口
- 物业评价（物业管理标准化评价）：G端静态写死全 0，后端 zhi2-evaluation PortalController 仅实现 getCheckData，无对应接口
- 预期 GET /v2.0/evaluation/portal/getEvaluationData（G端）/ getBEvaluationData（B端）
- 返回结构待定义：4 组（物业自查/街道检查/区县检查/市级检查），每组 covered/checked/problem/rectified/notRectified/normal/overdue

## 区域构建
- 区域 chips 由 fetchPortalDeptRegionTabOptions + CITY_WIDE_TAB_OPTION 构建

## 验证与归属
- 来源会话：2026-11-11 Bug 6456 排查
- 关联项目：苏住房G（zhi2-web-admin）、苏住房后端、苏住房防汛C端

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "g_home_stats_apis",
  "source_extraction_id": "387bf149ce1b4686b2e6b90ec45925ed",
  "version": 1,
  "memory_type": "entities"
}
-->