# 表格底部空白全局排查修复
苏州市房地产监测V3 项目对表格底部空白做全局排查，并用 E2E 验证 list-card 间距修复。

## 验证结果
- 机构注销 list-card 间距用例通过（与本次修复直接相关、真正执行断言的唯一用例）
- 价格备案详情「楼幢」Tab 用例跳过：账号未授权「价格备案查询」菜单或列表无数据/无楼幢 Tab，与 test.skip 条件一致
- 车位租赁合同（区域树）用例失败：路由 benefit/parkingSpaceContractFiling/index 未找到、菜单未授权，与本次表格改动无关

## 后续建议
- 若需 detail 用例跑通，E2E 账号需具备「价格备案查询」且列表有可查看详情、楼幢子表有数据
- 可将车位用例改为与详情一致「无菜单则 skip」，避免 CI 误报失败

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue
- 项目：苏州市房地产监测V3；来源会话ID：f6a19dce-3b89-49cd-bb3f-a111e400f3d8

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_spacing_e2e",
  "source_extraction_id": "cf849a215e8c44dd8c9bdd8eace90dfe",
  "version": 1,
  "memory_type": "entities"
}
-->
