- 提交时若 husky 钩子退出码为 1，先 git log -1 --oneline + git show --stat HEAD 核实提交对象是否已落地、内容是否只含本次目标文件，内容完整就不要再提交
- 提交必须按具体路径暂存（不要 git add .），避免纳入别人正在改的文件
- 两层仓库都提交：子模块先行、父仓只更新 gitlink 指针，核对父仓指针与子模块 HEAD 一致、两层与远程 0/0 同步
- 构建产生的 public/version.json 不纳入提交
- 每笔提交都过 lint-staged 钩子，中文提交信息确保无乱码

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "git提交工作流",
  "source_extraction_id": "4e7595f56a8b4f269590e606ea01b358",
  "version": 1,
  "memory_type": "preferences"
}
-->