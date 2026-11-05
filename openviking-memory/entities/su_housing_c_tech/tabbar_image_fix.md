# TabBar图标与构建报错修复
苏住房C修改AppTabBar引入本地图标并修正收支详情页图片路径，解决渲染层网络错误。

## 修复内容
- `AppTabBar`改为`import`本地图标，挂到5个tab页
- 修正`income/info.vue`、`maintain/info.vue`中图片路径（`../../static` → `../static`）

## 构建结果
- 重新编译后TabBar图标和收支详情页正常显示
- 构建已通过

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`income/info.vue`、`maintain/info.vue`、`src/pages/index/components/Home_Suzhufang.vue`、`src/pages_owner/ownerCard/index.vue`、`src/pages_owner/elect/detail.vue`
- 来源会话ID：7004b2d1-f4ed-47aa-b1b7-975f6fb37b58

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "tabbar_image_fix",
  "source_extraction_id": "2a80a42a743244f69072321e42dbe8b8",
  "version": 1,
  "memory_type": "entities"
}
-->