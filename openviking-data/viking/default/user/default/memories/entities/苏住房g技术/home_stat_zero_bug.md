# 首页统计卡数字显示0
苏住房G 门户 G 端首页 index-v2.vue 待办数字卡接口有数据却恒显示 0，根因为计数字段名候选缺项被静默兜 0。

## 问题现象
- /portal/home 返回 {todoNum:3409,finishedNum:36159,myProcessNum:29822}，但待办卡恒显示 0
- 已办与我发起正常，因候选数组恰好含 finishedNum/myProcessNum 全名，属运气非约定

## 根因分析
- loadTaskCounts 用 pickTaskCountField(counts,['todo','todoCount']) 取值，后端键为 todoNum 全未命中
- 取值空后被 `|| 0` 兜成 0 直接渲染，不报错也无空态提示，表现为接口成功数字为 0

## 修复方案
- 把真实字段名 'todoNum' 补进候选数组（旧名在前以兼容），不改单字段直取因后端字段名反复变动
- E2E mock 同步改为后端真实字段名 todoNum，避免 mock 绿线上 0 的假阴性

## 经验沉淀
- 数字卡有一项对得上另一项恒 0，基本可判定候选字段名缺项而非接口未调用
- 凡走候选数组取 -Num/-Count/-Total 后缀计数字段处都要一并核对命名漂移
- 涉及文件 index-v2.vue、src/api/portal/home.js、v2/components/TodoPanel.vue；会话 360057ae；基线 9e5c499

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "home_stat_zero_bug",
  "source_extraction_id": "0486331f426744389b891531c5cf81c6",
  "version": 1,
  "memory_type": "entities"
}
-->