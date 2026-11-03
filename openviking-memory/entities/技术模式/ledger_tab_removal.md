# 按项目裁剪台账 Tab 需三处入口同步移除
苏住房G已隐藏「租赁申请」菜单，但统计地图/小区台账里仍能看到对应 Tab，点进去必报错，根因是 Tab 配置在三处各自维护。

## 现象与根因
- 苏住房项目已隐藏「租赁申请」相关菜单，但统计地图/小区台账里仍能看到对应 Tab，点进去必然报错或无意义
- 台账 Tab 不是单一配置，而是「地图抽屉 + 台账详情页 + 本地组件块」三处各自维护：sourceMenuList 定义 value，详情页 index.vue 复制一份 Tab 配置，地图抽屉 overviewContent.vue 按 value === '4' 单独 v-if 渲染组件
- 只改一处会出现「Tab 消失但组件还挂/或组件区空白」的半残状态

## 解法与边界
- 按项目隐藏某个台账 Tab 的标准动作：① statisticsMap/index.vue 的 sourceMenuList 移除 { label: '租赁申请', value: '4' }
- ② statisticsMapDetail/index.vue 同步移除 Tab 配置并删除对应组件块与 import
- ③ overviewContent.vue 删除 value === '4' 的渲染块与 import
- ④ 底部组件文件 assetLease.vue 保留不删，便于后续恢复；改完核对剩余 Tab 顺序连续、默认 Tab（经营资产）仍可正常渲染切换
- 本条针对「同源项目 Tab 配置三副本 + 按 value 分支渲染」，重点是「三处同改、组件文件留档」，与已知清单「隐藏字段/栏目的开关式做法」不同

## 验证与归属
- 会话 8f867382：用户「因苏住房项目，将『租赁申请』相关菜单隐藏了，需同步隐藏『小区台账-租赁申请』tab」
- 结论共修改 3 个文件：sourceMenuList 移除 { label: '租赁申请', value: '4' }；statisticsMapDetail/index.vue 移除 Tab 配置并删 asset-lease 组件块及引用；overviewContent.vue 删除 value === '4' 渲染块；assetLease.vue 保留未删
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、statisticsMapDetail/index.vue、overviewContent.vue、assetLease.vue
- 所属项目：苏住房G；代码基线：3c282a5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ledger_tab_removal",
  "source_extraction_id": "76e464440c524a74abc39276f53511b5",
  "version": 1,
  "memory_type": "entities"
}
-->