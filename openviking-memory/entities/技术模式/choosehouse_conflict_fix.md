# chooseHouseDialog合并冲突保留双方
苏州市房地产监测V3 的 zhi2-web-admin 中 chooseHouseDialog.vue 在 #6235 与 #6337 合并时发生冲突，已按保留双方方式解决。

## 冲突背景
- #6337 引入 beginDialogAsyncLoad 乱序防护（beginDialogAsyncLoad/isCurrent 检查与 syncOriginSelection）
- #6235 引入 paginateRows 切片逻辑
- 两者在 chooseHouseDialog.vue 中冲突

## 解决要点
- 保留 #6337 的 beginDialogAsyncLoad/isCurrent 检查与 syncOriginSelection
- 两个列表方法都走 applyOriginPage 做 paginateRows 切片

## 归属与验证
- 涉及文件：chooseHouseDialog.vue
- 所属项目：苏州市房地产监测V3（zhi2-web-admin）
- 来源会话：2026-11-09 闭环报告；合并基线：develop/v3.0.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "choosehouse_conflict_fix",
  "source_extraction_id": "8549e01072c04fd2806538cbba3cb7dd",
  "version": 1,
  "memory_type": "entities"
}
-->