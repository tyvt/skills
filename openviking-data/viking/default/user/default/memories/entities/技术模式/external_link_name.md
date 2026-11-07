# 外链未解析 name 致 projectName 为空
i淮安H5 的 H5 外链进入只解析 complexId 未同步 projectName，导致依赖 userStore.projectName 的页面显示空。

## 问题根因
- src/App.vue 中 H5 外链进入只解析 complexId 未同步 projectName
- 导致依赖 userStore.projectName 的页面显示空

## 修复方案
- 从 URL 的 name/complexName 解析并写入 store
- 无名称时通过 listComplexCommunitySubdistrictByToken 按 complexId 兜底补全
- 无 complexId 则清空

## 验证与归属
- 验证证据：extracted source=cursor session=1f0e9970-bd03-4731-9554-11ef4c522ce2
- 涉及文件：src/App.vue、src/pages_benefit/assetsPublicity/index.vue、src/store/user.js、src/pages/index/property.vue、src/pages_benefit/benefit/index.vue、src/pages/index/my.vue、src/api/property.js、src/pages_benefit/elevatorPubEngCons/index.vue
- 所属项目：i淮安H5（zhi2-mobile-admin-h5-c-unlimited）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "external_link_name",
  "source_extraction_id": "6a92cd0d2cf745689e77dc42af9f9088",
  "version": 1,
  "memory_type": "entities"
}
-->