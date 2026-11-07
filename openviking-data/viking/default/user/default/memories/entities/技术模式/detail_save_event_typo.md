# 因保存事件名称写错导致操作按钮无响应
在 淮安物管 (zhi2-web-admin) 项目中，branchInformation 的 detail.vue 使用了 @save1234qweR="submitForm" 而不是标准的 save 事件。

## 问题
- operation-btn-group 组件只触发 save 事件
- 非标准事件 @save1234qweR 未被捕获，保存按钮无响应

## 解决方案
- 修正为 @save="submitForm" 以响应保存操作

## 验证
- cursor 会话 2d7e9be2-2c2b-4dc0-bb76-1942eb9b0244
- 涉及文件: D:/repository/淮安物管/zhi2-web-admin/src/views/system/branchInformation/detail.vue

## 验证与归属
- 所属项目：淮安物管
- 验证证据：extracted source=cursor project=淮安物管
- 来源会话：2d7e9be2-2c2b-4dc0-bb76-1942eb9b0244


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_save_event_typo",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 1,
  "memory_type": "entities"
}
-->
