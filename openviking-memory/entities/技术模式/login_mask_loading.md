# 登录流程前后加遮罩防loading不关
登录流程前后加全屏遮罩并统一收尾，确保 loading 无论成功失败均会被关闭、不残留。

## Description
- src/App.vue 的 ensureLingxiLogin() 在登录前调用 uni.showLoading({mask:true}) 显示全屏遮罩

## 关键逻辑
- 无论登录成功或失败，均在结束后调用 uni.hideLoading() 关闭 loading
- 确保全屏遮罩且不会残留未关闭的 loading

## 验证与归属
- 验证证据：extracted source=cursor session=a0023e6f-7ad1-4479-b1e4-5e94668b6a76
- 涉及文件：src/App.vue
- 来源会话ID：a0023e6f-7ad1-4479-b1e4-5e94668b6a76
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_mask_loading",
  "source_extraction_id": "9f93fce37f554190a2bb7cdfb8f52344",
  "version": 1,
  "memory_type": "entities"
}
-->