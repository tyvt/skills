# 主包体积超限修复
苏住房C小程序主包构建失败因上传预估超 2048KB，通过调整静态资源白名单解决。

## 问题原因
- 为修图片空白将 images/szf/default.png 加入主包白名单 MAIN_STATIC_PATHS，导致无法裁剪，主包超约 9KB

## 已做调整
- 从 MAIN_STATIC_PATHS 移除 default.png，恢复主包裁剪
- 删除 src/static/images/szf/default.png 主包副本（分包 pages_transaction 保留）
- 恢复 houseCard 的 subpackage="pages_transaction"，兜底图从分包加载
- 保留 ZsImage 的 :key 刷新、thumbnail 字段映射补全及 pages.json 预加载配置

## 验证结果
- 裁剪后主包磁盘 1742.2KB，上传预估 2038.4KB 低于限制
- 涉及文件：pages.json、ZsImage.vue、stockHouse/index.vue 等
- 来源会话ID：dbea5b5a-3444-443d-a782-07bd1b65d66e

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "main_pkg_fix",
  "source_extraction_id": "630b378ab64046fd979a5f252bb10a6b",
  "version": 1,
  "memory_type": "entities"
}
-->