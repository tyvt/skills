# 业主倡议列表页请求异常修复
苏住房C小程序「首页-小区管理-业主倡议」打开后提示"请求异常"，根因为小区ID未传，已修复。

## 问题根因
- propose/index.vue 调用的 appSuggestListVoList 接口需要 complexId，但页面只传了 suggestStatusFlag 和 initiatorIdNumber
- 缺少 complexId，后端校验失败导致"请求异常"
- 同模块 StepPropose.vue 传了 complexId: userStore.project，decision/index.vue、elect/index.vue 从URL读取 complexId

## 修复内容
- propose/index.vue 补充传入 complexId 参数以通过后端校验

## 涉及文件与归属
- 涉及文件：propose/index.vue、api/autonomy.js、StepPropose.vue、decision/index.vue、elect/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：0b18d994-45da-45ee-a48d-fd532610f70b

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "propose_complexid_fix",
  "source_extraction_id": "62aa14aed6054f559c50f3eb85d9fa1b",
  "version": 1,
  "memory_type": "entities"
}
-->
