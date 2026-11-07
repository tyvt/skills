# 微聊机器人头像加载失败修复
苏住房C `pages_main/message/index` 中机器人客服头像因使用原生 image 标签致路径错误空白，已改为 ZsImage 组件修复。

## 问题根因
- `chitchat.vue` 机器人客服头像使用原生 `<image src="./static/images/auto-robot.png">`。
- 编译到微信小程序后路径变为主包 `/static/images/auto-robot.png`，但 `auto-robot.png` 实际在分包 `pages_main/static/images/` 下，加载失败头像空白。
- 同页其他联系人头像用 `ZsImage`，经 `resolveStaticUrl` 正确解析分包静态资源路径。

## 修复方案
- 将机器人头像改为与其他联系人一致的 `ZsImage`：`<ZsImage class="header-img" src="images/auto-robot.png" />`。
- 重新编译运行后微聊列表机器人客服头像正常显示。

## 涉及文件
- `chitchat.vue`
- `src/pages.json`
- `src/pages/message/index.vue`
- `src/pages_main/message/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：e7bbf5fb-a194-4fdc-9755-8546e1c8585b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "chitchat_avatar_fix",
  "source_extraction_id": "8742ccd3462a4edebd58a07c474a1c2d",
  "version": 1,
  "memory_type": "entities"
}
-->