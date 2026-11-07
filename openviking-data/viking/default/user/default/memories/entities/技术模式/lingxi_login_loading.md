# 灵犀登录全屏Loading
在 src/App.vue 的 ensureLingxiLogin() 中增加全屏 loading 遮罩，保证登录期间有遮罩且 loading 必关闭。

## Description
- linxiLogin 现在会显示全屏 loading
- 开始登录前执行 uni.showLoading({ title: '登录中...', mask: true })
- 登录流程结束（无论成功/失败）均执行 uni.hideLoading()

## 关键逻辑
- 位置：src/App.vue 的 ensureLingxiLogin() 内
- 避免登录时 loading 不关闭的问题

## 验证与归属
- 验证证据：extracted source=cursor project=repository
- 涉及文件：src/App.vue
- 来源会话ID：a0023e6f-7ad1-4479-b1e4-5e94668b6a76
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lingxi_login_loading",
  "source_extraction_id": "1d00a9284a824937a6f796a98da6d2f6",
  "version": 1,
  "memory_type": "entities"
}
-->