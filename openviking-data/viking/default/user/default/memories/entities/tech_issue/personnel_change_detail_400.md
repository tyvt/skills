# 从业人员变更详情接口 400 根因
苏州房产监测 V3（data-property 服务）从业人员变更详情接口返回 400/code500 的后端根因，对应禅道 6891 详情页无法渲染。

## 根因（hop10 定论）
- `GET /company/personnelRecordChange/{id}` → 403「没有访问权限」，日志 `handleNotPermissionException,46` 显示权限码 `company:personnelRecordChange:query` 校验失败。
- `POST /company/personnelRecordChange/detail`（裸 id）→ 500「服务器异常」，日志实为 `NoResourceFoundException: No static resource company/personnelRecordChange/detail`，该路径不在本地 9212 这个 jar 中。
- 经 8098 网关访问该详情路径 → 404「服务未找到」。
- 结论：400 是后端权限拦截 + 详情接口路径可见性问题，不是前端根因，也不是 NPE。

## 数据侧证据
- 对照 `GET /page` → 200，含完整行 `2113249234228731906`（`bizState=2`、`changeObject` 非空、`personnelRole=service`）。
- 因此 `getById` 不会返回 null，`PersonnelRecordChangeServiceImpl.getByPersonnelRecordChangeId`（行 185）缺空值保护抛 NPE 的假设被证伪。
- 开发库 `T_PERSONNEL_RECORD_CHANGE` 仅 2 行（`211324…`/`2113242681819914241`，同一人，changeObject 完整），当前无其他 changeId 可验证 18 字段详情。

## 复现与环境
- hop5 的 5 组组合均返回 400：区县账号 6001039 / 管理员 zsbase × changeId 212033… / 211324…，分别在本地 8098 与真实 9002 环境；当时判断非前端参数或账号权限问题。
- 本地 9212 服务内置权限拦截器，直连需回放有效 token；服务仅在 `-Dspring.liquibase.enabled=false` 下可启动，否则卡在 Liquibase 启动失败。
- 区县账号 `6001039/ZS0001Aa!` 用正确验证码在「用户登录」「机构登录」两页均被拒「用户名或密码错误」，拿不到带 query 权限的 token，取证改用 hop9 的有效管理员 token。
- 后端仓库 estate-manage 本地在 develop/v2.6.2-yulin（榆林产品线，非苏州 V3，落后 2394 提交、11 个脏子模块，不得改动）；已非破坏性 fetch develop/v3.0.0，但 v3.0.0 模块结构完全重构，详情端点不在旧 checkout；本地仅运行 common-framework + common-gateway，业务服务经 Nacos 远程。


<!-- MEMORY_FIELDS
{
  "category": "tech_issue",
  "name": "personnel_change_detail_400",
  "source_extraction_id": "43a46a9073294e41950e959acb582816",
  "version": 2,
  "memory_type": "entities"
}
-->