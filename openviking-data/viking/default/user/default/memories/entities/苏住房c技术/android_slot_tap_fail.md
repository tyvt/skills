# 安卓分包卡片slot内view点击无响应
苏住房C 安卓微信小程序中列表卡片 slot 内的普通 view @tap 经常收不到点击，需统一改用 ZsButton + @click.stop。

## 问题现象
- pages_vote/decision 列表「参与决策」按钮在安卓微信小程序点击无反应，但点卡片主体可进详情，无报错
- 根因为卡片 slot 内普通 <view @tap.stop> 在安卓微信小程序常收不到 tap，选举页 elect/index.vue 已用 ZsButton 规避

## 解决方案
- 操作按钮一律用 ZsButton + @click.stop，禁止裸 <view @tap>
- 跳转统一收口到 goto() 方法，卡片主体与按钮都走它
- 按钮区域加 z-index:2 防被遮挡
- 详情页底部按钮用项目 redirectTo() 工具函数而非 uni.redirectTo 直调
- 核对跳转目的地语义（参与决策/修改决策直达 needToKnow 页而非先落详情页）
- 验证须在安卓真机点按钮，模拟器不一定复现

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 365c14a6「我的决策点击参与决策还是没有反应，但是直接点击整个卡片可以进入」
- 涉及文件：src/pages_vote/decision/index.vue、DecisionList.vue、detail.vue、src/pages_vote/elect/index.vue
- 所属项目：苏住房C；来源会话ID：365c14a6-d64c-46e7-af26-8a237fa7b8c3；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "android_slot_tap_fail",
  "source_extraction_id": "26d7a6fd99de463182bdf8dc2795cc18",
  "version": 1,
  "memory_type": "entities"
}
-->