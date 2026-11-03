# 微信小程序WXSS不支持:not()伪类
苏住房C（uni-app Vue3）构建时微信开发者工具报wxss编译错误，根因是WXSS不支持:not()伪类。

## 现象与根因
- zhi2-mobile-shimin自动预览/构建报wxss编译错误ErrorFileCount[3]，error at token ':'
- 同时命中TypeChoose_Suzhufang.vue、pages_owner/house/index.vue、pages_owner/tenant/index.vue三文件
- 微信小程序WXSS不支持:not()伪类，编译产物出现即整条报错直接打断构建（不同于min()/max()静默丢弃）
- 两处来源：页面直系选择> :not(.page-bg)与uni.scss全局.page:not(.page-wrapper)污染所有页面

## 解决方案
- 把:not()展开成显式选择器清单，如> :not(.page-bg)改为.type-text, .title_card_container等
- 全局uni.scss里.page:not(.page-wrapper)直接降级为.page
- 改完构建后dist的wxss里grep :not数量应为0，再回开发者工具编译
- 新增样式禁用:not()/:has()一类现代伪类

## 验证与归属
- 会话7482cc2e（2026-08-25，基线5f0f4dc）用户贴wxss编译错误，逐文件替换并改uni.scss，复核:not数量为0
- 涉及文件：TypeChoose_Suzhufang.vue、house/index.vue、tenant/index.vue、uni.scss
- 所属项目：苏住房C；来源会话ID：7482cc2e-dca0-4d98-8721-da0bc1b7dffd；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "wxss_not_unsupported",
  "source_extraction_id": "0db4fd13cb304d78aa42f67a8963f614",
  "version": 1,
  "memory_type": "entities"
}
-->