# 后端管理员菜单按项目授权机制
苏州市房地产监测V3 后端在用户为管理员时，菜单来自 projectMenuService.listByProjectId(projectId, subSysCode)，即由 SYS_PROJECT_MENU 项目菜单关联表决定超管可见菜单。

## 问题根因
- 菜单表 SYS_MENU 中存在某条菜单（如详情路由 regulatoryAccountNew/:tableid），若 SYS_PROJECT_MENU 未登记该菜单与项目的关联记录，后端不下发，前端路由不注册。
- 表现：handleAdd 跳转到 <list>/add 时报 404 或停留原页，因为详情路由未注册，:tableid 动态段无法匹配 add。

## 解决方案
- 在 SYS_PROJECT_MENU 补登缺失的详情菜单与项目关联记录。
- 验证：补录后菜单 total 从 540 增至 542，两个详情路由注册成功。

## 菜单表结构与模块注册
- 菜单由后端接口 /system/menu/getRouters 动态下发，数据落在达梦库 COMMON_FRAMEWORK schema 的三张表：SYS_MENU（菜单/按钮本体，含 PATH、COMPONENT、MENU_TYPE、PERMS、VISIBLE）、SYS_PROJECT_MENU（项目-菜单关联，决定超管可见菜单）、SYS_ROLE_MENU（角色-菜单关联，超管路径用不到）
- 超管可见菜单要求 SYS_PROJECT_MENU 存在 PROJECT_ID='fangdichan' + 对应 MENU_ID 的记录，否则即使 SYS_MENU 已配也不下发
- 四个模块注册的 8 条菜单（SYS_MENU）：监管机构管理（列表 2114991472432386052 / 详情 2114991472432386053，前缀 /zfzjjg/account/regulatorOrg）、主账户管理（列表 2112361044487790605 / 详情 2114991472432386059，前缀 /zfzjjg/account/mainAccount）、监管账户（监督开户确认）（列表 2112361044487790620 / 详情 2114991472432386066，前缀 /zfzjjg/account/regulatoryAccountNew）、监管协议签署（新）（列表 2112361044487790664 / 详情 2114991472432386067，前缀 /zfzjjg/zjjg/superviseAgreementNew）

## 菜单与按钮字段约定
- VISIBLE='0' 表示显示，VISIBLE='1' 表示隐藏；隐藏项作为详情页由路由跳转使用。
- 菜单与按钮项 IF_USE_AUTH='1'。
- 本次通过 DBX 插入的数据共 38 条：8 条菜单（MENU_TYPE='C'）+ 30 条按钮权限（MENU_TYPE='F'）。
- 按钮权限动作名与数据库记录一一对应：edit、submit、cancelSubmit、approval、cancelApproval、query、print。
- 四个模块权限前缀与代码 permsPrefix 动态拼接的 4 个前缀完全一致：/zfzjjg/account/regulatorOrg、/zfzjjg/account/mainAccount、/zfzjjg/account/regulatoryAccountNew、/zfzjjg/zjjg/superviseAgreementNew。
- VISIBLE 值不统一：主账户管理与监管机构管理的记录为 1（隐藏），监管账户与监管协议的记录为 0（显示），需核对是否影响按钮显示。

## 数据插入问题与边界
- 主账户管理（MENU_ID 2112361044487790605）在 SYS_PROJECT_MENU 存在两条重复关联记录（2114991472444968970 与 2112361044504567820），源于 2026-10-30 插入前未检查已有初始化数据。
- 插入数据边界：CREATE_USER='system' 且时间为 2026-10-20 的为原有初始化列表页菜单；CREATE_USER='admin' 或时间为 10-30、11-02、11-03 的为本次会话插入。
- SQL 脚本已生成至 docs/sql 目录（原为空）。

## 验证与归属
- 所属项目：苏州市房地产监测V3（gitlab.zhi.com web-admin-h5）；来源会话：2026-11-03 调试会话。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_menu_auth",
  "source_extraction_id": "b49a6b56123d43d5b035532fd9001d8f",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->