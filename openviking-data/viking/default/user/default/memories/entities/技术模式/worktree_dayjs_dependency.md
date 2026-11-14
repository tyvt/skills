# worktree 缺少 dayjs 依赖的临时构建修复
苏住房防汛C端移动查询H5 项目在隔离分支的 worktree 中构建时缺少 dayjs 依赖，临时指向主检出的依赖目录后构建成功。

## 问题现象
- 隔离分支的 H5 首次编译报错，原因是该 worktree 未安装 `dayjs` 依赖
- 主检出的依赖目录中存在可用的 `dayjs`，worktree 自身缺失

## 解决方案
- 将 worktree 中的 `dayjs` 临时指向主检出的依赖目录，而非重新安装
- 调整后隔离分支的 H5 构建通过

## 后续步骤
- 计划用浏览器临时响应数据生成页面截图
- 截图完成后恢复 Nginx 原有配置

## 归属
- 所属项目：苏住房防汛C端移动查询H5
- 场景：隔离分支 worktree 构建与联调

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "worktree_dayjs_dependency",
  "source_extraction_id": "a770f3748cfa4caea69bc68cf5bccc24",
  "version": 1,
  "memory_type": "entities"
}
-->