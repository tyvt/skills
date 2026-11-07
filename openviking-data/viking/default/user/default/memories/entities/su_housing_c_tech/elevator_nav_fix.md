# 加梯申请页系统导航栏修复
苏住房C「加梯申请」页面已改为使用系统默认导航栏，左上角返回按钮可正常后退。

## 问题根因
- 原使用 `navigationStyle: "custom"` 自定义导航栏，自定义返回逻辑会干扰后退

## 修复内容
- pages.json 去掉 `navigationStyle: "custom"`，恢复系统导航栏（标题「加梯申请」）
- index.vue 移除自定义返回按钮（ZsImage 返回图标）
- 删除 `goBack` 函数和 `onBackPress` 拦截逻辑
- 删除 `statusBarHeight` 相关代码
- 搜索栏位置改为 `top: 20rpx` 适配默认导航栏下的内容区，搜索框与「加梯申请」按钮保留在地图上方

## 涉及文件与归属
- 涉及文件：pages_owner/elevator/index.vue、pages.json、utils/system-info.js
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：5aa3e266-85fe-4cbd-b6e7-b65da6a0763c

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elevator_nav_fix",
  "source_extraction_id": "be4cb5694a9049d2b5d24d217f92a0dc",
  "version": 1,
  "memory_type": "entities"
}
-->
