# 禅道 Bug 6582
苏住房G（zhi2-web-admin）系统首页关键数据导航样式调整，2026-11-13 完成修复并禅道回写 resolved/fixed。

## 问题信息
- 【苏住房本地测试环境】系统首页-关键数据导航样式需调整；报告人 zhunan，指派 tiany；openedBy=zhunan，product=8，project=141，execution=142。
- 期望：关键数据导航图标适量放大；下方展示数据两边保持对齐。
- 根因：`.kd__icon-wrap` 仅 32×32px、`.kd__icon` 仅 18×18px 偏小；左卡第 1 组子框（住宅/住宅非住宅）单行 min-height 30px、第 2 组（包干制/酬金制/信托制）双行 40px、右卡面积子框 30px，两侧子数据行上下缘参差。

## 修复过程
- 首次（2026-11-13）：仅改 KeyDataNav.vue 纯 scoped CSS，不改模板/逻辑；`.kd__icon-wrap` 32→40px、圆角 6→8px，`.kd__icon` 18→24px，`.kd__box` min-height 30→40px 与 `.kd__box--stack`(40px)、右卡子框统一；提交 a6bc559fc「style(home-v2): 关键数据导航图标放大并统一子数据框高度使两侧对齐 (zentao#6582)」，推 develop/v2.6.2-suzhufang。
- 二次（2026-11-13）：用户实测红框子数据框仍不等高（左行1=40px、左行2两行字=49px、右卡=40px），要求红圈框一样高；根因是单行 min-height 40px 被两行文字撑高至 49px，改为 `.kd__box` 与 `.kd__box--stack` 均 `height:50px; min-height:50px`（容纳两行不裁切），公司行 `.kd__box--company` 不强制改；本地 4bfd385d9，pull --rebase 后推送 8bd507eab。
- 已知：右卡标题「专业化物业管理住宅小区面积（万㎡）」折行致首框起点比左卡低十余像素（顶端对齐未处理）。

## 验证与归属
- ESLint KeyDataNav.vue exit 0 无告警；npm run build exitCode=0，产物 dist/assets/KeyDataNav-BenkdgFD.css 确认 40px/24px/min-height 40px 入包。
- 本地 nginx 8101（root=D:/repository/苏住房G/dist）Playwright 截图实测图标放大、框等高，二次修复后四组框全部 h=50px（2026-11-13 本会话实测数值）。
- 远程测试环境 unlimited.g.h5.admin.web.v2.suzhufang.shiqu.suzhou.test.zhi.com 为独立构建部署，需该环境自行重建分支；当时仍部署旧 40px 构建，待 pipeline 构建 8bd507eab 后 Ctrl+F5 强刷查看。
- 禅道回写 resolved/fixed，resolvedBy=tiany，assignedTo 退回 zhunan，新增 tiany resolved 动作；未执行多区域/多分辨率全量回归（纯 CSS 无分支差异）。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6582",
  "source_extraction_id": "ea1e646a42ea4607b9574fa2d2ca1744",
  "version": 5,
  "memory_type": "entities"
}
-->