# 登录页多字段模式固定预留校验区高度
园区公共收益登录方式3字段多、容器高度固定时，用CSS变量预留错误区避免布局跳动。

## 问题现象
- 校验错误随显隐撑开`el-form-item`会导致按钮和字段整体跳动
- 短信验证码按钮若用表单项外独立文字按钮会破坏布局

## 解决方案
- 定义CSS变量`--login-error-h`(默认18px，方式3可16px)
- 每个`el-form-item__content`固定`padding-bottom`预留错误区
- 错误文案用`position:absolute`落在预留区内，不遮挡下一项
- 短信验证码按钮放输入框后缀插槽(append slot)

## 验证与归属
- 涉及文件：src/views/login.vue
- 所属项目：园区公共收益；来源会话：a6727568-bde2-4da6-a70a-31bf732716a4；代码基线：bd275b5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_login_layout",
  "source_extraction_id": "c36c34f056dd48c9be8f216646e9ea81",
  "version": 1,
  "memory_type": "entities"
}
-->