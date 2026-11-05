# 苏住房C主包上传预估超限(z-paging)
构建失败因主包上传预估体积超限(2104.1KB>2048KB)，非磁盘体积本身(1798.4KB通过)。新增z-paging/ZsPaging后约92KB被打进主包node-modules，上传预估超约56KB。

## 问题诊断
- 主包磁盘体积 1798.4KB 通过(上限2048KB)
- 上传预估(×1.17) 2104.1KB 超限(上限2048KB)
- 新增z-paging/ZsPaging约92KB被打进主包node-modules导致上传预估超约56KB

## 修复要点
- Project_Suzhufang.vue(苏找房tab页)改回scroll-view+uni-load-more，避免tab主包引用ZsPaging
- ZsPaging组件下沉到分包：pages_transaction/components/ZsPaging/、pages_main/components/ZsPaging/、pages_owner_extra/components/ZsPaging/
- 新增scripts/relocate-z-paging.mjs构建后把z-paging迁移出主包

## 涉及文件与归属
- 涉及Project_Suzhufang.vue、scripts/relocate-z-paging.mjs、scripts/validate-dist.mjs、package.js
- 所属项目：苏住房C(zhi2-mobile-shimin)；来源会话ID：3562f516-f5b6-4ae3-b575-1ef94fe84955

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zpaging_mainpkg_estimate",
  "source_extraction_id": "96ccac645cc742a1b882af762db6e9aa",
  "version": 1,
  "memory_type": "entities"
}
-->