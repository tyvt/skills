# 短信验证码按钮交互契约
注册等页的「发送验证码」按钮在子组件中实现，须保证点击即有反馈、失败能立刻重试。

## 交互契约
- 点击立刻 sendLoading=true 并 :loading 绑定按钮，同时 showCount||sendLoading 时 return 防重复。
- 先 validateField 手机号，校验失败立即 sendLoading=false 不发请求。
- 仅接口 code==200 或 success 后才开始 60s 倒计时（showCount + countTimer，beforeDestroy 清理）。
- 请求结束无论成败在 finally() 里 sendLoading=false，失败不得进入倒计时。
- 与图形验证码组件的 onFail 复位是不同控件，短信按钮要单独保证反馈与重试。

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：会话 3c5a3522 用户要求发送验证码调用接口后立刻 loading 或计时，接口异常立刻恢复；结论在 accountInfo.vue 实现。
- 涉及文件：zhi2-web-admin/src/views/register/components/accountInfo.vue、zhi2-web-admin/src/views/register/companyRegister.vue
- 所属项目：园区公共收益；来源会话：3c5a3522-257e-40bb-9d05-80dadfbbb3a7；代码基线：0c9b8c2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sms_code_button",
  "source_extraction_id": "181b587a4f3b429fa55c316b8577fde9",
  "version": 1,
  "memory_type": "entities"
}
-->