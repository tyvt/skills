# 业主端添加房屋流程complexId缺失报错
业主端「添加房屋→人工登记→提交人工审核」因register.vue未从useHouseStore带complexId，后端报「物业管理区域权限不能为空」。

## 问题背景
- 报错发生在register.vue调用ctUserIdentityApply时未传complexId，同流程addHouse.vue、addHouseContract.vue均已携带
- complexId非表单字段，而是从project/auth.vue进入流程时写入useHouseStore的上下文参数，模板不可见故易漏
- 前端无提示，后端报错文案指向「权限」易误导排查方向

## 解决方案
- 同流程内所有提交接口页面统一从useHouseStore补齐业务上下文（complexId与identityPhoto/certificatePhoto等拼接字段）
- 以同流程已跑通页面为基准逐字段比对payload，新增页先grep同目录其他提交页字段清单
- 排查「xx不能为空」类报错先确认参数是表单字段还是store上下文参数，勿先查权限

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话75b9fd04用户截图报错并指出复杂小区参数即可；当前代码核实register.vue:173-176已含complexId
- 涉及文件：pages_owner/house/owner/register.vue、addHouse.vue、bindProject.vue、store/house.js、api/property.js
- 所属项目：苏住房C；来源会话：75b9fd04-a06e-4dd9-a25b-46eb96b4328a；代码基线：0011377

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "owner_house_complexid",
  "source_extraction_id": "524203ab1a35488d949dbc062913ff56",
  "version": 1,
  "memory_type": "entities"
}
-->