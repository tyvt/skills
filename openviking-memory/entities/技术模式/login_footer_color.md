# 登录底部文字色取平台配置并回退#333
园区物管2.0 登录页底部文字颜色从平台配置读取，缺失时回退 #333。

## 实现方式
- login.vue 通过计算属性 loginBottomTextColor 从 store.state.app.platformConfig 读色值并内联至 .el-login-footer
- 配置缺失时回退默认色 #333
- store/modules/app.js 增补 loginBottomTextColor 状态
- system/platformConfig/detail.vue 增补 el-color-picker 表单项供后台配置

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/login.vue、src/store/modules/app.js、src/views/system/platformConfig/detail.vue、src/permission.js、src/main.js、src/App.vue
- 所属项目：园区物管2.0；来源会话：3a00e2ae-df89-4fd3-a9ef-788bec02c44f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_footer_color",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 2,
  "memory_type": "entities"
}
-->