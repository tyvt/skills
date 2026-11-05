# 服务事项列表页服务类别侧边栏修复确认
苏住房G项目确认 develop/v2.6.2-suzhufang 分支服务事项列表页服务类别侧边栏修复已提交，无需重复修改。

## 实际情况
- 262-suzhufang 分支在上一轮批量修分支时未新增独立提交，因代码早已改过
- develop/v2.6.2-suzhufang 的修复在今早 7097f2088（task679）提交，说明未写服务事项
- 改动为移除 motion.div 上的 $store.state.user.terminalType != 'B' 判断，仅保留 class="sort-left"

## 与其他分支区别
- v2.6.1 / v2.6.2 / v2.6.2-yulin 今天新提交了 fix: 服务事项列表页服务类别侧边栏
- 262-suzhufang 分支无新提交，因早已包含该修复

## 验证与归属
- 所属项目：苏住房G；来源会话：e97486f2-5d9a-4ca1-85fc-b2597c02cd4a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "service_item_branch_confirm",
  "source_extraction_id": "51d4b7a1bb0c40548955037bb74a267b",
  "version": 1,
  "memory_type": "entities"
}
-->