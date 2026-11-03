# 从业人员状态字典缺失修复
苏州市房地产监测V3 中从业人员管理页业务状态原取 `personnel_business_status` 字典，后台未配置致 tag 空白、列表直显 0/1/2。

## 问题根因
- 从业人员管理页 (`toB/personnelRecord`) 业务状态原取 `personnel_business_status` 字典
- 后台未配置该字典致 tag 空白、列表直接显示原始值 0/1/2

## 解决方案
- 修改 `src/views/toB/personnelRecord/components/index.vue` 的 `initDict` 列表 tag 改用 `getDicts('biz_state')` 经 `listTableRowAugment` 增强
- 修改 `src/views/toB/personnelRecord/components/detail.vue` 头部 `personnelStatusOptions` 取 `biz_state` 渲染标签

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/125.md
- 涉及文件：src/views/toB/personnelRecord/components/index.vue、src/views/toB/personnelRecord/components/detail.vue、src/utils/personnelStatus.js
- 所属项目：苏州市房地产监测V3；来源会话：003dced8-e465-45b4-8431-b2d33508dfd5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_dict_missing",
  "source_extraction_id": "49b1868bc018469f96c995906c65075e",
  "version": 1,
  "memory_type": "entities"
}
-->