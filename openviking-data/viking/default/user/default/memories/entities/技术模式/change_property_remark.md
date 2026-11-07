# 物业变更详情contentInfo追加remark独占行
在产品2.0的autonomy/change/property/detail.vue中在contentInfo最后追加remark字段，独占一行显示。

## 修改内容
- 在contentInfo最后追加remark（显示名“变更内容”）
- layout设置为xs/sm/md/lg/xl全部24，确保独占一行

## 验证与归属
- 验证：extracted source=cursor project=产品2.0
- 涉及文件：D:/repository/产品2.0/zhi2-web-admin/src/views/autonomy/change/property/detail.vue
- 所属项目：产品2.0；来源会话：667f57c4-46bf-4026-b4cf-866c7a9cab67；代码基线：none
- 原有never相关TS报错仍存在，本次修改未新增问题

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_property_remark",
  "source_extraction_id": "c5fda021628641648e01366542bde487",
  "version": 1,
  "memory_type": "entities"
}
-->