# 首页区域 Tab 顺序须兜底清单与接口结果排序双处落地
苏住房G 首页区域 Tab 展示顺序需同时固定在 DEFAULT_REGIONS 兜底与 initRegion() 接口结果排序，否则跟随后端返回顺序。

## 问题根因
- 区域 Tab 有两个消费方：DEFAULT_REGIONS 无配置时兜底，initRegion() 从 platformConfig.regions 拉列表
- 若 initRegion 直接用接口原顺序渲染，后端调整顺序或返回无序时界面跟着变

## 解决方案
- DEFAULT_REGIONS 改文案与数组顺序（区划代码不变），initRegion() 用同一套区划代码序列对接口结果排序
- regionOptions 被关键数据与检查数据两条区域条共用，改一处两处同步生效
- 动态取数改造后「前端固定排序」是新增层，勿把接口取数改回硬编码数组，也勿只改 DEFAULT_REGIONS 不排序接口结果

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话 c09eef71 用户要求 DEFAULT_REGIONS 兜底顺序为全市之后接张家港、常熟、太仓、昆山、吴江，initRegion() 按统一区划代码排序，结论两处同步排序
- 涉及文件：zhi2-web-admin/src/views/home/index-v2.vue、zhi2-web-admin/src/views/home/v2/components/RegionTabs.vue
- 所属项目：苏住房G；来源会话：c09eef71-ed5e-4ee0-afac-90e1a65e8696；代码基线：15e201a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tab_order",
  "source_extraction_id": "f0896f43021441b09295c93548a90738",
  "version": 2,
  "memory_type": "entities"
}
-->