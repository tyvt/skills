# deploy-env 注册表写回
registry.sqlite 与 upsert_env.py 组成 deploy-env 的环境登记和凭据写回链路。

## 注册表与凭据
- registry.sqlite 已入库并受 git 跟踪（运行时 last_health_at 回写还原不提交）；迁移新增 3 列与 events 事件流水表、迁移前留备份。
- 凭据库 34 env 行、两表加 password_plain 明文列、10 行斜杠式错配引用改 canonical viking 格式、补历史账号 5 个（管理员 2、业务测试 2、fdc-v3 local 1），privacy 库 deploy_env-pwd-county/-fangxun/-super 可解出明文。
- 密码链路 privacy_upsert→secret_ref→secrets/inject；新端点需重启 deploy-env-dashboard 才生效（自启进程曾跑旧代码）。

## 写回接口
- upsert_env.py：5 环境白名单、端口全局唯一、单事务写锁 + SELECT/UPDATE 幂等、拒明文密码、DB 路径可注入。
- api.py:277 的 POST /api/registry/upsert 复用本机 + token 鉴权并与 CLI 共用写回函数；SKILL.md:33 补「复现查询流程」「验证后回写/会话纠错」两节。

## 验证与缺陷
- 验证全绿：编译 PASS、新增/幂等不重行、非法 env 拒绝、端口冲突拒绝、明文拒绝、API 无 token=403 有 token=200 且落库正确。
- selftest.py PASS 2/2，selftest_dashboard.py 有 2 个预存 FAIL（state-no-plaintext、accounts-rendered）。
- 测试抓到两处缺陷：--role 被 argparse 前缀匹配吞成 --role-label（账号未入库）、env_registry.project 为 NOT NULL 未给默认；修复后全部通过。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "deploy_env_registry",
  "source_extraction_id": "c22a6b38e8e84968b7382f215bcb18d7",
  "version": 1,
  "memory_type": "entities"
}
-->