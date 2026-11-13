# 禅道Bug 6520 预售资金监管通知书详情页字典码值显示
预售资金监管银行-资金解款-划拨（用款）通知书详情页「验证标识」「通知书状态」显示数字码值而非中文标签。

## 现象与定位
- 模块：预售资金监管 → 资金解款 → 划拨（用款）通知书详情页
- 现象：「验证标识」「通知书状态」字段显示原始数字码值
- 涉及文件：supervision/unblock/notice/detail.vue:956、supervision/unblock/noticeChange/detail.vue:478

## 根因
- 查看态 DetailTemplate 中这两个字段 type:'tag' 但未传 options，缺字典映射原样显示码值
- 字典 NOTICE_STATE / sys_yes_no 页面早已加载，仅展示层缺参数

## 修复方案与验证
- 两处 tag 项补 options: this.hasVerificationOptions / this.noticeStateOptions
- noticeChange/detail.vue 同链路顺带修复同问题（已在禅道备注说明）
- 子模块 zhi2-web-admin 提交 65b114c93 推送 develop/v3.0.0，父仓 gitlink 1cc13cf 推送
- npx eslint 两文件 exit=0（warning 均为存量基线，无新增）
- npm run build exit=0（2.6.1，2026-11-13 10:37:18，102s）
- 本地 nginx 8098 部署完成（root 直指 dist，/version.json 返回新构建 HTTP 200）
- 页面回显待测试环境复核（未启动 dev server，符合项目约定）

## 禅道回写（2026-11-13）
- bug 6520 置 resolved/fixed，resolvedBy=tiany，assignedTo=zhunan（原报告人）
- zt_action 已落根因+修复+验证备注
- 计划文件 .plan/bug6520-notice-dict-tag.md 置 approved/human_confirmed

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6520",
  "source_extraction_id": "c983f42172af414c99d36805e11da495",
  "version": 1,
  "memory_type": "entities"
}
-->