# 配套用房需求前端调整
苏州市房地产监测V3 项目将「小区配套用房」统一为「配套用房」并删除「封闭设施」表单。

## 配套用房命名
- 当前仓库无「小区配套用房」文案，配套用房模块已统一为「配套用房」
- 列表/路由：路由信息.json、e2e/fixtures/menu-config.js
- 详情子表：houseTable.vue 标题为「配套用房」
- 若侧栏仍显示「小区配套用房」，多为后台菜单/权限名称，需在系统管理改菜单标题或等接口 meta.title 更新

## 删除封闭设施
- 修改 projectManagement/auxiliaryProject/detail.vue：去掉整块「封闭设施」表单与查看态展示
- 删除相关 form 字段、校验规则及 facilityInfo
- 详情页现为：基本信息 + 配套用房子表
- 若详情接口仍返回封闭设施字段，detailMixins 可能随 form 一并提交（界面已不可编辑）；如需彻底不回写可在保存前剔除

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：路由信息.json、e2e/fixtures/menu-config.js、houseTable.vue、auxiliaryProject/detail.vue、auxiliaryProject/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：0fcad87d-b6db-4906-a704-25d2a6908a00；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supporting_house_pattern",
  "source_extraction_id": "690db916035b49d8a2baa74ec2c78899",
  "version": 1,
  "memory_type": "entities"
}
-->