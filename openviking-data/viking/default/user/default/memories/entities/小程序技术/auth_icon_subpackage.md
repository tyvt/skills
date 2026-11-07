# 登录弹窗手机号授权图标须入主包static并登记mainStaticPaths
苏住房C小程序登录页「手机号授权」弹窗顶部图标在安卓真机不显示（iOS正常），根因是图标原放pages_main分包未打入构建产物且跨分包引用受安卓严格限制。

## 问题现象
- 登录页「手机号授权」弹窗顶部图标安卓真机空白缺图，iOS完全正常
- 「我的」页未登录点头像弹出同一弹窗也缺图
- 原生<image>无加载失败回退，失败即纯空白无占位

## 根因
- 图标原置于pages_main/static/images/phone-auth-icon.png，微信构建未带入产物
- pages_tab入口跨分包引用，安卓对跨分包静态资源限制比iOS严格
- 使用原生image标签，无失败回退

## 解决方案
- 图标迁至主包src/static/images/
- 在mainStaticPaths.js显式登记images/phone-auth-icon.png及兜底图images/warn.png
- 删除分包旧副本，避免双份维护
- 组件原生<image>换ZsImage获加载失败回退，去掉硬编码分包路径
- 构建后自证dist/static/images/下存在两文件，安卓真机验两入口

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话a1a45147用户报安卓手机号授权页缺默认图iOS无此现象；结论根因分包未打入+跨包加载，修复迁入主包+注册+ZsImage
- 涉及文件：src/pages/components/PhoneForm.vue、src/pages/login/index.vue、src/static/images/phone-auth-icon.png、src/mainStaticPaths.js
- 所属项目：苏住房C；来源会话ID：a1a45147-a211-4056-89f4-a6d870d42790；代码基线：6599714

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "auth_icon_subpackage",
  "source_extraction_id": "0bc9c97c36d946eeb27dc957b0e08455",
  "version": 1,
  "memory_type": "entities"
}
-->