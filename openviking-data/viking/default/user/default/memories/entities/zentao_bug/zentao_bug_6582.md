# 禅道 Bug 6582
苏住房G（zhi2-web-admin）系统首页-关键数据导航样式调整，2026-11-13 完成修复并禅道回写 resolved/fixed。

## Description
- 问题标题：【苏住房本地测试环境】系统首页-关键数据导航，样式需要调整
- 报告人 zhunan，指派 tiany
- 期望：1. 关键数据导航的图标适量放大 2. 下方展示数据两边保持对齐
- 禅道元数据：openedBy=zhunan，product=8，project=141，execution=142

## 根因分析
- 图标偏小：`.kd__icon-wrap` 仅 32×32px、`.kd__icon` 仅 18×18px
- 两侧子数据行高不一致：左卡第1组子框（住宅/住宅非住宅）行内单行 min-height:30px（矮），第2组（包干制/酬金制/信托制）纵向双行 min-height:40px（高）；右卡面积子框 30px —— 左卡两行框高不等、左右两侧子数据行上下缘参差，即「两边不对齐」

## 修复（2026-11-13）
- 仅改 `src/views/home/v2/components/KeyDataNav.vue` 纯 scoped CSS，不改模板/逻辑
- `.kd__icon-wrap` 32→40px，圆角 6→8px；`.kd__icon` 18→24px
- `.kd__box` min-height 30→40px，与 `.kd__box--stack`(40px) 及右卡子框统一 → 两卡子数据框等高、左右上下缘齐平
- 子模块提交 `a6bc559fc` 推 develop/v2.6.2-suzhufang，已推送

## 验证与归属
- eslint KeyDataNav.vue exit 0 无告警
- npm run build exitCode=0；产物 dist/assets/KeyDataNav-BenkdgFD.css 确认 40px/24px/min-height 40px 入包
- 本地 nginx 8101（root=D:/repository/苏住房G/dist）截图验证：图标放大、左卡两行等高、右卡两行与左卡行高一致，两侧齐平
- 禅道回写 resolved/fixed，resolvedBy=tiany，assignedTo 退回 zhunan，新增 tiany resolved 动作
- 未执行多区域/多分辨率全量回归（纯CSS无分支差异）

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6582",
  "source_extraction_id": "b2bf673f53294b028993274e5d85e94c",
  "version": 1,
  "memory_type": "entities"
}
-->