# 登录页底部文字颜色动态化
园区物管2.0 登录页底部版权文字颜色支持通过平台配置动态设置，未配置时回退默认。

## 修改方案
- login.vue 底部版权条增加 :style="{ color: loginBottomTextColor }"，新增计算属性从 this.$store.state.app.platformConfig.loginBottomTextColor 读取，为空或未配置时回退 #333。
- store/modules/app.js 的 platformConfig 初始 state 增加 loginBottomTextColor: undefined，与接口返回结构对齐。
- views/system/platformConfig/detail.vue 视觉色调中增加「登录页底部文字颜色」el-color-picker 表单项，绑定 form.loginBottomTextColor。

## 验证与归属
- 涉及文件：login.vue、store/modules/app.js、views/system/platformConfig/detail.vue、App.vue
- 所属项目：园区物管2.0；来源会话：3a00e2ae-df89-4fd3-a9ef-788bec02c44f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_text_color",
  "source_extraction_id": "d85e0f70ce6148d6a90daec00c580ae6",
  "version": 1,
  "memory_type": "entities"
}
-->