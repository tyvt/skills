# 分包页相对路径跳转被补斜杠致找不到
苏住房C分包内跳转写相对路径TypeChoose?...，被goto的normalizeLegacyPageUrl补成/TypeChoose致navigateTo失败。
## 问题现象
- pages_owner/house/index.vue点「前往添加」报navigateTo:fail page "TypeChoose?unauthorizedHouseNum=0" is not found
- 跳转写相对路径`TypeChoose?unauthorizedHouseNum=${n}`
- 同目录success.vue、guardApply/step1.vue写完整/pages_owner/house/TypeChoose故仅此一处炸
## 根因
- 项目goto先走normalizeLegacyPageUrl：不以/开头就补前导斜杠得/TypeChoose
- 只做补斜杠不按当前目录补分包前缀，页面自然找不到
## 解决方案
- 分包页内跳转一律写完整路径/pages_xxx/目录/页面，禁相对路径（哪怕同目录）
- 搜不带前导/的goto/navigateTo参数；本页history→/pages_owner/house/history也同坑一并修
- 勿把normalizeLegacyPageUrl当万能兜底扩展成「猜目录」，会让错误路径更难定位
## 验证与归属
- 会话d7258436：navigateTo失败，goto(`TypeChoose?...`)被补成/TypeChoose，改为完整路径
- 涉及文件：src/pages_owner/house/index.vue、src/utils/route-map.js、src/pages_owner/house/owner/success.vue
- 所属项目：苏住房C；来源会话ID：d7258436-2f74-40b3-a7d1-bb994d1239c1；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "goto_relative_path",
  "source_extraction_id": "1d069700b22d47f4910ca8e2360f52a7",
  "version": 1,
  "memory_type": "entities"
}
-->