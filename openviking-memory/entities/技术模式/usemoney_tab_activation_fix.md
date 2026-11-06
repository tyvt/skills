# 用款申请多 Tab 页签激活冲突修复
苏州市房地产监测V3 的用款申请详情页修复了毛坯/精装页签同时激活与子表无数据问题。

## 问题根因
- 毛坯/精装共用同一 versionId 和 deliverType，用 versionId_deliverType 当页签 key 会撞车，两个页签 name 一样都套激活样式
- 子表在 currentTab 未就绪时请求，或 cardValue 与页签对不上，列表拉不到数据

## 修复要点
- 页签 name 改为行下标 0、1、2…（与用款申请等多 Tab 页一致），保证互斥激活
- cardValue 默认 0，加载版本列表后校验是否仍有效
- 子表用 watch currentTab（immediate）在 Tab 就绪后再 getColumn/getList，并带上分页参数

## 验证与归属
- 硬刷新后只有一个页签高亮，各自楼幢数据能出来；若仍为空，检查 /prefund/planDetail/page 入参和返回
- 涉及文件：supervision/unblock/usemoney/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：66577926-e9f6-4492-b968-4c342f004cbe；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "usemoney_tab_activation_fix",
  "source_extraction_id": "fb319a3c5f334f2eb408bff74ee001b7",
  "version": 1,
  "memory_type": "entities"
}
-->