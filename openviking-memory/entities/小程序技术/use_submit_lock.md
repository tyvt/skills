# 小程序提交锁loading防重复提交基础设施
苏住房C小程序zhi2-mobile-shimin跨6个分包批量治理「会调接口的提交按钮」loading防重复提交，靠统一基础设施而非各页各写。

## 基础设施与写法
- src/hooks/useSubmitLock.js 提供 { loading, runSubmit }，runSubmit 包裹异步操作自动置位/释放；ZsButton 支持 :loading 与 :disabled
- VerifyCode 组件 sendCode 回调签名统一为 (countDown, onFail) => {}
- 页面写法：const { loading, runSubmit } = useSubmitLock()；submit 中 formRef.validate().then(() => runSubmit(async () => { await someApi(); /* 导航 */ }))；模板给 ZsButton 绑定 :loading="loading"

## 验收与改法
- 只处理「会调接口的提交按钮」；纯导航、弹窗关闭、筛选本地数据不加 loading
- 已有手写 const loading = ref(false) 的页面统一换 useSubmitLock，或至少补 :loading 到 ZsButton
- onSubmit 用 debounce 的优先改 runSubmit（可移除 debounce）
- sendCode 失败必须回调 onFail?.() 否则倒计时卡死：api().then(() => countDown()).catch(() => onFail?.())；表单 validate 失败也要调 onFail?.()

## 验证与归属
- 验证：会话19803421用户要求所有调接口按钮加loading防重复提交；已建useSubmitLock.js、ZsButton支持:loading/:disabled、VerifyCode的sendCode改为(countDown,onFail)
- 涉及文件：src/hooks/useSubmitLock.js、src/components/ZsButton/ZsButton.vue、src/components/VerifyCode/index.vue、src/pages_my/、pages_owner/、pages_guard/、pages_transaction/、pages_feedback/
- 所属项目：苏住房C；来源会话ID：19803421-0080-4e9c-9cda-f1e93d27b0a7；代码基线：4d6dba9

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "use_submit_lock",
  "source_extraction_id": "69140a56f4294c209be09391c39e043a",
  "version": 1,
  "memory_type": "entities"
}
-->