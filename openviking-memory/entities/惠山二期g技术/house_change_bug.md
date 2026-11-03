# 房屋变更页缺项目信息Bug
房屋变更页从房屋数据跳转时缺projectId致楼幢单元选择失败，已通过backfillProjectInfo修复。

## 问题根因
- zhi2-web-admin/src/views/building/houseChange/detail.vue 接口返回缺 projectId
- 触发楼幢/单元对话框校验失败

## 修复方案
- 新增 backfillProjectInfo() 在新增/编辑模式加载后回填 projectId 等关联信息

## 验证与归属
- 验证证据：src=惠山二期G/012.md
- 涉及文件：src/views/building/houseChange/detail.vue、src/views/building/house/detail.vue、src/views/building/buildingTable/index.vue
- 所属项目：惠山二期G；来源会话：9c47b930-1e4a-454a-bb8b-450970d0136c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "house_change_bug",
  "source_extraction_id": "231c4221ac6f44ddb6585f0f9f0386c6",
  "version": 1,
  "memory_type": "entities"
}
-->