# 分包超2048KB瘦身套路
单个分包源码超 2048KB 限制时，整页迁出到空闲分包并禁跨包引用、全库核对跳转路径。

## 现象与根因
- 上传报 subpackage /pages_owner/ source size 2185KB exceed max limit 2048KB
- 小程序对主包和每个分包分别卡 2048KB（源码态），往分包塞资源无法解决
- 需整块功能迁到空闲分包，且迁出页不可反向引用原分包静态资源（跨包引用真机取不到图）

## 解决方案
- 选迁移目标：成链路页面整体迁到空闲分包（如 income+maintain 迁到 pages_benefit）
- 扫跨包引用：原分包静态图改本分包并复制进目标分包 static，grep 全库确认无原路径残留
- 同步路由：pages.json 迁出页挂新分包；跨分包入口改绝对路径
- 跳转路径全库核对：menuRouteMap 业务编码、tab 组件跳转、外部页入口逐条改新路径
- 重建按分包量体积确认落 2048KB 以下（本次 2037.1KB）

## 验证与归属
- 验证会话 8626c623（基线 48bdb17）：用户要求不跨包引图且核对全库跳转路径
- 涉及文件：pages.json、utils/menuRouteMap.js、pages_benefit/income/index.vue、maintain/detail.vue、pages_tab/components/Project_Jiayuanqu.vue、My_Jiayuanqu.vue、ownerCard/index.vue、scripts/size-owner-package.mjs、validate-dist.mjs
- 所属项目：苏住房C；代码基线：48bdb17

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "subpackage_slim_2048",
  "source_extraction_id": "c00494ad0ab84ac6adf97c304d84084f",
  "version": 1,
  "memory_type": "entities"
}
-->