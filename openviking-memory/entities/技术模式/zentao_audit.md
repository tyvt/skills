# 禅道任务完成度四步审计法
判定禅道任务「已完成/未完成」须四步走：story 正文还原、前端代码审计、菜单表核查、权限字符核查，代码写全不等于可交付。

## 审计步骤
- 先从 zt_storyspec 最新版还原 story 正文，因 zt_story 无 desc 列、任务 desc 皆空，只能靠 story 反推
- 建「实体乘功能」矩阵，空项标「未提及」而非留空
- 前端审计逐模块给结论（可标完成/部分完成/不可达）并列出缺口清单
- 查库同时查 COMMON_FRAMEWORK.SYS_MENU 与 SERVICE_EXPAND 两张表，只查一张会漏
- 核按钮权限字符是否与 moduleName:businessName:permissionType 对得上

## 关键反直觉项
- 需求正文从未出现「审批」二字，只有「提交审核/审核通过/已备案」，审批节点角色人驳回回退均数据库无此信息
- 「数据库无此信息」与「未提及」须区分写清，避免后续按虚构审批流排期
- 常见缺口形态：缺需求字段、API 零调用、菜单未注册

## 验证与归属
- 来源会话 session-c3716c15，基线 05caac8，用户对照 4 个禅道任务（评价标准 2084/检查记录 2192/整改通知书 2194/评价报告 2197）
- 结论仅「检查记录」够格标完成，其余为缺字段、只差接线、菜单未注册不可达
- 文档落盘 docs/std-evaluation/requirements.md、docs/std-evaluation/audit-frontend.md
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zentao_audit",
  "source_extraction_id": "f0896f43021441b09295c93548a90738",
  "version": 1,
  "memory_type": "entities"
}
-->