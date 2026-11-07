# 苏住房C分支rebase冲突警告
苏住房C 分支 suzhou-shiqu-suzhufang-main-v2.1-mp 曾因 rebase 子模块历史分叉失败，需避免再次 rebase。

## 事件经过
- 后台 rebase 脚本在第 48/103 个提交处因子模块历史分叉失败
- 已执行 `git rebase --abort`，分支恢复到 `25d2063`，子模块 `d2a5917`，工作区干净

## 当前状态
- 分支：suzhou-shiqu-suzhufang-main-v2.1-mp (25d2063)
- 子模块指针：d2a5917
- 工作区：干净

## 重要警告
- 不要对该分支再做 `rebase onto 017efba`
- 109 个提交里有 64 个改子模块指针，极易反复冲突
- 保持现状或改用 merge 即可

## 验证与归属
- 涉及文件：.gitmodules、pages.json、.gitignore、package.json
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：98536349-484b-4850-bba5-19593e068a4d

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "branch_rebase_warning",
  "source_extraction_id": "b9576b83830643c7a838f2b915795c6c",
  "version": 1,
  "memory_type": "entities"
}
-->