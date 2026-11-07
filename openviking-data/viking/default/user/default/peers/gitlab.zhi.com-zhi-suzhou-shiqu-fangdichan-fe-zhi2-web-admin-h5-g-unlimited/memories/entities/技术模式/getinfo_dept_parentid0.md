# GetInfo 部门 parentId 为 0 导致超管误判为企业端
门户超管登录后首页误走非管理员侧栏布局，因 GetInfo 解析上级部门时 parentId="0" 触发必失败请求拖垮登录态，角色被兜底为 ROLE_DEFAULT。

## 问题根因
- getPortalUserInfo 取上级部门用 dept?.parentId 真值判断，超管根部门 parentId="0"（字符串为真值）触发请求 dept/detail?deptId=0，后端返回 500「部门不存在」
- fetchDept 无容错，异常直接 throw 导致整个 GetInfo action reject，路由守卫 catch 设 SET_ROLES(['ROLE_DEFAULT']) 且 permissions 清空
- 结果 isSuperAdmin=false、authorizedSectionCodes 为空，resolveHomeLayoutVariant 判为 B 端走 HomeLayoutSidebar（非管理员侧栏，恰被 04ff25537 改为 AI 面板），超管看似「被改坏」

## 修复方案
- 文件 src/api/portal/user.js：新增 isRootDeptId 判断，parentId 为 '0'/0/null 视为根部门不再请求上级
- fetchDept 对根部门直接返回 null，并加 noMessage + catch 容错，部门接口异常不再拖垮登录态
- 提交 09cbf13a6（修复）合并 b76b0d771，父仓库 b0b3216 更新子模块指针，均已推送远程

## 验证与归属
- 真实验证（8092 站点 admin 登录）：roles=['admin']、permsBiz=['*:*:*']、isSuperAdmin=true、走 HomeLayoutAdmin 管理员工作台、不再发 deptId=0 请求
- 非超管逻辑未动仍走侧栏 + AI 面板；dev 后端 admin 账号 roleKey='admin'、terminalType='G'、listPerms 缺 areaManagement 但不影响（有 *:*:*）
- 所属项目：门户；来源会话：2026-11-04 超管首页误改排查；代码基线：b76b0d771

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "getinfo_dept_parentid0",
  "source_extraction_id": "a25d9a4119694df2be281a1f15f93aee",
  "version": 1,
  "memory_type": "entities"
}
-->