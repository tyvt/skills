# 苏州房产后端仓库（data-property 子模块）
苏州房产管理端（zhi3）配套的 Java 多模块后端仓库，人事变更等业务在 data-property 子模块内。

## 仓库与分支状态
- 主检出处于 `develop/v2.6.2-yulin`（yulin 线），15 个 dirty 文件；14 个子模块全在 huishan 线；禁止 checkout/pull。
- v3.0.0 已 fetch：FETCH_HEAD `9974855d`（2026-04-14，已是最新，fetch 不改工作树）；v3.0.0 中 data-property gitlink 为 `78879c2e`；另建 v3 worktree `estate-manage-v3`。
- `service-*` 与 `data-property` 都是 submodule（gitlink），superproject 的 git grep 无法进入，需在子模块对象库内检索。

## 人事变更详情接口
- v3.0.0 controller：`PersonnelRecordChangeController.java` 映射 `/company/personnelRecordChange`，只有 `GET /{id}` + `@RequiresPermissions`，无 `POST /detail`；`@DataScope` 只在 page 方法（第 60 行），详情接口无数据权限过滤。
- 已部署的 huishan 版 controller 映射 `/v2.0/company/personnelRecordChange`，同样只有 `GET /{id}`。
- 可用的 18 字段 `personnelRecord/detail` 也是 POST `/detail` 模式，说明存在网关/框架重写；其 `getByPersonnelRecordId` 带 null 守卫（`if(isNull) return new Vo()`）。

## 400 根因与验证状态
- 根因确证：`PersonnelRecordChangeServiceImpl.getByPersonnelRecordChangeId:177-185` 中 `this.getById(id)` 无 null 守卫，直接 `personnelRecordChange2Vo(change)` 与 `change.getChangeObject()` → 按 id 查不到行即 NPE → 全局异常处理器返回 `{"code":500,"msg":"服务器异常"}`（HTTP 400）。
- hop5 实测：dev 库 2 个有效 id、9002 的 1 个 id、两账号共 5 组合全部 400，换数据无效；查不到行的原因指向请求 id 与后端所连库不匹配，或 `/detail`→`GET /{id}` 改写链路。
- 仍需真实堆栈实锤（hop8 用 dev 库凭据起本地服务抓堆栈）；本地构建/启动步骤与 Nacos 配置见 v3_backend_startup 实体。
- 本地无运行中的 data-property；8098/9002 的后端在远端，应用日志停在 2026-11-05。


<!-- MEMORY_FIELDS
{
  "category": "backend_project",
  "name": "fangdichan_backend",
  "source_extraction_id": "0b0b9d460a884399bd77607e85481cf4",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->