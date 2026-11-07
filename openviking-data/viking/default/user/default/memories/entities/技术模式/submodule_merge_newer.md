# 父仓合并子模块指针非祖先时按提交时间择一
父仓库合并时若 zhi2-web-admin 子模块指针双方均 modified 且互非祖先，可对比提交时间保留较新一侧 SHA。
## 适用场景
- 双方已分叉、各自含独立改动的指针冲突，无法用「一方是另一方祖先」决定保留侧。
- 与「保留已包含对方提交的较新本地 HEAD」祖先判法互补。
## 解决方案
- 对比冲突两侧子模块提交的 author/committer 时间，保留较新的一侧 SHA。
- 执行 `git add zhi2-web-admin` 完成合并。
## 验证与归属
- 验证：会话 fbdc62fd 保留 41dc13ae（15:03）弃 adc14960（13:47），提交 20a4874。
- 涉及文件：zhi2-web-admin；父仓库 merge 提交；所属项目：2-0；来源会话：fbdc62fd-a867-4aac-822c-605c9aca5803；代码基线：产品2.0 父仓子模块指针冲突。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_merge_newer",
  "source_extraction_id": "aeb6021c119446819b122f4f280cd7ed",
  "version": 1,
  "memory_type": "entities"
}
-->