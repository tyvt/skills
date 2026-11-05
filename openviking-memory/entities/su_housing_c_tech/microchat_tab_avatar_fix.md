# 微聊顶部Tab居中及机器人头像显示修复
苏住房C(zhi2-mobile-shimin)消息/微聊页顶部Tab未居中且机器人头像不显示，已通过样式与标签修复。

## 问题根因
- 顶部Tab未居中：`tab-line`放在`uni-nav-bar`插槽里默认左对齐，未占满中间区域。
- 机器人头像不显示：`ZsImage`在自定义组件上设置`header-img`尺寸时，小程序端样式隔离导致图片区域为0。

## 修复方案
- 用`message-nav-tabs`包裹Tab，通过绝对定位`left:50% + translateX(-50%)`在导航栏内水平居中。
- 机器人头像改回原生`image`标签，使用绝对路径`/static/images/auto-robot.png`，给`img-box`固定`44px × 44px`。

## 验证与归属
- 重新编译预览：`cd zhi2-mobile-shimin && npm run build`；预期导航栏「消息/微聊」居中，机器人客服左侧显示圆形头像。
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`message.vue`、`pages_my/robot/index.vue`、`pages_my/robot/chitchat.vue`等
- 来源会话ID：e5260577-7b96-471b-8868-7016b41f64dd；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "microchat_tab_avatar_fix",
  "source_extraction_id": "1cce340fb61d44689d381b5141b1cc0e",
  "version": 1,
  "memory_type": "entities"
}
-->