# 禅道Bug 6420 个人工作牌信息展示UI换行
Bug 6420：经纪机构-从业人员备案申请，查看个人工作牌的信息展示UI换行（应完整显示不换行）；zhunan 提交、tiany 处理，2026-11-10 修复并回写。

## 基本信息与现象
- 提交人 zhunan；处理人 tiany；状态 2026-11-10 回写后 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhunan
- 产品 product=7、project=200、execution=201
- 附件截图 fileID=22205（测试人员红框标注）
- 路径：经纪机构-从业人员备案申请 → 个人工作牌弹窗 WorkCardDialog.vue

## 根因定位
- 文件 zhi2-web-admin/src/views/institution/agencyPersonnel/components/WorkCardDialog.vue（仅 CSS 改动）
- 问题1：姓名「卢小飞」竖排换行 —— `.work-card__name` 是无 white-space 约束的 flex 子项，被压缩到 min-content 后折行
- 问题2：「所属机构：测试经纪机构110315」的值「35」折到第二行 —— `.work-card__info` 的 margin-left:55px 使值区仅约 189px，容不下 13 字机构名（约 190px）

## 修复与提交
- `.work-card__name` 增加 `flex-shrink: 0; white-space: nowrap;`（姓名永不折行）
- `.work-card__info` margin-left:55px → 24px，值区拓宽至约 220px，常规机构名单行完整显示（超长仍走 word-break:break-all 兜底）
- 提交 acce81111 推 develop/v3.0.0；推送前 rebase 远端新提交
- eslint 0 error 0 warning；宽度按 560px 卡片布局复算可容纳测试用例值

## 回写与关联
- 2026-11-10 DBX 事务回写：bug 6420 → resolved/fixed/trunk，解决人 tiany，指派回 zhunan，zt_action id 90266 附根因+修复+验证说明
- 未验证项：浏览器视觉验证需客测环境（58.210.252.230:9002）部署新构建后复核
- 同模块关联：bug 6424（AgencyPersonnelDetail.vue）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6420",
  "source_extraction_id": "2ad88865e396413c9a25c62fd6f037e2",
  "version": 1,
  "memory_type": "entities"
}
-->