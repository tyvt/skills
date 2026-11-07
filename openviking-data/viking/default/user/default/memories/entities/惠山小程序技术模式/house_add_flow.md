# 添加房屋流程代码分析
已生成 SVG 流程图保存于 d:/repository/惠山小程序/docs/添加房屋流程图.svg，分析惠山小程序添加房屋主流程、遗留路径及与原流程图差异。

## 主流程（当前生产环境）
- 用户入口 → 实名认证/灵犀登录 → 我的房屋 → 第三方 H5 授权 → authCode 回跳 → selectMyHouseByLingXi 绑定

## 遗留路径（UI 不可达）
- add.vue 手动绑定
- application.vue 人工核查

## 差异与文件
- 与原流程图差异：8 条不符合项、3 条符合项
- 关键代码文件：src/pages_myhouse/myhouse/components/AddBtn.vue、src/utils/index.js、src/App.vue、src/pages/verifyUser/index.vue、src/pages_myhouse/myhouse/add.vue、src/api/modules/myhouse.js

## 验证与归属
- 验证证据：extracted source=cursor session=ab495207-a315-40db-84b5-144c8f840441
- 来源会话：ab495207-a315-40db-84b5-144c8f840441
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "house_add_flow",
  "source_extraction_id": "591eeb9000e74a4fae1a3990c5386c2d",
  "version": 1,
  "memory_type": "entities"
}
-->