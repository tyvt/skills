# Summary
在苏住房G项目 zhi2-web-admin 中，B 端企业从业人员登录后，物业服务人员、收费标准、物业费账单、年度预算、支用合同、保单管理、用款申请、支取通知书等 9 个模块看到全量数据（选择区域弹窗列出全部 2624 条）而非授权小区。根因为这些模块只按机构维度过滤，登录时选中的小区只存在 store 未拼入请求。做法：以 isBTerminalPractitioner 判定入口（不能用 terminalType 判空），在 utils/projectContext.js 抽 applyBTerminalProjectFilter()，mixins/bTerminalProjectMixin.js 统一注入 projectId 与 complexId 双参数、区域弹窗带同双参数、新增页区域字段自动回填并 regionLocked 禁止改。来源会话 8aa7c044，基线 805ea8c。
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】B 端企业人员按「登录选中小区」做数据隔离：projectId + complexId 双参数 + 区域锁定回填，靠公共 mixin 一次覆盖多模块
【内容】现象：B 端企业从业人员登录后，物业服务人员、收费标准、物业费账单、年度预算、支用合同、保单管理、用款申请、支取通知书等模块看到的是全量数据（选择物业管理区域弹窗列出全部 2624 条），而不是自己获授权的那一个小区。根因：这些模块的列表与选择弹窗只按机构维度过滤，没有任何「当前项目/小区」上下文；登录时选中的小区只存在 store 里，从未拼进请求。做法：判定入口统一为 `isBTerminalPractitioner`（不能用 terminalType 判空，见已知 #990）；在 `utils/projectContext.js` 抽 `applyBTerminalProjectFilter()`，`mixins/bTerminalProjectMixin.js` 统一做三件事——① 列表 getQueryParams 同时注入 `projectId` 与 `complexId`（值都取登录时选中的小区 ID，多数接口两个都认）；② 选择区域弹窗的 filterParams 带同双参数，避免拉全量；③ 新增页把区域字段自动回填并 regionLocked 禁止改。接入方式是逐模块 `getQueryParams` 调同一个函数，而不是各页自写一份。注意：某接口只认其中一个参数时单独调整，不要为了统一而删掉另一个。差异点：已知清单里没有「B 端多租户数据隔离」这一类条目，#990 只讲端别判定，#102 的 complexId 是另一个项目的字段名语义。
【验证证据】会话 8aa7c044（基线 805ea8c）：用户要求「阳光物业: 物业服务人员、收费标准、物业费账单、年度预算、支用合同、保单管理、用款申请、支取通知书等需要只显示选中的授权物业管理区域。企业人员要加 projectId 参数，complexId 也传，都是登录时选中的小区 ID」。结论：projectContext.js 新增 applyBTerminalProjectFilter()，bTerminalProjectMixin.js 支持双参数过滤/区域锁定/新增页自动回填，覆盖 9 个列表页 + 各详情页与选择弹窗；效果为「选择弹窗不再出现全部 2624 条」。
【涉及文件】zhi2-web-admin/src/mixins/bTerminalProjectMixin.js ; zhi2-web-admin/src/utils/projectContext.js ; zhi2-web-admin/src/utils/terminalUser.js ; zhi2-web-admin/src/views/property/propertyWorker/index.vue ; zhi2-web-admin/src/views/property/propertyWorker/detail.vue
【所属项目】苏住房G
【来源会话ID】8aa7c044-e925-4a4e-ba97-9a655aee1d58
【代码基线】805ea8c

<!-- MEMORY_FIELDS
{
  "event_name": "B端小区数据隔离补全",
  "goal": "数据隔离补全",
  "summary": "在苏住房G项目 zhi2-web-admin 中，B 端企业从业人员登录后，物业服务人员、收费标准、物业费账单、年度预算、支用合同、保单管理、用款申请、支取通知书等 9 个模块看到全量数据（选择区域弹窗列出全部 2624 条）而非授权小区。根因为这些模块只按机构维度过滤，登录时选中的小区只存在 store 未拼入请求。做法：以 isBTerminalPractitioner 判定入口（不能用 terminalType 判空），在 utils/projectContext.js 抽 applyBTerminalProjectFilter()，mixins/bTerminalProjectMixin.js 统一注入 projectId 与 complexId 双参数、区域弹窗带同双参数、新增页区域字段自动回填并 regionLocked 禁止改。来源会话 8aa7c044，基线 805ea8c。",
  "ranges": "16-25",
  "source_extraction_id": "306ba4a7365b4d7aac64e8634a2722fa",
  "version": 1,
  "memory_type": "events"
}
-->