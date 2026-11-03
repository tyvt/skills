# 园区yuanqu分支样式cherry-pick冲突处理约定
子模块 zhi2-web-admin 从 develop/v2.6.1 批量 cherry-pick 到 develop/v2.6.1-yuanqu 时保留本地布局约定并合入上游样式优化。

## 冲突处理要点
- src/styles/index.scss 保留 yuanqu 分支已有的 padding: 0、sub-container 等布局选择器，再合并上游表格/列表样式优化
- zs-table.vue 合并悬停同步逻辑时保留空值安全检查
- merge commit 若 pick 结果为空（内容已存在）应跳过而非强合

## 验证与归属
- 验证证据：会话 fcad00cd→0d94fd1b 区间 pick 19/20 成功，冲突要点含 index.scss、pubHouseTable、zs-table 与空 merge 跳过
- 涉及文件：zhi2-web-admin/src/styles/index.scss、zhi2-web-admin/src/components/zs-table/zs-table.vue、zhi2-web-admin/src/views/benefit/pubHouse/components/pubHouseTable.vue
- 所属项目：园区公共收益；来源会话：dde203fa-45f2-4bba-bbf3-cb24d4c6547c；代码基线：ba114dc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "yuanqu_cherrypick_styles",
  "source_extraction_id": "7450b259a3f74eb1a01721b1303c3886",
  "version": 1,
  "memory_type": "entities"
}
-->