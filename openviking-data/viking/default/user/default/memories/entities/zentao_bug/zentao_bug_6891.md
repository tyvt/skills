# 禅道 Bug 6891
禅道缺陷 6891：经纪机构从业人员变更详情页字段大面积显示「-」、人员角色显示原始码，根因是详情接口 400（后端权限码未开通 + 接口路径不一致）；前端已按 busCode 分发修复并推送。

## 前端改动
- 子模块 zhi2-web-admin（分支 develop/v3.0.0）：`src/views/company/staffManagement/personnelChange/detail.vue` 薄壳由固定渲染 detail 改为按 `meta.busCode === 'jgcyrybg'` 分发到 `AgencyPersonnelDetail`（经纪机构备案详情，18 字段 + 字典显示 + 变更增量），其它 busCode 走原组件。
- 提交：子模块 `3eb130cb6e`（fix(personnelChange)…禅道6891）、父仓 `18f8b341b6`（仅 gitlink），均推 origin/develop/v3.0.0；两端 `git ls-remote` SHA 与本地 HEAD 一致，推送前 ahead=1/behind=0 无冲突。
- 验证：ESLint 在子模块 cwd/配置下 0 error，pre-commit eslint --fix 通过；因详情接口 400 产不出实机验证截图，按「知情豁免验证」直接提交，未执行构建。
- 脏文件按约定未提交：子模块 `public/version.json`、`_review.json`，父仓 `deploy/nginx.conf`、`_review.json`。

## 后端问题
- 现象：详情页字段大面积「-」或仅 9 字段、人员角色显示原始码，根因是详情接口 400 无数据。
- 实测证据（9212 + `_dp-run8.log`）：`/page` → 200 且数据完整存在；`GET /{id}` → 400 + `code:403`，日志 `handleNotPermissionException:46` 权限码 `company:personnelRecordChange:query` 校验失败。
- 控制器 `:60` 为 `@RequiresPermissions`、`:61` 为 GetMapping，而 `/page` 的注解被注释；前端实际调用的 `POST /detail` 报 `NoResourceFoundException`（该路径未注册），经网关 404。
- 根因判定：A 权限拦截（账号无 query 权限码，请求未进 ServiceImpl）+ B 接口路径不一致（`/detail` vs `/{id}`）；此前「getById null→NPE」假设已证伪。

## 禅道状态
- bug 6891 保持 active、经办人 tiany；2026-11-24 追加备注 comment id `98786`（action=commented、内容 4584 字符），未置 resolved。
- 建议后端：开通 query 权限或去掉详情权限校验、统一详情接口路径；修复后回归验证再走前端验证门。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6891",
  "source_extraction_id": "10a480b50231426aa5b53f873a63eedc",
  "version": 1,
  "memory_type": "entities"
}
-->