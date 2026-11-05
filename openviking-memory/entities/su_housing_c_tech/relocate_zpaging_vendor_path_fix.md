
# 分包 z-paging require 路径未更新修复
苏住房C构建脚本 relocate-z-paging.mjs 复制 z-paging 到分包后，未更新 common/vendor.js 的 require 路径，导致分包内路径错误。

## 问题根因
- 构建时 relocate-z-paging.mjs 把 z-paging 从主包复制到 pages_transaction 等分包
- 复制后 z-paging.js 里的 require('../../../../common/vendor.js') 未更新
- 分包内路径错误解析为 pages_transaction/common/vendor.js（不存在），实际应指向主包 common/vendor.js

## 修复方案
- 更新 scripts/relocate-z-paging.mjs：复制到分包后遍历分包内所有 z-paging 的 .js 文件
- 将 common/vendor.js 的 require 路径动态修正为主包路径
- 支持对已构建产物重新执行修补（主包 z-paging 已删除时也能跑）
- dist 目录已执行修补，pages_transaction、pages_main、pages_owner_extra 三个分包均已修正

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：scripts/relocate-z-paging.mjs、z-paging.js、pages_transaction/common/vendor.js、common/vendor.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：498170bd-f084-43ab-8e01-034612613ebd；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "relocate_zpaging_vendor_path_fix",
  "source_extraction_id": "b4dab85f66b143b3b0951d4f778fb563",
  "version": 1,
  "memory_type": "entities"
}
-->