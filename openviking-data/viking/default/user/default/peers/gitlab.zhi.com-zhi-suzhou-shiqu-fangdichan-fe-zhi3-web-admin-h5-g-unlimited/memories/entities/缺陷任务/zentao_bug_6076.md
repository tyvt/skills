# 禅道Bug 6076 不动产权号标签错误
房产管理系统zhi2-web-admin中项目管理→项目证书管理→不动产权证书列表页字段标签「不动产权号」应改为「不动产权证号」的缺陷任务。

## 根因
- 列表页 StateTable.vue 第61行列表列label、第88行查询项label、第91行占位符均写成「不动产权号」
- 按房产3.0口径，「不动产权号」实际代指地块号，此处展示的是不动产权证号；详情页已正确显示「不动产权证号」，仅列表页有误

## 修复方案
- 改 StateTable.vue 三处纯文案：第61行 label '不动产权号'→'不动产权证号'、第88行 label '不动产权号'→'不动产权证号'、第91行 placeholder '请输入不动产权号'→'请输入不动产权证号'
- 无逻辑变更；列 prop 为 parcelCode，查询 prop 为 realEstateCode（详情页 detail.vue 将两者映射同一值）
- 文件路径：zhi2-web-admin/src/views/projectManagement/certificate/stateLandLic/components/StateTable.vue
- 分支 bug6076-cert-label（独立 worktree 完成，合并后删除），未触碰并行 worktree bug6057/bug6079

## 验证与交付
- diff 仅3处字符串替换，无结构性改动
- ⚠️ 未验证：本地 node_modules 不完整（缺 vite、eslint、vite-ng-plugin-vue2 及 .bin），lint/build 未能执行，属环境限制
- 提交：子模块 2d0c51f03（5582149be..2d0c51f03）→ 父仓库 67b66f7（0a05f67..67b66f7），均已推送 develop/v3.0.0

## 禅道回写
- 2026-11-03 事务化回写：status=resolved, resolution=fixed, resolvedBuild=trunk, resolvedBy=tiany, assignedTo=zhunan（原提交人）
- action id 85977（extra=fixed, read=0），备注含根因/修复/验证/提交号/未验证项

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6076",
  "source_extraction_id": "79a0ceef593a469294fe4e08f870360e",
  "version": 1,
  "memory_type": "entities"
}
-->