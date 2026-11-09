# 三方 gitlink 冲突按超集解析
父仓库合并时若 zhi2-web-admin 子模块指针出现 base、ours、theirs 三方均不同且无祖先关系的冲突，通过 git update-index 将 gitlink 直写为含全部所需提交的超集 SHA。

## 问题根因
- 特性分支从非 develop 基线拉出（如 fix/bug-6326 从 #6324 tip 5492405 拉出），与 develop 分叉，共同祖先为 5cf20da
- 父仓合并时 gitlink 三方冲突：base 6b48d79、ours 05a1a44、theirs 2eb1e3ba7，两侧均改过子模块指针且互不为祖先
- 远程在本地合并提交后继续推进（origin/develop 到 d429ce9，gitlink 3971283573 未含 #6326），推送被拒需重新合入

## 解决方案
- 选超集 SHA：2eb1e3ba7 = 3971283573 + #6326，覆盖 #6326 与 #6365，用 git update-index --cacheinfo 160000,2eb1e3ba7 zhi2-web-admin 直写 gitlink
- 解析后 git add zhi2-web-admin 并提交合并（本批 develop HEAD 9dc98b1，中间合并提交），不触碰主工作区遗留脏状态（env/.env、.tmp-bug-6324.png、bug6373-close.gif、tmp-imagediff.txt、tmp-gifframes/）
- 父仓推送被拒时把远程合入，因本地目标 SHA 是远程 gitlink 的超集，冲突处重新解析为同一超集 SHA 不丢工作
- 子模块推送须先于父仓：2eb1e3ba7 诞生于 wt-bug-6326 子模块，用 update-index 写指针不触碰主子模块工作区

## 验证与归属
- 会话 2026-11-09：fix/bug-6326 从 #6324 tip 5492405 拉出，与 develop 分叉，共同祖先 5cf20da
- 合并冲突 base 6b48d79 / ours 05a1a44 / theirs 2eb1e3ba7，解析为 2eb1e3ba7 生成中间合并提交 9dc98b1
- 子模块推送 2eb1e3ba7 成功；父仓推送被拒（远程 d429ce9 gitlink 3971283573 未含 #6326），2eb1e3ba7 为其超集需重新合入解析
- 重新合入远程 origin/develop（d429ce9，gitlink 3971283573 为 2eb1e3ba7 祖先）后生成最终合并提交 c2214bc，父仓推送成功：origin/develop/v3.0.0 = c2214bc，gitlink = 2eb1e3ba7（含 #6326 + #6365）；9dc98b1 为中间 develop HEAD（wt-bug-6372 基于其拉出）
- 涉及子模块 zhi2-web-admin；来源会话 2026-11-09

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gitlink_3way_superset",
  "source_extraction_id": "e0f9a3d346784f9d8e780a3c2d4a7c45",
  "version": 2,
  "memory_type": "entities"
}
-->