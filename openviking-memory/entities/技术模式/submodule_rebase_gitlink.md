# 子模块指针 rebase 冲突用 gitlink 直写
父仓库 rebase 时上游改了子模块指针，冲突落在 zhi2-web-admin 这个 gitlink 上，用 git update-index --cacheinfo 160000,<sha> 直接落 gitlink，不要重做子仓 merge。
## 问题根因
- gitlink 冲突不是内容冲突，而是「指针指向哪个提交」的冲突：两个父仓提交各自记录不同子模块 SHA，git 无法自动决定保留哪个。
- 常规的「both modified」解法不适用，正确解法不是去子模块里 merge，而是直接把 index 里的 gitlink 条目写成目标 SHA。
## 解决方案
- 先在子模块里 rebase/cherry-pick 到目标基线，确定最终子模块 HEAD SHA（本批为 0bdb66cd3…）。
- 回到父仓执行 git update-index --cacheinfo 160000,<子模块完整 SHA> zhi2-web-admin 直接写 index 条目（160000 即 gitlink 文件模式），再 git add zhi2-web-admin 或 git rebase --continue。
- 冲突解决后必须核对父仓 gitlink 与子模块当前 HEAD 逐一对应（git ls-tree HEAD zhi2-web-admin 看记录的 SHA），不能只看「无冲突标记」。
- 交付按「子模块先行、父仓库只更新指针」成对提交推送，父仓 gitlink 与子模块 HEAD 必须一一对应后再推。
- rebase 会改写子模块侧提交 SHA，对外汇报用 rebase 后的新值（本批 e95443d20/feea23728 → 1ba018635/0bdb66cd3）。
## 验证与归属
- 验证：会话 0aa4ef46（基线 3aca541）用户诉求 2「迁移到其他项目」、诉求 3「跑 vite build 成功都提交子模块+主模块」，最终结论写明园区子模块落后 6 提交 rebase 后自检报错 0 但两提交 SHA 改变，园区父仓库 rebase 在 zhi2-web-admin gitlink 上冲突，用 update-index 解决无丢失改动。
- 涉及文件：zhi2-web-admin；来源会话：0aa4ef46-4eac-412c-ba34-ac2adf87394d；代码基线：3aca541。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_rebase_gitlink",
  "source_extraction_id": "00baf7a307324dad9ee0f606b283ca05",
  "version": 1,
  "memory_type": "entities"
}
-->