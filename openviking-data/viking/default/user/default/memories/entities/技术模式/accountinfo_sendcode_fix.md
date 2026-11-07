# 企业注册验证码发送loading与倒计时修复
园区公共收益项目修复 `companyRegister.vue` 子组件 `accountInfo.vue` 中发送验证码按钮点击后未立即 loading、且倒计时触发时机不当的问题。

## 修改内容
- 按钮绑定 `:loading="sendLoading"`，点击后立刻 `sendLoading = true`，请求期间显示 loading 并禁用按钮
- 只有接口返回成功才 `showCount = true` 并启动 60 秒倒计时，倒计时用 `countTimer` 管理，组件销毁时自动清理
- 手机号校验失败立即 `sendLoading = false`；接口失败（`$post` reject）在 `finally()` 里恢复 `sendLoading = false`，不进入倒计时
- 防重复点击：`showCount || sendLoading` 时 `sendCode()` 直接 return

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：3c5a3522-257e-40bb-9d05-80dadfbbb3a7；代码基线：none
- 涉及文件：`companyRegister.vue`、`accountInfo.vue`（路径 `zhi2-web-admin/src/views/register/components/accountInfo.vue`）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "accountinfo_sendcode_fix",
  "source_extraction_id": "1dabda6ae60c49ba9b0b0e9ad1f7dc61",
  "version": 1,
  "memory_type": "entities"
}
-->