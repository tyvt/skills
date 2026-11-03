# 添加房屋主路径灵犀手动页断链
AddBtn.vue 的 goAdd() 跳转灵犀/不动产第三方 H5 授权为主路径，但 add.vue 与 application.vue 存在却无导航入口形成断链。

## 主路径与断链
- AddBtn.vue 的 goAdd() 跳转灵犀/不动产第三方 H5 授权为主路径
- src/pages_myhouse/myhouse/add.vue 存在但无导航入口
- src/pages_myhouse/myhouse/application.vue 存在但无导航入口，形成断链

## 涉及文件
- d:/repository/惠山小程序/src/pages_myhouse/myhouse/add.vue
- d:/repository/惠山小程序/src/api/modules/myhouse.js
- d:/repository/惠山小程序/src/pages.json
- d:/repository/惠山小程序/src/pages_myhouse/myhouse/index.vue
- d:/repository/惠山小程序/src/pages/verifyUser/index.vue
- d:/repository/惠山小程序/src/pages/verifyUser/info.vue
- d:/repository/惠山小程序/src/stores/myhouse.js
- d:/repository/惠山小程序/src/App.vue

## 验证与归属
- 验证证据：extracted source=cursor session=0537cd5d-ca90-4553-a701-605e48fd0be8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "myhouse_add_brokenlink",
  "source_extraction_id": "506c6443b4d24c358b82c5a05e60bdc8",
  "version": 1,
  "memory_type": "entities"
}
-->