# 惠山物管维修资金表决页 decisionType 判定缺陷
zhi1-web-admin 中业主决策/维修资金表决页按路由名第二段判定 decisionType，与惠山菜单实际路由名不符导致页面无数据。

## 问题定位
- 缺陷位置：zhi1-web-admin/src/views/estate/ownerDecision/index.vue:304
- 判定逻辑：`$route.name.split('/')[1] == 'maintain'` 时设 decisionType，否则回落
- 2026-08-03 提交 ae02888b2 把 `'owner'` 全量替换为 `'maintain'`

## 现象与影响
- 惠山菜单实际路由名第二段并非 `maintain`，判定失败后传 `OWNERS`
- 字典正确值应为 `MAINTAIN`，故维修资金表决页列表无数据

## 关联
- 路由 name 由后端菜单接口生成，sessionStorage 有缓存
- 关联任务：禅道 task 2768；链路 chain-20261124-huishan-task2768

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "category": "项目模块",
  "name": "owner_decision_decision_type",
  "source_extraction_id": "d98a33f388a74c3b807cab0b0ee146c8",
  "version": 1,
  "memory_type": "entities"
}
-->