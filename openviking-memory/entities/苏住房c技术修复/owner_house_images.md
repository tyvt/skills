# 我的房屋列表图片真机不显示修复
苏住房C小程序「我的房屋」「添加房屋」页面图片在真机上不显示，根因为分包 static 目录错位。

## 问题根因
- 「我的房屋」和「添加房屋」页面在 pages_owner 分包，但大量图片实际放在 pages_transaction 分包的 static 目录
- 开发工具里分包可能都已加载所以正常；真机上若只进业主分包、未加载交易分包，这些图片会 404 全部不显示
- 涉及图片：Bg-szf.png、icon-automaticAdd.svg、icon-handAdd.svg、icon-owner.svg、icon-contract.svg、icon-property.svg、icon-ownership.svg、yiwen.png

## 修复内容
- 将房屋相关图片复制到 pages_owner/static/images/szf/
- 在 src/utils/index.js 的 PAGES_OWNER_SZF_FILES 中补充文件名，让 resolveStaticUrl 正确解析到 pages_owner
- 更新 index.vue 顶图分包为 pages_owner
- 更新 addHouse.vue 说明图分包为 pages_owner

## 涉及文件与归属
- 涉及文件：src/utils/index.js、pages_owner/house/index.vue、addHouse.vue、TitleCard.vue、HalfCard.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：7faa1ba7-1ea3-4c81-8ac8-7f524dff2eb6；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "owner_house_images",
  "source_extraction_id": "26b67095e6d743bd8590c67953d37172",
  "version": 1,
  "memory_type": "entities"
}
-->
