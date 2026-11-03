# UAT环境BIZ_STATE字典1/2文案与编码对调
苏住房G的zhi2-web-admin列表页因UAT字典配置反了导致业务状态筛选结果颠倒，统一改用biz_state字典修复。

## 问题根因
- 列表页用getDicts('BIZ_STATE')同时做下拉选项和表格回显，UAT环境该字典把1、2的文案与后端编码对调
- 前端原样用dictValue/dictLabel作查询参数，导致选「已备案」实际传bizStatus=1（系统约定1=审核中、2=已备案）
- 静态检查与页面都不报错，属于第三类根因（非字典缺失、非双口径）

## 解决方案
- 列表页业务状态字典统一改成小写biz_state（0待提交/1审核中/2已备案），与详情页、全局store同源
- 在getDicts调用处加注释「勿用BIZ_STATE，部分环境1/2文案与后端编码颠倒」
- 改后下拉若为空先确认系统字典配置的是biz_state而非BIZ_STATE；运维可把BIZ_STATE文案与biz_state对齐

## 验证与归属
- 验证：选「已备案」→请求bizStatus/bizState应为2，列表为已备案记录
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/index.vue
- 所属项目：苏住房G；来源会话：7fa26724-2d29-4dbe-accb-87098bace420；代码基线：315702f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uat_biz_state_dict_reversal",
  "source_extraction_id": "6ae49cdcb1234cc49f4b259d6ba75b4b",
  "version": 1,
  "memory_type": "entities"
}
-->