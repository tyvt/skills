# 信用代码改为input-with-actions布局
苏州市房地产监测V3 的 `Step1BasicInfo.vue` 将「统一社会信用代码」从 append-buttons 改为 input-with-actions 布局，避免按钮挤压输入框。

## 改动内容
- 输入框占 `flex: 1` 避免被右侧按钮挤压
- 查询/提取按钮改为右侧 `link-action`
- 补充 `data-testid` 便于测试定位

## 测试同步
- `institution-register-extract.spec.js` 选择器更新为 `getByTestId('institution-register-btn-extract')`
- `institution-register-flow.spec.js` 同步更新

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/106.md
- 涉及文件：Step1BasicInfo.vue、zs-input.vue、institutionRegister/index.vue、前端技术信息.md、路由信息.json、package.json、vite.config.js
- 所属项目：苏州市房地产监测V3；来源会话：4b2f9d95-14ba-4d66-a8c1-5657389a2a88；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "credit_input_actions",
  "source_extraction_id": "5e5aaa7ca34747248ba59c37c87fab01",
  "version": 2,
  "memory_type": "entities"
}
-->