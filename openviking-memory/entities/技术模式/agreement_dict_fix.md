# 协议签署单据状态查询错位修复
苏住房G 项目协议签署与协议终止列表的「单据状态」字典检索因大小写不匹配导致查询错位，已修复。

## 根因
- initDict 中使用 getDicts('BIZ_STATE')（大写）与全局 store 的 biz_state（小写）及后端过滤语义不一致
- 导致选「审核中」未正确传 bizState=1、选「已备案」未正确传 bizState=2

## 修改内容
- pubRegulatoryAgreement/index.vue 中 getDicts('BIZ_STATE') → getDicts('biz_state')
- pubRegulatoryStopAgreement/index.vue 做了相同替换

## 验证与归属
- 本地冒烟：共有资金→协议签署各选「审核中」「已备案」，Network 确认参数与列表列展示一致
- 涉及文件：pubRegulatoryAgreement/index.vue、pubRegulatoryStopAgreement/index.vue
- 所属项目：苏住房G；来源会话ID：c376e461-5508-4c08-8192-16ac1392a65f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agreement_dict_fix",
  "source_extraction_id": "430d6ab35af442f69d0d52b3be24b130",
  "version": 1,
  "memory_type": "entities"
}
-->