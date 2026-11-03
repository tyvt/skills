# 多子模块指针分支禁止rebase
苏住房C根仓库superproject的长期分支因大量子模块指针提交，rebase会反复冲突，应改用merge或保持现状。

## 问题现象
- 分支suzhou-shiqu-suzhufang-main-v2.1-mp执行git rebase onto 017efba，第48/103提交因子模块历史分叉失败
- 仓库本身也停在同一rebase冲突，反复重试无效

## 根因
- 根仓每次提交若子模块工作区有更新就改gitlink指针；本分支109提交中64个动过指针
- 父仓指针与子模块历史是独立演化线，rebase逐个重放几乎每个指针提交都冲突；合并只需在指针冲突选较新SHA

## 解决方案
- 先git rebase --abort恢复原HEAD（25d2063、子模块d2a5917），确认git status干净
- 不再对这类分支做rebase onto，保持现状或改用merge（指针冲突选含对方提交的较新SHA）
- 判断标准：估算子模块指针提交数/总提交数占比高（如64/109）就放弃rebase

## 验证与归属
- 来源会话98536349（2026-08-21，基线9832ba3）确认abort后恢复并结论禁止rebase
- 涉及文件：.gitmodules、package.json
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "submodule_rebase_ban",
  "source_extraction_id": "39b4e56e7fd44001bc1b6da652c64178",
  "version": 1,
  "memory_type": "entities"
}
-->