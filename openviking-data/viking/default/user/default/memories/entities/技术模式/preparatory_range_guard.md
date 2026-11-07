# 筹建申请筹建范围默认全量禁改
园区版筹建申请详情隐藏筹建范围增删、默认加载全量房屋的后端约束与前端改造约定。
## 业务规则
- 隐藏筹建范围「新增」「删除」入口，不提供筛选增删。
- 后端查询直接加载该物业管理区域下全部房屋。
- 如有编辑入口需屏蔽筹建范围编辑能力，迁移时勿保留产品 2.0 可维护范围交互。
## 验证与归属
- 验证：业主自治迁移差异化需求第 2 条：隐藏增删、默认全量房屋、接口不再依赖筛选新增逻辑。
- 涉及文件：zhi2-web-admin/src/views/autonomy/preparatoryApply/detail.vue、preparatoryApply/components/preparatoryRangeTable.vue
- 所属项目：园区公共收益；来源会话：9188dc08-2eb6-4f25-a62a-99cd041edbf7；代码基线：191094f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "preparatory_range_guard",
  "source_extraction_id": "7305906246884e7399822169329ad226",
  "version": 1,
  "memory_type": "entities"
}
-->