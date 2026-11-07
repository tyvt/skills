# 记录流程页被维保/巡检/年检三入口复用
在产品2.0的zhi2-web-admin中，dataProperty/recordProcess下的components/index.vue是巡检、维保、年检三个入口共用的记录列表内核。

## 问题背景
- 原统一「巡检人」列需按类型显示为巡检人/维保单位/年检单位
- 在模板写死字符串会导致三入口分叉，新增类型需改模板

## 解决方案
- 页面域enums.js增加RECORD_ORG_COLUMN_LABEL映射：'1'维保→维保单位，'2'巡检→巡检人，'3'年检→年检单位，缺省「巡保人」
- 组件加computed orgColumnLabel = RECORD_ORG_COLUMN_LABEL[this.recordType]，列配置label: this.orgColumnLabel
- 保留原有formatInspectUser回退（inspectOrg为空显recordUser），列名分支与取值回退独立

## 验证与归属
- 验证证据：会话3ea78a99诉求3列名按类型显示
- 涉及文件：dataProperty/recordProcess/enums.js、components/index.vue、patrol/index.vue、maintain/index.vue
- 所属项目：产品2.0；来源会话：3ea78a99-5d38-464d-b621-452601150b10；代码基线：64fa9e2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_process_reuse",
  "source_extraction_id": "67b23d034f0041818d5b4edc1485c979",
  "version": 1,
  "memory_type": "entities"
}
-->