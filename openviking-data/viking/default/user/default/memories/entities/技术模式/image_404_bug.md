# 市民端分包页面图片真机不显示
苏住房C(zhi2-mobile-shimin)「我的房屋」与「添加房屋」页在pages_owner分包，背景图等全部真机404，开发者工具正常。

## 问题根因
- 图片物理放在pages_transaction分包static目录，真机未加载交易分包即404，工具已下载各分包故正常
- resolveStaticUrl白名单未包含这些文件，仍指向旧分包

## 修复做法
- 复制图片到引用方分包static(pages_owner/static/images/szf/)
- 在utils/index.js的PAGES_OWNER_SZF_FILES白名单补文件名，让resolveStaticUrl解析到pages_owner
- index.vue/addHouse.vue的分包参数改pages_owner
- 真机走「我的→我的房屋」和「添加房屋」验证

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C；来源会话：7faa1ba7-1ea3-4c81-8ac8-7f524dff2eb6；代码基线：f1939b0
- 涉及文件：pages_owner/house/index.vue、addHouse.vue、utils/index.js、ZsImage.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "image_404_bug",
  "source_extraction_id": "3ab43fc3ff7e4751aab7746f0359aac7",
  "version": 1,
  "memory_type": "entities"
}
-->