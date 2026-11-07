# 房源分配菜单显隐由用户信息接口 role 决定
苏找房web 个人中心「房源分配」菜单的显示与隐藏由登录后用户信息接口返回的 role 字段控制。

## 现象与判定
- 个人中心（src/views/personCenter/components/navLeft.vue）中「房源分配」菜单有时显示有时不显示
- 菜单显隐不按路由权限或 meta / 权限码计算，而是依据用户信息接口返回的 role 字段
- 仅当 result.role === '2'（字符串）时显示菜单，否则隐藏

## 接口与字段
- 登录后调用 GET /transaction/user/userInfo（前端封装为 getUserInfo）
- 读取响应里的 result.role 进行判断
- role 是字符串 '2'，与数字 2 的严格相等判断不可混淆

## 排查顺序
- 先确认用户信息接口是否已正常返回（token 失效时 role 为空，菜单整片消失）
- 再比对 role 取值是否为字符串 '2'

## 验证与归属
- 涉及文件：src/views/personCenter/components/navLeft.vue、src/views/personCenter/index.vue、src/api/modules/distribution.js、src/views/verification/constants.js
- 来源会话：b0272a0d-e550-42da-b977-f14b6871d569；代码基线：297ff5c19

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menu_role_visibility",
  "source_extraction_id": "f667ae03057146ae8933dff0fd05df44",
  "version": 1,
  "memory_type": "entities"
}
-->