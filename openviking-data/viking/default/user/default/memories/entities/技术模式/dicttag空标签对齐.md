# DictTag 空标签对齐 detail-template
淮安物管详情页 type=tag 字段出现只有 el-tag 底色无文字，根因为 dict-tag.vue 只认 dictValue/dictLabel 未对齐 detail-template 双口径。

## 问题现象
- 详情里 type=tag 字段（如物业合同「物业类型」）只有 el-tag 底色、没有文字；detail-template 的 getItemValueDisplayString 已能识别有值但页面仍空标签。
- 字典项为空时不应渲染空内容标签。

## 根因与修复
- 业务下拉/字典接口常返回 value/label（如 propertyTypeOptions 来自 response.data），而 dict-tag.vue 原只在 findOption 读 dictValue/dictLabel，对不上时 getLabel 为空却仍渲染 el-tag。
- 在 dict-tag.vue 统一与 detail-template：optVal/optLabel/findOption 同时支持 dictValue/dictLabel 与 value/label。
- rawDictParts 解析空串、[]、逗号分隔、数组，避免 String([]) 生成伪空项。
- tagDisplayList 只渲染有展示文案的项；resolveDisplayText 未命中字典时用原始码兜底，禁止空内容标签。根因在公共组件，勿在单个 propertyContract/components/detail.vue 打补丁。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 验证：会话 0063c43c（2026-05-13，基线 6374366）用户反馈 detail-template 空 tag 应展示 -，且 propertyContract 物业类型仍显示空 tag 颜色；结论为双口径不一致，在 dict-tag.vue 完成三处改造。
- 验收：合同详情物业类型等 tag 字段显示中文标签；字典项为空时显示 - 或不渲染空 tag。
- 涉及文件：dict-tag.vue、detail-template.vue、propertyContract/components/detail.vue；所属项目：淮安物管；来源会话：0063c43c-fc2e-49bb-afad-13adaef1e7f5；代码基线：6374366

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "DictTag空标签对齐",
  "source_extraction_id": "11edc2e7c0844408a032189da68a63f0",
  "version": 1,
  "memory_type": "entities"
}
-->