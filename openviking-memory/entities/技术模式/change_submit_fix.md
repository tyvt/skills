# 企业档案变更提交按钮显隐修复
产品2.0 的 zhi2-web-admin 修复企业档案变更页「保存」「提交」按钮同时出现的问题，并补充 E2E 断言。

## 问题根因
- 点击「变更」后 getLastChangeByLogin 立刻返回变更单 ID，原 showSubmitBtn 只判断是否有 ID
- 导致刚进入编辑页时「保存」和「提交」同时出现

## 修复内容
- toB/companyRecord/detail.vue 新增 changeDetailPersisted 状态控制「提交」按钮
- 刚发起变更（详情接口未命中）仅显示保存、隐藏提交；保存成功或重新打开草稿才显示提交
- company-record-change.spec.js 测试 02 增加断言：进入仅有保存，保存成功后才出现提交

## 涉及文件与归属
- 涉及文件：toB/companyRecord/detail.vue、company-record-change.spec.js
- 所属项目：产品2.0；来源会话：81d50d9d-8547-44b3-96d3-8541338567c3；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_submit_fix",
  "source_extraction_id": "0d97247c6f304cc4a9cc4f1e6b453cb7",
  "version": 1,
  "memory_type": "entities"
}
-->
