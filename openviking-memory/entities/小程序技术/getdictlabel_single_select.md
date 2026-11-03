# 单选字段误用 getDictLabel 导致多标签拼接
苏住房C 小程序年度预算页单选预算科目被错误拼接成多个标签显示。

## 问题现象
- 后台仅配置一个预算科目「代收代缴收入」，C 端年度预算页显示「代收代缴收入，物业费收入」
- 同页背景灰底 #f7f7f7 仅设在 content-scroll，页面容器白底 min-height:100%，内容少时底部露白

## 根因
- 渲染用 getDictLabel(dictType, value)，该函数按英文逗号 split 后逐项匹配字典再 join，为多选设计
- 单选字段值带逗号或脏数据时静默变成多值拼接，页面像字典串了实际取值函数用错
- 背景色断层因页面根节点未设底色且 min-height 非 100vh

## 解决方案
- 优先用接口下发展示名 budgetSubjectName，不前端二次转译（本项目接口给展示字段不再派生口径）
- 无展示名时只取第一个科目编码精确匹配，禁用 getDictLabel 多值函数
- 背景解法：page 与页面根节点都设底色并改 min-height:100vh，卡片区背景改透明灰避免白色断层

## 验证与归属
- 所属项目：苏住房C
- 来源会话：6222418a-4f22-4b84-9de7-cbcaaf49e929（2026-08-06）
- 代码基线：8fc39d4
- 涉及文件：budget/index.vue、utils/index.js

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "getdictlabel_single_select",
  "source_extraction_id": "57a3eea8f908476fa5da61782238e5bf",
  "version": 1,
  "memory_type": "entities"
}
-->