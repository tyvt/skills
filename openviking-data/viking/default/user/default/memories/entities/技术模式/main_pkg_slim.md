# 小程序主包瘦身与白名单同步
苏住房C 小程序主包超 2048KB 上传限制，通过迁移分包专属资源并同步裁剪 mainStaticPaths 白名单解决。

## 问题背景
- 主包 2204KB 超出微信 2048KB 限制，主包 static 堆了约 300KB 只在分包使用的空状态图
- uni-app 打包时只要资源被主包代码引用（含被 mainStaticPaths 白名单列入）就进主包

## 解决方案
- 盘点主包 static 每张图真实使用方，把 apply-empty.png、empty_house.png 等迁到对应消费分包
- 同步从 src/utils/mainStaticPaths.js 白名单移除 14 项——白名单是「强制留主包」开关，不移除等于白搬
- 只被分包使用的组件（HouseList/PersonList）迁入对应分包 components
- 迁移后回每个引用点修正静态资源路径及 ZsEmpty 默认图与各分包路径
- 迁移逻辑落成脚本 scripts/migrate-main-empty-static.mjs 便于复现

## 验证与归属
- 构建后实测主包 1842KB、pages_owner 1.61MB、pages_transaction 1.80MB
- 涉及文件：src/utils/mainStaticPaths.js、scripts/size-main-package.mjs、scripts/migrate-main-empty-static.mjs、src/pages.json
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 bee1d6dc；代码基线 9832ba3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "main_pkg_slim",
  "source_extraction_id": "81d0452c856b49acb88f4e24cefb5ea2",
  "version": 1,
  "memory_type": "entities"
}
-->