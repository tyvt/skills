# assetLease.vue字典初始化与切换按钮修复
资产租赁页 assetLease.vue 存在资产类型列空白及顶部切换按钮未传资产类型重新请求接口的问题，已在会话 6baca9f8 中修复。

## 问题根因
- 资产类型列使用 dictFormatter 依赖预加载字典
- assetLease.vue 未初始化字典，导致格式化无数据可查
- 缺失字典包括 BIZ_STATE、PUB_ASSET_TYPE、PUB_SETTLEMENT_MODE、PUB_LEASE_MODE、PUB_LEASE_TYPE、sys_yes_no

## 解决方案
- 在 assetLease.vue 补齐与 pubAssetLease/index.vue 一致的字典初始化逻辑，包含 BIZ_STATE、PUB_ASSET_TYPE、PUB_SETTLEMENT_MODE、PUB_LEASE_MODE、PUB_LEASE_TYPE、sys_yes_no
- 确保字典在列渲染前完成加载，资产类型列正常显示中文名称

## 切换按钮传参修复
- 顶部 4 个圆角按钮 value 分别为 '4' | '3' | '2' | '1'
- 点击时更新 activeAssetType、写入 queryParams.assetType、重置 pageNum=1 并调用 getList() 重新请求 listPubAssetLease 接口
- 接口参数始终带当前资产类型，保留从地图传入的 leaseProje

## 验证与归属
- 验证：会话 6baca9f8-fd57-451d-8849-6e4937fcffa8 资产类型列空白修复
- 涉及文件：assetLease.vue、pubAssetLease/index.vue
- 来源会话ID：6baca9f8-fd57-451d-8849-6e4937fcffa8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "dict_init_blank",
  "source_extraction_id": "aaadbf8ca9be4ccba8e374a3527b183d",
  "version": 2,
  "memory_type": "entities"
}
-->