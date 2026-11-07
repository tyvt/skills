# 附件window.open未校验URL且组件留日志
首页附件跳转与消息链接缺少URL校验，且CheckDataNav残留console.log，需补校验并清日志。

## 问题根因
- CheckDataNav的progressPct残留console.log
- index-v2.vue附件window.open与消息msgUrl跳转缺少URL校验

## 解决方案
- 对src/views/home/**运行Lint确保零告警
- 补充URL校验并移除残留日志

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：苏住房G/086.md
- 涉及文件：src/views/home/index-v2.vue、src/views/home/v2/components/KeyDataNav.vue、src/views/home/v2/components/CheckDataNav.vue、src/views/home/v2/components/PublicBenefit.vue、src/views/home/v2/components/StudyPanel.vue、src/views/home/v2/homeStatNav.js、src/views/home/v2/studyNav.js、src/views/home/v2/studyDataMap.js
- 所属项目：苏住房G；来源会话ID：a6d1b5a7-1983-49a4-8898-bb4bc9230465；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "home_window_open_log",
  "source_extraction_id": "1af7b39407a248248e8b533ea8f422ce",
  "version": 1,
  "memory_type": "entities"
}
-->