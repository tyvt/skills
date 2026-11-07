# szfc-v3-wt-prefund-new

房产监管资金（预售资金监管）前端项目，基于 zhi2-web-admin 子模块的 worktree 检出。

## 本地开发环境
- 本地访问地址：http://127.0.0.1:8098/（或 localhost:8098），由本地 nginx 站点提供，root 指向 D:/repository/苏州市房地产监测V3/dist
- 构建来源：worktree szfc-v3-wt-prefund-new 构建输出至父仓库根 dist/（vite.config.js 中 rootDir = resolve(__dirname, "./")），非子模块目录内
- 登录超管账号：zsbase，密码 ZS001Aa!
- 运行服务：nginx 8098、网关 8080、prefund 9214

## 前端页面与路由映射
- 四个模块前端页面文件位于 worktree 的 src/views/supervision/account/ 下：regulatorOrg/{index,detail}.vue、mainAccount/{index,detail}.vue、regulatoryAccountNew/{index,detail}.vue、superviseAgreementNew/{index,detail}.vue
- COMPONENT 字段值形如 supervision/account/regulatorOrg/index，store/modules/permission.js 的 loadView 据此从 @/views/ 动态 import

## 模块组成
- mainAccount：主账户管理
- regulatorOrg：监管机构管理
- superviseAgreementNew：监管协议
- regulatoryAccountNew：监管账户

## 技术要点
- zs-select 只接受 `:options`（dictLabel/dictValue），不支持 `<zs-option>` 子节点
- 监管协议版本接口返回 theVersion/regulatoryAgreementVId，非 dictLabel/dictValue 结构
- 前端路由需 542 条（监管账户、监管协议各 1 条 /add）；SYS_PROJECT_MENU 缺这 2 条项目关联记录时 /add 路由不下发，模块无法新建
- 监管账号弹窗按 projectId + openaccountTag='1'（已开户监管账户）过滤，本环境库无此类数据

## 测试覆盖
- E2E 覆盖四个模块的新增真实 UI 链路（弹窗选择、保存、详情回显）
- 测试环境若无「项目 + 已开户监管账户」数据，监管协议完整保存链路无法跑通（属数据准备问题，非代码缺陷）

<!-- MEMORY_FIELDS
{
  "category": "前端项目",
  "name": "szfc_prefund_new",
  "source_extraction_id": "3fbf9c2eefca4bb891d002910150c22c",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->