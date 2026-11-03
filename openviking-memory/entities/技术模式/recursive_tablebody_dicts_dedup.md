# 递归附件 TableBody 重复拉字典需模块级 Promise 去重
太仓G端维修资金要件 AnnexContainer 递归 TableBody 每层 created 重复 getDicts，多实例对话框宜模块级缓存去重。

## 问题描述
- AnnexContainer 的 TableBody.vue 为递归组件，每层 created 调 getDicts('sys_yes_no') 按树深度倍增请求；yesOrNoOptions 未使用应删除
- FileListDialog 随递归产生多实例，每个实例 created 拉 FILE_TYPE 同样 N 次

## 修复约定
- FileListDialog 用模块级 ensureFileTypeOptions（首次请求缓存 + 并发共用同一 Promise），整页只打一次字典
- 若需全站去重再下沉到 getDicts 封装

## 验证与归属
- 验证证据：会话 82f1e5be 用户报 sys_yes_no 与 FILE_TYPE 重复调用，结论删无用 sys_yes_no 请求并为 FILE_TYPE 加模块缓存
- 涉及文件：zhi1-web-admin/src/views/repairFunds/usage/fundUsageKs/components/AnnexContainer/components/TableBody.vue、FileListDialog.vue
- 所属项目：太仓G；来源会话：82f1e5be-80bb-4d16-827c-0a7d2778a100；代码基线：df87537

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "recursive_tablebody_dicts_dedup",
  "source_extraction_id": "9f1553d11e6748dbbd5b1e168b4a4daf",
  "version": 1,
  "memory_type": "entities"
}
-->