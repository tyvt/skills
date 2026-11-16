# 太仓物管后端
太仓物管（苏州太仓武港）平台后端仓库，为 zhi1-web-admin 前端的企业注册与登录流程提供接口。

## 仓库与分支
- 本地路径 `D:\repository\太仓物管后端`；另有独立的「太仓物管后端」worktree 快照，2026-11-15 用户提醒后助手承认此前漏看，改按该 worktree 快照定位后端分支
- 任务 2333 指定核对的后端 worktree 路径为 `D:\repository\太仓物管后端-task2333`；2026-11-15 该路径在当前会话不存在，DBX 中也没有对应 Oracle 连接，数据库核对未完成
- 协作目标远端分支 `suzhou-taicang-wuguan-dev-v1.26`（SHA `7bd50fa7…`），工作区当前检出 `dev`；只读核查以该远端 ref 为准，不切换分支
- 目标分支的前端接口实现与 v1.27 主体一致
- 企业注册/登录接口实现位于 `zhishu-company` 模块

## 服务与配置
- `zhishu-company` 与 `zhishu-register` 共用 Nacos `192.168.1.12:8848 / zscloud` 的 `shared-druid-dev.yml`（读取需认证）；Nacos TCP 可达，但只读登录接口曾返回 HTTP 500
- company 与 system 使用不同 Oracle/Redis 配置；账号通过远程 system 服务创建，故 E2E 按服务边界分开校验
- 用户已提供可用 Nacos 凭据，存入 OpenViking 私有凭据槽（不写代码仓或普通记忆），用于只读获取 DB 连接配置；取用遵循私有配置记录的规范，数据库账号直接用于 DBX 连接，密码不写入日志或回复
- 数据源配置入口已核实：两个服务均使用 dev profile，从 Nacos 读取 `shared-druid-dev.yml`，实际 JDBC 凭据不在 worktree
- 注册数据清理接口只能内部调用并做逻辑失效，提交时清账号与 token 均为 best-effort，不能保证清理成功

## 关联
- 前端子模块为 zhi1-web-admin（太仓物管前端），联调与计划状态记录在该实体卡中

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "taicang_wuguan_backend",
  "source_extraction_id": "6d2d4f7d6b424d6b89c515d66ca55f86",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-taicang-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "version": 5,
  "memory_type": "entities"
}
-->