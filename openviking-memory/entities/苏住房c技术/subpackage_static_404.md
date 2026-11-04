# 分包静态资源跨包访问致真机图片404
苏住房C小程序pages_owner分包跨包引用pages_transaction静态图片，真机未加载交易分包时触发404。

## 问题现象
- pages_owner分包页面跨包引用pages_transaction分包static目录图片（如Bg-szf.png、icon-owner.svg）
- 真机未加载交易分包时图片404不显示

## 根因
- 小程序分包独立打包，跨包静态资源在目标分包未加载时不可访问

## 解决方案
- 将图片复制至pages_owner/static/images/szf/
- 修正src/utils/index.js内的路径引用

## 涉及文件与归属
- 涉及：pages_owner/house/index.vue、pages_owner/house/components/TitleCard.vue、HalfCard.vue、ZsImage/ZsImage.vue、PageBg/PageBg.vue、TypeChoose.vue、TypeChoose_Suzhufang.vue、addTypeChoose.vue
- 验证证据：苏住房C/026.md
- 来源会话ID：7faa1ba7-1ea3-4c81-8ac8-7f524dff2eb6
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_static_404",
  "source_extraction_id": "0303e6fbd99640a4aad5dc2a1e3e3234",
  "version": 1,
  "memory_type": "entities"
}
-->