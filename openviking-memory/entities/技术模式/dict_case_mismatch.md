# 字典编码大小写错位导致筛选反序
苏住房G共有资金协议列表因getDicts('BIZ_STATE')大写键残留，使筛选参数与展示完全反序，须统一小写biz_state。

## 问题根因
- 系统字典同时存在BIZ_STATE与biz_state但dictValue-label对应不同，大写键回退到别的字典
- 下拉框「审核中」绑定码值与后端bizState过滤语义相反，勾选值与dict-tag展示不同源

## 解法要点
- 搜索区字典键必须与表格列dict-tag、全局store的biz_state三者同名同源
- pubRegulatoryAgreement/index.vue与pubRegulatoryStopAgreement/index.vue的getDicts('BIZ_STATE')改为getDicts('biz_state')
- 修完须逐项在Network核对传参与label一致；同类复制页面一并替换

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 现象：按审核中查返回已备案、按已备案查返回审核中
- 涉及文件：benefit/pubRegulatoryAgreement/index.vue、pubRegulatoryStopAgreement/index.vue
- 所属项目：苏住房G；来源会话ID：c376e461-5508-4c08-8192-16ac1392a65f；代码基线：9e5c499

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_case_mismatch",
  "source_extraction_id": "6e75b43cde7c4ebca6d3d7d4b85aa3cc",
  "version": 1,
  "memory_type": "entities"
}
-->