# 苏找房全部Tab二手房图片空白修复
苏住房C 苏找房「全部」Tab 二手房图片空白问题已定位并修复，根因含接口缺图、分包默认图不可达、字段映射错与 H5 混内容。

## 问题根因
- `listRecommend`（全部 Tab）返回二手房记录 `thumbnail` 均为 `null`（如「绿聚未来商业中心」「湖居世家」），接口本身无图片字段
- 默认占位图 `default.png` 放在 `pages_transaction` 分包，苏找房 Tab 属主包页面，分包未预加载时占位图路径不可访问致空白
- 部分接口返回 `imageUrl` 而非 `thumbnail`，原映射 `imageUrl: e.thumbnail` 覆盖已有图片地址
- 生产配置图片代理用 `http://`，HTTPS WebView 中可能拦截 `/zs-fym/` 图片（影响有图房源）

## 修复要点
- 将 `src/static/images/szf/default.png` 复制到主包，确保 Tab 页直接访问
- `src/utils/mainStaticPaths.js` 注册主包默认图路径
- 调整 `src/components/commonNew/houseCard.vue` 与 `src/pages_tab/components/Project_Suzhufang.vue` 图片字段映射
- `src/pages_transaction/stockHouse/index.vue` 同步修复

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：fa5768fc-b738-4e95-83d7-d7bd81e5939a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "szf_img_blank",
  "source_extraction_id": "f38b441ffd5e41d498bcfbd97a45fa4b",
  "version": 1,
  "memory_type": "entities"
}
-->