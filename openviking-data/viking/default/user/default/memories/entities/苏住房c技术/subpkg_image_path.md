# 分包静态图不能手写相对路径
苏住房C小程序分包内手写原生image相对路径会被解析到主包而404，须统一走ZsImage组件。

## 现象与根因
- pages_main/message/chitchat.vue（微聊列表）机器人客服头像空白，同页其他联系人头像正常
- 机器人头像手写原生<image src="../static/images/auto-robot.png">
- uni-app编译到微信小程序后相对路径被重写为主包绝对路径/static/images/auto-robot.png，实际图在分包pages_main/static/images/，404空白无报错
- 同页其他头像用ZsImage经resolveStaticUrl按当前分包解析故正常
- 与「分包间不能跨包引用静态资源」同根因：手写相对路径同样解析错包

## 解决方案
- 分包内静态图一律用ZsImage，src只写相对images/路径（如src="images/auto-robot.png"）
- 由组件内部解析所在分包static根
- 排查「某图不显示而同类图正常」先比对走ZsImage还是裸<image>

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话e7bbf5fb（2026-08-24，基线4630e8e）用户报机器人客服头像没出来，改用ZsImage修复
- 涉及文件：chitchat.vue、ZsImage.vue、utils/index.js
- 所属项目：苏住房C；来源会话ID：e7bbf5fb-a194-4fdc-9755-8546e1c8585b；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpkg_image_path",
  "source_extraction_id": "0db4fd13cb304d78aa42f67a8963f614",
  "version": 1,
  "memory_type": "entities"
}
-->