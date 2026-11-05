# accountInfo.vue按环境变量隐藏机构按钮
accountInfo.vue 根据环境变量 VITE_APP_PROJECT_ID 控制「获取机构信息」按钮的显示，实现按项目差异化隐藏。

## Description
- accountInfo.vue 的 computed 新增 projectId，返回 import.meta.env.VITE_APP_PROJECT_ID

## 关键逻辑
- 模板为「获取机构信息」按钮增加 v-if="projectId !== 'wuguan'"
- 当环境变量为 wuguan 时隐藏该按钮

## 验证与归属
- 验证证据：extracted source=cursor session=60504dfa-5ffc-485a-8ce6-b6e66522f3d4
- 涉及文件：accountInfo.vue、detail.vue
- 来源会话ID：60504dfa-5ffc-485a-8ce6-b6e66522f3d4
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "accountinfo_env_hide",
  "source_extraction_id": "2b613728a85544a581e8279650d99ee9",
  "version": 2,
  "memory_type": "entities"
}
-->