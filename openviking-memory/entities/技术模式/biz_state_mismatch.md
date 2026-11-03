# 查询筛选与列表结果反着来（BIZ_STATE 常量错位）
苏房G 整改通知书列表筛「已备案」查出审核中、筛「审核中」查出已备案，根因是查询区用了本地 BIZ_STATE 常量而列表走全局 biz_state 字典。

## 问题根因
- 同一页面并存两套字典：查询下拉用本地 `BIZ_STATE` 常量（码值与后端约定相反），列表展示走全局 `biz_state`（1=审核中、2=已备案）
- 两套口径码值非简单对调而是语义错位，导致接口入参 status 与展示列对不上

## 解决方案
- 查询区字典统一改为全局 `biz_state`，参数名从 `status` 收敛为 `bizState`，与同模块申诉、修复等页一致
- 改完按「选已备案→传 bizState=2」「选审核中→传 bizState=1」两条验证，并同步检查重置逻辑
- 排查顺序：先确认列表展示用哪个字典，再找查询区用哪份常量，不一致即根因，勿先怀疑后端

## 验证与归属
- 与 #249（业务状态统一走全局 biz_state，但只替换本地静态数组、BIZ_STATE 常量保持原样）区别：本条给直接症状，#249 讲改动边界「别误改常量」
- 验证：rectificationNotice/index.vue 查询区 BIZ_STATE 与列表 biz_state 码值不一致；修复为统一 biz_state、参数改 bizState，两状态互不串
- 涉及文件：zhi2-web-admin/src/views/evaluation/rectificationNotice/index.vue、src/mixins/listMixins.js、src/mixins/table.js
- 所属项目：苏住房G；来源会话：d13d65c9-9c9c-46c7-a385-c74d24a4cbbb；代码基线：d109b83

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "biz_state_mismatch",
  "source_extraction_id": "38ebea9130674fadb31f6f1b20393453",
  "version": 1,
  "memory_type": "entities"
}
-->