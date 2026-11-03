# 房地产监测V3 prefund模块联调环境
房地产监测V3（szfc-v3-wt-prefund-new worktree）的前后端联调环境、nginx配置与已知缺陷记录。

## 服务与端口
- common-gateway 端口 8080（本地网关，分支 feature/feat-ligy-260825，JDK21）
- zhi3-prefund 端口 9214（后端服务）
- nginx 端口 8098（UI管理站点，sites-enabled符号链接）
- 前端 worktree 目录 szfc-v3-wt-prefund-new，分支 feature/prefund-account-agreement-1413-1415

## nginx 配置关键事实
- `/api/v3.0/` 必须代理到本地网关：`proxy_pass http://127.0.0.1:8080/v3.0/`（nginx自动重写前缀）
- 曾错误指向远程 dev 环境导致前端请求交替失败，修正后接口 15/15 全通过

## 已知代码缺陷
- 后端 `RegulatorOrgServiceImpl.generateOrgCode()` 用 MyBatis-Plus `lambdaQuery()` 查最大编码，逻辑删除过滤 `THE_STATE` 致已软删记录不计数，重启可能生成重复编码触发唯一约束；建议改用 IgnoreLogicDelete 或独立序列
- 前端监管账户详情页原缺失名称回填，已加 `fillOrgName`/`fillMainAccountName` 反查
- 监管协议版本下拉原用旧字段 `bbId`，新接口实际为 `regulatoryAgreementVId`，已修正

## 权限与数据
- 菜单按钮权限写入 `COMMON_FRAMEWORK.SYS_MENU`（dameng），新增 23 条：监管账户、监管协议两组各9按钮+协议print
- 测试数据已清理，zsbase 密码恢复原 hash，Nacos 配置还原


<!-- MEMORY_FIELDS
{
  "category": "架构技术事实",
  "name": "fangdichan_prefund_env",
  "source_extraction_id": "9a6a9ff306e7494fb15f28a8bcad1ca1",
  "version": 1,
  "memory_type": "entities"
}
-->