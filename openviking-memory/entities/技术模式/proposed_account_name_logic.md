# 拟开户账户名称推导逻辑
园区公共收益 zhi2-web-admin 的 pubRegulatoryAccount/detail.vue 中 form.proposedAccountName 字段的推导规则与触发时机。

## 核心方法
- updateProposedAccountName()（第 981–994 行）按 benefitCompanyRecordType 决定取值
- getDetail()（第 969–980 行）详情回显：后端返回空则前端兜底重算，否则沿用后端值
- changeType()（第 1043 行起）切换管理主体类型后从接口 /benefit/pubManagementOrg/getListByTypeAndProjectId 取 benefitCompanyRecordName 再重算
- 选择物业管理区域后（第 1028–1040 行）调用 updateProposedAccountName() 重算

## 取值规则
- 类型 0/1（业主大会/业委会等）：只读置灰 isProposedAccountNameDisabled（第 411–412 行），值 = 管理主体名称 + 物业管理区域名称 + 公共收益
- 类型 2（物业服务企业）：可手动编辑并显示三要素提示条，值 = 管理主体名称 + 公共收益（不含区域名，区域名靠人工补写）

## 验证与归属
- 所属项目：园区公共收益
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue
- 来源会话：2026-11-05 会话（用户问「拟开户名称数据怎么来的」）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "proposed_account_name_logic",
  "source_extraction_id": "bb98e57bc89e43c287ea1b238c8655e2",
  "version": 1,
  "memory_type": "entities"
}
-->