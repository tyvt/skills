
# 新房详情底部穿屏问题排查与修复
苏住房C小程序新房详情页底部固定栏穿屏问题已排查相关文件、路由与跳转路径，并完成滑动穿屏修复。

## 核心页面与路由
- pages_transaction/newHouse/detail.vue：新房详情主页面（收藏+购房咨询）
- pages.json（约1696-1698行）：路由 newHouse/detail，标题「新房详情」
- pages/commonNew/bottomBtn.vue：底部固定栏共享组件
- houseTypeDetail.vue：户型介绍组件（底部栏处理参考）

## 地图找房入口
- pages/houseMap/houseMap.vue：地图找房主页面
- pages/houseMap/components/NewHouse.vue：地图新房卡片，跳转详情

## 问题根因（滑动穿屏）
- 底部栏 z-index:998 偏低，滚动中的图片会叠到其上方
- 底部按钮放在内容容器内部，容易受父级层叠上下文影响
- 未处理底部安全区，底部留白不足
- 小程序原生 map 组件在「项目周边」地图区域可能存在已知穿透限制

## 修复内容
- bottomBtn.vue：z-index 提升至 9999；增加 transform: translateZ(0) 独立合成层；增加 safe-area-inset-bottom 适配
- detail.vue：将 bottom-btn 移出 house-new-detail-box；底部留白改为 calc(120px + env(safe-area-inset-bottom))；页面内容设置 position:relative; z-index:1

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：newHouse/detail.vue、pages.json、bottomBtn.vue、houseMap.vue、NewHouse.vue、houseTypeDetail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：067afb84-7618-476c-a86e-f6d62928652f、fb9e853d-85c6-4d97-a6e2-4ca11832d84c；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "newhouse_screen_probe",
  "source_extraction_id": "0696f333cb154a068fcf85a0537f1632",
  "version": 2,
  "memory_type": "entities"
}
-->