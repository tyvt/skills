# zhi2-mobile-shimin-h5-zhishu-c-unlimited 登录要点
`zhi2-mobile-shimin-h5-zhishu-c-unlimited` 项目 H5 密码登录与图形验证码环节依赖 `uuid` 的技术要点。

## 登录参数
- 密码登录需 `uuid`（表单字段 `form.udid`）。
- 图形验证码由 `ImgCode` 组件绑定 uuid。

## 排障要点
- 登录卡在验证码页时，先窄查登录是否依赖 uuid。
- 可尝试从浏览器读取 token 跳过重复登录。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhishu_h5_login",
  "source_extraction_id": "97b19fefff0b48ec9e84126b5d8b7520",
  "version": 1,
  "memory_type": "entities"
}
-->