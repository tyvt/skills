# agent-browser 调用上限与强制交接流程
前端实机验证依赖 agent-browser，其会话级调用上限与成本阈值会强制中断任务并触发交接。

## 约束
- agent-browser 守卫按会话计，全会话累计超过 12 次调用即被 verify-loop 拦截，换执行路径无法绕过
- 会话成本达阈值会触发强制 handoff，须按 9 段式交接文档停手并排程新会话（如 2026-11-24 09:20:10 新会话）

## 流程影响
- 前端验证门要求实机验证通过后才提交、推送、回写禅道；未实机验证时只做交接，不下结论
- 站点若需验证码登录且手上仅有备案业务账号（如 8103「昆山物业公共服务平台」），验证会被阻塞，出图顺延到下一跳

## 应对
- 提前规划浏览器调用次数，避免验证阶段耗尽配额
- 交接文档需写明已落地改动、构建/ESLint 结果、未验证原因与下一跳待办

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "verify_loop_handoff",
  "source_extraction_id": "07f6d5383f84443283aa84f8c5522090",
  "version": 1,
  "memory_type": "entities"
}
-->