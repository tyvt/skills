# 注册步骤返回要件恢复顺序
注册流程从 Step3/Step4 点「上一步」再前进时，已上传要件列表变空或不再回显。

## 问题现象
- 返回再前进后已上传要件列表为空，E2E 无法继续
- 回填靠 appendixConfigId 关联，后端返回 id 类型/字段不一致致匹配失败静默为空

## 根因分析
- 要件回显依赖要件配置（格子）与已上传列表（每格填什么），先拉列表再拉配置则配置未就绪
- 步骤返回清空已填数据导致重进步骤丢失主键

## 解决方案
- 恢复顺序固定为 loadConfig → loadUploadedList
- enrichUploadedList 对 appendixConfigId 做宽松比对（兼容字符串/数字，必要时按名称+业务编码二次匹配）
- 步骤返回不清空已填数据，重进以接口回显覆盖本地但保留主键
- E2E 提供带保存 helper 避免依赖上一步内存态

## 验证与归属
- 来源会话 706c30d3 修复要点3：Step3Appendix.vue 先 loadConfig 再 loadUploadedList 并增强匹配
- 涉及文件：zhi2-web-admin/src/views/register/components/Step3Appendix.vue、companyRegister/index.vue
- 所属项目：产品2.0；代码基线：5169909

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "register_appendix_recovery",
  "source_extraction_id": "8f12761b41b14e02875c9d92abba45c0",
  "version": 1,
  "memory_type": "entities"
}
-->