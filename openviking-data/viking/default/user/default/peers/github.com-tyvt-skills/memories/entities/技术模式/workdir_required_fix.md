
# op=full workdir 必填缺陷修复
op:"full" 因 schema 与 api 约定不一致导致未传 workdir 时 100% 返回 WORKDIR_REQUIRED、无法进入 graph 路径的设计缺陷修复，提交 e7318dba（本地未推送）。

## 问题根因
- lib/index.js:381 的 schema 声明 workdir 为 optional，但描述写"required for every full request"
- api.py:365-369 的 run_full 收到空字符串就提前返回 WORKDIR_REQUIRED
- 两处说法不一致，导致任何不显式写 workdir 的调用（schema 默认用法）有 100% 概率不触发 graph 构建，编排器根本没运行，所以"看不到 composer"
- 原缺陷正是只判断空字符串形态（v == ""），未覆盖 None、键缺失、纯空白

## 修复方案
- 采用三级 workdir 解析：依次为 workdir → project_cwd → 进程 cwd
- 判定统一改用 _is_blank()（None、键缺失、纯空白都算为空），不再使用 v == ""
- 插件侧显式传入 project_cwd: config.projectDir，不再依赖隐式子进程 cwd 假设
- 显式传入的 workdir 非法时仍立即报错（WORKDIR_NOT_FOUND 和 hint），不静默回落
- 成功返回新增 workdir 和 workdir_source 字段，可一眼看出来源
- 相对路径改为以 project_cwd 为基准解析

## 测试与验证
- 该仓库为 Python 工程，基线对应 pytest：123 passed，无预存在失败
- 修复后 131 个测试通过（基线123 + 新增8）
- 真实调用验证：orchestrate {op:"full", request:"列出..."} 不传 workdir，能完整走完 plan→execute→summarize，cwd 正确落到编排器工程根目录
- 反向验证：workdir="Z:/definitely-missing" 仍返回 WORKDIR_NOT_FOUND 和 hint
- 计划经 plan_review 四轮审核（期间被驳回一次 P0：把"非绝对路径"与"不是目录"混为一谈），最终通过

## 部署与提交
- 提交 e7318dba，仅本地提交未推送
- 计划留档 .plan/workdir-required-fix.md；主要改动 api.py:365 与 index.js:381
- test_scheduling.py 与 config.js 为本次修复前已存在的改动，不在范围内未纳入提交
- 截至 2026-11-13 17:09：源码已改（17:06:08），但运行中的 DSH Web（PID 9704，12:23:09 启动）加载的是 node_modules 中 10:09 的旧拷贝（file: 依赖为复制非链接），修复尚未生效；需 pnpm install --force 重装并重启 Web 才生效


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workdir_required_fix",
  "source_extraction_id": "b60129e53e214b45abe5b188850b3b57",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->