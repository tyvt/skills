# 经纪机构注册统一社会信用代码输入框显示修复
苏州市房地产监测V3 修复经纪机构注册 Step1 统一社会信用代码输入框被 append 区域挤压的问题。

## 变更说明
- `Step1BasicInfo.vue` 将「统一社会信用代码」从 `append-buttons` 改为 `input-with-actions` 布局（与开发企业注册一致）
- 输入框单独占 `flex: 1`，「查询/提取/重置」改为右侧 `link-action` 链接
- 三个按钮包在 `.action-buttons` 容器内，`.input-with-actions` 设 `flex-wrap: nowrap`
- 输入框 `flex: 1 1 19ch; min-width: 0` 可收缩为按钮让出空间，按钮组 `flex-shrink: 0`、组内间距 `8px`
- 同类布局同步对齐至 `Step1CompanyInfo.vue`
- 查询、提取在 loading 时显示「查询中...」「提取中...」并禁用点击
- 补充 `data-testid`：`institution-register-btn-query`、`institution-register-btn-extract`、`institution-register-btn-reset`

## 测试与归属
- E2E `institution-register-extract.spec.js` 选择器改为 `getByTestId('institution-register-btn-extract')` 并增加断言
- E2E `register-layout.spec.js` 经纪机构用例 `minUsciWidth` 由 240 调整为 180，新增 `assertInstitutionUsciActionsSameRow` 断言三按钮与输入框 Y 坐标对齐，4 个用例全部通过（含「提取中 USCI 不被截断」）
- 所属项目：苏州市房地产监测V3；来源会话：4b2f9d95-14ba-4d66-a8c1-5657389a2a88、01447af2-d905-4a03-a903-55e9e5594222

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "institution_register_creditcode_fix",
  "source_extraction_id": "f16b3953e23c43639f5b40170e496d0f",
  "version": 2,
  "memory_type": "entities"
}
-->