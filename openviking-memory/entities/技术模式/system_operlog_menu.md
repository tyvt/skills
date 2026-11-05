# 系统管理日志管理菜单新增
苏住房G 项目在「系统管理」模块新增「日志管理」菜单，并同步园区操作日志全局拦截。

## 提交信息
- 提交说明：feat: 新增系统管理日志管理功能，同步园区操作日志全局拦截
- 分支 develop/v2.6.2-suzhufang 提交哈希 35fc2752b，领先远程 1 个提交
- 分支 develop/v2.6.2 提交哈希 292491f6f，cherry-pick 同步，领先远程 2 个提交，当前已切回 suzhufang 分支

## 涉及文件
- src/utils/pageRequestContext.js（新增）
- src/utils/request.js
- src/utils/ruoyi.js
- src/views/system/operlog/index.vue

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 来源会话ID：f539b98f-e679-43dd-ae58-951214061d3f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "system_operlog_menu",
  "source_extraction_id": "430d6ab35af442f69d0d52b3be24b130",
  "version": 1,
  "memory_type": "entities"
}
-->