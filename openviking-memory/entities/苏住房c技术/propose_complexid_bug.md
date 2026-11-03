# 业主倡议列表缺complexId报请求异常
苏住房C小区管理→业主提倡页面因缺失complexId调用接口失败报「请求异常」，兄弟页正常，已修复。

## 现象与根因
- 首页→小区管理→业主提倡打开后提示「请求异常」，同模块其他页面正常
- propose/index.vue调用的/autonomy/suggest/listByComplexIdAndStatus从接口名声明需要complexId，但只传suggestStatusFlag与initiatorIdNumber
- 同模块StepPropose.vue传了complexId: userStore.project，decision/index.vue、elect/index.vue从URL读complexId，仅倡议列表两处都没做

## 修复做法
- 排查策略：同模块某页异常而兄弟页正常，先diff兄弟页请求参数，别先怀疑后端或登录态
- 取值顺序固定为「URL query的complexId → userStore.project → 空字符串」，写成complexId.value || userStore.project || ''
- menuRouteMap.js给3_0_3业主倡议、5_1_2倡议与响应菜单自动带当前小区ID
- 仍报错再确认userStore.project是否有值（账号是否已绑定小区）

## 验证与归属
- 来源会话：0b18d994；代码基线：ce9e460
- 涉及文件：propose/index.vue、api/autonomy.js、ownerCard/index.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "propose_complexid_bug",
  "source_extraction_id": "bc2e17ccbf314a70a51b2c2bf67c360f",
  "version": 1,
  "memory_type": "entities"
}
-->