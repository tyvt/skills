# Android机器人问答页双跳节流方案
苏住房C 安卓上打开机器人会进入两次问答页面，根因是组件内去重标志无效，须用模块级时间戳节流。

## 问题现象
- 安卓手机打开机器人时会进入两次问答页面，入口含首页入口与首页悬浮球 HomeRobotFloater
- Android 同一次 onShow+点击连续触发两次跳转，两次 navigateTo 各压一个页面实例

## 根因
- 去重标志放组件实例内（data 的 isJumping），各入口实例各持一份互不知晓，节流形同虚设
- 安卓触摸事件顺序与 iOS 不同，更易重复触发

## 解决方案
- 跳转逻辑下沉到独立工具 `src/utils/openAutomaticRobot.js`，用模块级变量记录上次跳转时间戳（800ms 窗口），重复调用直接 return
- 所有入口（pages/index/home.vue、components/HomeRobotFloater/HomeRobotFloater.vue）统一调该工具，不在页面各写跳转
- 验证须核对 dist 产物（dist/utils/openAutomaticRobot.js 含 800ms 拦截），微信开发者工具「编译」不一定重新打包

## 验证与归属
- 来源会话：1ee54692；代码基线：9a3c8db；涉及文件：openAutomaticRobot.js、pages/index/home.vue、HomeRobotFloater.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术模式",
  "name": "android_double_jump",
  "source_extraction_id": "4edd2b91cca8449093310dc478e50406",
  "version": 1,
  "memory_type": "entities"
}
-->