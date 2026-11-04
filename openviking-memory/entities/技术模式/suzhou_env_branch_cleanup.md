# 残留的苏州环境分支导致逻辑不统一
在苏州市房地产监测V3项目中，诸如 `exchangeContract/index.vue` 的文件保留了 `isSuzhouzhizai` 和 `currentEnvironment` 分支，耦合了逻辑。

## 问题根因
- `exchangeContract/index.vue` 和其他文件保留 `isSuzhouzhizai` 和 `currentEnvironment` 分支
- 环境分支耦合逻辑并阻碍文件间统一

## 解决方案
- 移除分支并统一通用结构
- 固定 `BuildSelectDialog.vue` 中显示的列和 API `/building/buildinginfo/xyBuilding`
- 在 `rec/index.vue` 中，统一接口 `listRec` 和文本

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/277.md
- 涉及文件: exchangeContract/index.vue, contractView/index.vue, BranchOneDialog.vue, BuildSelectDialog.vue (两个 benefit 文件夹), rec/index.vue
- 所属项目: 苏州市房地产监测V3; 会话: bf97360e-6cc0-4224-aef3-edf155a68b8e; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_env_branch_cleanup",
  "source_extraction_id": "5d98e1c12360479781ab28931522b2f2",
  "version": 1,
  "memory_type": "entities"
}
-->