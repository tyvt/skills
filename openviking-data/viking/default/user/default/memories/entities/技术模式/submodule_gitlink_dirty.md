# 子模块切回分支后父仓 Gitlink 显脏为预期
子模块切回其他分支后父仓库 gitlink 显示脏是 checkout 正常结果，但合并到共享集成分支须显式征询。

## 现象
- 工作提交在子模块分支 develop/v2.6.2-suzhufang-li（已推送 origin/-li），主仓库 gitlink 正确指向它
- 切回 develop/v2.6.2-suzhufang 后本地父仓显示子模块引用脏（检出 2d9918c7d3 ≠ 已记录 38c4b439b）

## 关键区分
- gitlink 脏是切分支的正常结果：父仓记录指针是已推送工作提交，本地检出另一提交，diff 不一致不代表改动丢失
- 把分支合进共享集成分支会改变所有人代码，属不可逆协作面操作，不能夹带在「切回分支」指令里自动执行

## 正确做法
- 切分支前用 git branch --contains <sha> 与 git log origin/<branch> 交叉验证工作提交位置
- 切回后向用户解释 gitlink 脏含义并确认远程父仓 gitlink 仍正确指向工作提交
- 合并共享集成分支前显式征询，给出具体命令（git merge 或提 MR）与后续步骤
- 交付表格分行写清「已提交已推送分支」「已切回检出分支」「待合并缺口」

## 验证与归属
- 来源会话 session-9126d917-b8a3-4db0-b250-80e5b6c5d189（基线 c35a24a）
- 涉及文件 zhi2-web-admin、.gitmodules；Agent 明确未自动合并 -li 进 suzhufang

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_gitlink_dirty",
  "source_extraction_id": "f34d1805f9ca4170930502ee19b04a3b",
  "version": 1,
  "memory_type": "entities"
}
-->