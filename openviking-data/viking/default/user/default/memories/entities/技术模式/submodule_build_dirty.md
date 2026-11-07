# 构建产物未提交致父仓显示 m zhi2-web-admin
前端 npm run build 后按用户要求只提交业务改动、不提交 public/version.json 与 report.html，父仓显示小写 m 是子模块工作区脏标记，不是指针不一致。
## 问题根因
- 小写 m 表示「子模块工作区有改动」，与「指针不一致」（父仓记录 SHA ≠ 子模块当前 HEAD，显示 M / new commits）是两码事。
- build 重写子模块工作区里的 public/version.json（版本号/构建信息）和 report.html（打包分析报告），两文件改过又没提交，子模块工作区脏，父仓自然显示 m zhi2-web-admin，指针其实一致。
## 解决方案
- 交付前分清两类状态：指针用 git diff --submodule=log 或 git ls-tree HEAD zhi2-web-admin 与子模块 HEAD 对比；脏标记用 git -C zhi2-web-admin status --porcelain 查工作区。
- 构建产物默认不提交，但要把 public/version.json、report.html 还原成提交时内容（git checkout -- public/version.json report.html），让工作区彻底干净，否则 m 标记一直挂着。
- 把「构建 → 还原产物 → 只提交业务改动」固化成提交前检查项。
- 汇报写清「父仓仍显示 m zhi2-web-admin 是子模块工作区有构建产物的脏标记，指针本身一致」，避免下一棒重复排查。
## 验证与归属
- 验证：会话 0aa4ef46（基线 3aca541）用户诉求 3「跑 vite build 成功都提交」、诉求 4「只提交你改的内容主子都提交推送」，最终结论写明榆林G 与园区子模块的 public/version.json、report.html 残留未提交，父仓仍显示 m 为脏标记非指针不一致。
- 涉及文件：zhi2-web-admin/public/version.json、zhi2-web-admin/report.html；来源会话：0aa4ef46-4eac-412c-ba34-ac2adf87394d；代码基线：3aca541。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_build_dirty",
  "source_extraction_id": "00baf7a307324dad9ee0f606b283ca05",
  "version": 1,
  "memory_type": "entities"
}
-->