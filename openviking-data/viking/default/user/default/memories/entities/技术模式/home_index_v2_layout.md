# 苏住房G 首页 index-v2 布局
苏住房G 项目 zhi2-web-admin 门户首页 index-v2.vue 已按设计图重做，结构对齐设计稿。

## 布局结构
- 行1：关键数据导航（指标+双列信息盒）、待办事项（新增卡片）、通知公告（原学习园地改名）
- 行2：公共收益（左统计列+右环形图含中心总额）、双晒公示（新增面板：3项统计+行政区划排名进度表）、报事维修
- 行3：物业管理标准化评价（新增全宽面板：物业自查/街道检查/区县检查/市级检查4列+整改进度条）
- 区域栏右侧新增「当前数据统计周期」，各卡片 SegTabs（历史累计/当月数据/图表走势）

## 改动文件
- `index-v2.vue`（布局重排）
- `KeyDataNav/PublicBenefit/TodoPanel/StudyPanel/RepairPanel`（重构/改名）
- 新增 `SunshinePanel.vue`、`EvaluationPanel.vue`、`api/portal/home.js`（新增2接口+mock）
- `repairDataMap/benefitDataMap/keyDataMap`（数据格式化修复）

## 项目归属
- 所属项目：苏住房G（zhi2-web-admin）
- 验证：E2E 像素对比测试跑通，视口对齐1920设计稿

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_index_v2_layout",
  "source_extraction_id": "e91c8e43776c4b0f8697c0204225dc28",
  "version": 1,
  "memory_type": "entities"
}
-->