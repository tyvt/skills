- 列表卡片底部间距调整后，仅机构注销列表 `list-card-spacing` 断言通过；价格备案详情因无「价格备案查询」菜单授权跳过，车位租赁因路由未授权失败（与改动无关）。
- 无菜单权限的 E2E 用例应改为 `test.skip` 以避免 CI 误报。
- 验证证据：src=苏州市房地产监测V3/075.md；来源会话：f6a19dce-3b89-49cd-bb3f-a111e400f3d8；代码基线：none。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "E2E用例无菜单权限规范",
  "source_extraction_id": "52563a75f85f486e82400fb998e47654",
  "version": 1,
  "memory_type": "preferences"
}
-->