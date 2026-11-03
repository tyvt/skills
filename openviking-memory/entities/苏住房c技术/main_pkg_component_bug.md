# 主包组件错放导致超限
苏住房C 小程序主包上传预估超限的头号复发根因是把仅分包使用的组件放在主包 components/，需迁回分包并补 componentPlaceholder。

## 问题根因
- 新增 conditionScreening.vue 放在主包 src/components/commonNew/，仅被 pages_transaction 与 pages_main 两个分包引用，约20KB白算进主包。
- 同项目历史复发：AnnouncementNoticeList +13KB、houseCard 兜底图、commonNew 系列组件，均因顺手放公共 components。
- 动态改 MAIN_STATIC_PATHS 白名单去救图片会锁死静态图在主包，是反向操作。

## 解决方案
- 先跑 size-main-package.mjs 看分目录体积，不靠感觉猜。
- 凡只被一两个分包引用的组件一律下沉到对应分包目录（如 pages_transaction/components/xxx/），搬完更新全量引用路径（本次6处）。
- 组件被两个分包共用时，在引用页 pages.json 配 componentPlaceholder 做异步化，不塞回主包。
- 复测同时看磁盘与上传预估(source size)两个数，本次 1741.3KB / 2037.3KB 通过。

## 验证与归属
- 验证：会话 e2f45719（基线 f1939b0）构建失败输出 MAIN 2058.1KB 超 2048KB，迁组件+补 placeholder 后达标。
- 涉及文件：scripts/size-main-package.mjs、prune-main-static.mjs、src/utils/mainStaticPaths.js、src/pages_transaction/components/conditionScreening/、src/pages.json。
- 所属项目：苏住房C；来源会话ID：e2f45719-4e81-4713-9b87-20e91abcd5a1；代码基线：f1939b0。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "main_pkg_component_bug",
  "source_extraction_id": "f87d2cf27ae64c63b44413b81e23b987",
  "version": 1,
  "memory_type": "entities"
}
-->