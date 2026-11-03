# 按钮组返回去URL末段致空白页
苏州市房地产监测V3 中 OperationBtnGroup「返回」默认去除 URL 末段致 limitCancel/add 回退空白页。

## 问题根因
- OperationBtnGroup「返回」默认去除 URL 最后一段，使 `limitCancel/add` 回退至无列表的 `limitCancel` 路由

## 关键修复
- 进入表单携带 `backUrl` 优先使用 `query.backUrl`
- 解除限制无 `backUrl` 时解析 `building/houseLimitAudit/index` 对应列表 path

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/007.md
- 涉及文件：路由信息.json、building/houseLimitAudit/index.vue、e2e/fixtures/house-limit-menu-config.js、building/houseLimit/detail.vue、utils/ruoyi.js、building/houseLimit/limitFormMixin.js、e2e/fixtures/house-limit-helpers.js、building/houseLimit/houseLimitConstants.js
- 所属项目：苏州市房地产监测V3；来源会话：2ad68687-4880-41bf-8458-37e18e5ed806；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_back_url",
  "source_extraction_id": "644f7058dbcc4758a137abaf815b7f20",
  "version": 1,
  "memory_type": "entities"
}
-->