# 不动产权限授权登录弹窗实现
按设计图在 `pages/home/login/index.vue` 实现了「不动产权限授权」全屏遮罩弹窗页面，结构完整。

## 实现内容
- 已注册路由 `pages/home/login/index`（`pages.json` 已新增）
- 全屏遮罩 + 居中白色圆角弹窗，顶部房屋图标使用 `uni-icons`
- 标题「不动产权限授权」，含多行说明文案与三条绿色勾选说明
- 底部双按钮：`稍后再说` 执行 `navigateBack`，`同意授权` 跳转 `/pages/face/verify`

## 验证说明
- lint 报 `pages.json` 原有 JSON 注释问题（项目既有），非本次新增逻辑导致
- 可继续按设计图细调弹窗宽高、标题字号、段落行高、按钮圆角与间距
- 涉及文件：pages/home/login/index.vue、pages/face/verify.vue、pages/face/face.vue、App.vue、pages/area-manage/area-manage.vue
- 所属项目：小程序（wygl-wxxcx-dev-slh）；来源会话：cf9e07b8-2418-4ea4-8944-e6e30fe516eb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "login_auth_popup",
  "source_extraction_id": "acfa3d29203d49719c288b371914a6bf",
  "version": 1,
  "memory_type": "entities"
}
-->