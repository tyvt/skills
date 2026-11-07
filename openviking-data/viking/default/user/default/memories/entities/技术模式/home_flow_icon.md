# 门户首页业务步骤默认图标
在 `/portal/home/functions` 尚未提供步骤图标或需设计稿占位时，zhi2-web-admin 首页业务中心用本地切图 SVG 作为缺省图标。

## 图标映射方式
- `homeLayout.js` 用 `public/assets/images/homeNew/切图 xxx.svg` 经 `homeNewSliceIcon` 写入 `BIZ_ICON_BY_CODE` 与 `DEFAULT_BUSINESS_FLOWS`
- 覆盖商品房 136–145、存量房 158–163、住房租赁 164–165 等 `functionCode` 区间
- 同一 `functionCode` 可共用切图（如 `devEnterpriseAuth` 与「开发企业管理」共用 136）
- 注释标明「后续改接口读取」便于替换

## 运行时优先级
- 接口返回 `functionIcon` 时优先 `resolveServerAssetUrl`，本地切图仅为缺省回退
- 仅当接口未提供图标时才使用 homeNew 切图 SVG

## 涉及文件
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/public/assets/images/homeNew

## 验证与归属
- 验证证据：会话 51f607f4 用户要求商品房/存量房/住房租赁步骤暂用 homeNew 切图 SVG；结论同步更新 BIZ_ICON_BY_CODE 与 DEFAULT_BUSINESS_FLOWS，并说明接口有 functionIcon 时仍优先接口图标
- 所属项目：门户；来源会话ID：51f607f4-3111-43b3-b27a-2e6b89288149；代码基线：b84b4e7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_flow_icon",
  "source_extraction_id": "64bb4d84a5b24a1c9ba1a0d617819bfd",
  "version": 1,
  "memory_type": "entities"
}
-->