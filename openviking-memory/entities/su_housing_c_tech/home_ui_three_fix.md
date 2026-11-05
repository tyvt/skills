# 首页三处 UI 修复
苏住房C小程序根据截图标注完成首页 3 处 UI 修复，修改 `Home_Suzhufang.vue` 与 `OnlineServiceGrid.vue`。

## 搜索框渐变背景
- `.search-strip` 从斜向纯色渐变改为纵向透明→蓝色渐变：`linear-gradient(180deg, rgba(19,84,190,0) 0%, rgba(85,131,208,0.75) 55%, rgb(19,84,190) 100%)`

## 热门活动 Banner 间距
- 图片 `mode` 从 `aspectFit` 改为 `aspectFill`，消除上下留白
- 去掉 `.banner-img-wrap` 的灰色背景 `#eef2f8`
- 增加 `line-height: 0` 消除图片底部空隙

## 热点资讯与底部间距
- 无数据时不渲染空白 `news-card`，避免热点资讯区域出现空白块

## 涉及文件
- 涉及文件：`Home_Suzhufang.vue`、`OnlineServiceGrid.vue`、`pages.json`、`home.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：f12bdce7-635e-42f0-b034-e806a17e8c7e

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "home_ui_three_fix",
  "source_extraction_id": "881586bec5ef4745b92508ce244b74a9",
  "version": 1,
  "memory_type": "entities"
}
-->