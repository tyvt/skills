# 太仓物管后端（task2334 worktree）
太仓物管后端仓库，任务 2334 使用独立 task worktree，数据库配置由外部 Nacos 配置中心提供。

## 仓库与 worktree
- 任务 2334 使用 task worktree：`D:\repository\太仓物管后端-task2334`
- 2026-11-15 快照确认该 worktree 处于 detached 状态且工作区干净
- 本地 worktree 内未发现 JDBC 数据源文件，数据库连接细节不在该目录

## 数据源配置
- datasource 由 `bootstrap.yml` 指向 Nacos 的 `shared-druid` dev 配置
- company 服务的数据库配置同样来自外部 `shared-druid` dev 配置
- DBX 当前连接清单中没有太仓（物管）仓的连接，需另行安全取得 dev 配置才能建连

## 认证与清理
- `invalidateTemp` 是内部认证接口，用于临时注册账号清理
- 提交流程中的临时账号失效失败只记录日志，不是强保证，因此核查阶段未做任何写入、也未创建账号

## 关系
- 与前端 zhi1-web-admin 的企业注册原型还原同属禅道任务 2334 范围
- 核查时的安全要求：只做只读结构与唯一性核查，不读取、不输出密钥值

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-taicang-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "category": "程序/仓库",
  "name": "taicang_wuguan_backend",
  "source_extraction_id": "ec664c7cd5c6424792790d103118e22c",
  "version": 1,
  "memory_type": "entities"
}
-->