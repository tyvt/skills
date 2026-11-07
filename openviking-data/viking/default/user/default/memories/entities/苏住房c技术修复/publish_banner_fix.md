# 发布横幅图片空白修复
苏住房C小程序交易分包页面发布横幅 publishBanner.png 因主包路径误解析空白，已改 import 引入修复。

## 问题根因
- 报错路径为 /static/images/szf/publishBanner.png（主包），图片实际在 pages_transaction/static 下
- 模板写相对路径时微信小程序错误解析到主包，加载失败

## 修复内容
- 改为与同分包其他页面一致的 import 引入方式（参考 intention/my.vue）
- 使用 import publishBanner from './static/images/szf/publishBanner.png' 并绑定 :src="publishBanner"
- 本地编译后路径正确解析为 /pages_transaction/static/images/szf/publishBanner.png

## 涉及文件与归属
- 涉及文件：pages_transaction/stockHouse/index.vue、intention/my.vue、pages.json、components/ZsImage/ZsImage.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：ea94d6f1-423c-4f81-89fd-77047f891ebe；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "publish_banner_fix",
  "source_extraction_id": "f9a8a8092b644e0e884293a518ae4796",
  "version": 1,
  "memory_type": "entities"
}
-->
