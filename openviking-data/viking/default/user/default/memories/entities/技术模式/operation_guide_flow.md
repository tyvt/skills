# 操作指引「我是开发商」页签九步流程卡片
苏州市房地产监测V3 操作指引页新增「我是开发商」页签的九步流程卡片分支（.og-flow），原有 cards 分支与 buy 页签未改动。

## 结构与样式
- 新增 `.og-flow` 容器，共 9 张流程卡片，按两行 [5,4] 排布，卡片之间箭头 [4,3]
- 卡片顶边与序号圆圈为蓝色 `rgb(42,95,170)`、白字，底部按钮文案「开发企业入网」，点击跳转 `/#/login`
- 九条标题/说明文案与设计稿逐字匹配，页面不再渲染 `.og-callout`
- buy 页签沿用同款圆圈卡片风格，本次 developer 流程与其视觉统一

## 验证结果
- 8092 实机新构建（buildTime 2026/11/24 09:17:22）DOM 断言全过：`.og-flow` 出现、9 卡、两行 [5,4]、箭头 [4,3]、`.og-callout`=0、无横向溢出
- 1256px 视口下第 5 张卡换行是 flex-wrap 正常响应式表现（nowrap 撑宽实测 5 卡可同一行），非布局缺陷
- 交互回归：按钮跳转 `/#/login` 通过；切 `tab=buy` 仍显示原有「认购→签订合同→合同备案」流程，无 `.og-flow` 泄漏

## 涉及文件与提交
- 改动文件：`OperationGuideBody.vue`、`operationGuideContent.js`（均在 src 目录下）
- 计划提交信息：`feat(operationGuide): 我是开发商页签改为九步流程卡片`，目标分支 develop/v2.6.2-portal，提交后需回写父仓 gitlink
- `public/version.json` 属构建产物禁提交，未跟踪的 `_review.json` 为过程产物不提交
- 证据图存放于 `C:\Users\Administrator\AppData\Local\Temp\portal-verify-20261124\`（developer-flow.png、buy-tab.png），用户已确认通过提交


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_guide_flow",
  "source_extraction_id": "14b8634e7b694b8bb3489b489e4d2498",
  "version": 1,
  "memory_type": "entities"
}
-->