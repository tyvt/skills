# 禅道Bug 6094 选楼幢接口错误
房产管理系统zhi2-web-admin中选楼幢弹窗调用不存在接口导致「服务器异常」的缺陷任务。

## 根因
- 李贵勇 14:51 备注确认：前端把接口改成了不存在的 `/building/building/xyBuilding`，需要恢复
- 对应提交 `6885d79be`（2026-09-16）把正确接口 `/building/buildinginfo/xyBuilding` 改错
- 截图菜单「监管协议签署」、弹窗「选择楼幢」；选楼幢报「服务器异常」

## 修复方案
- 两处实际调用方 `buildUrl` 改回 `/building/buildinginfo/xyBuilding`
- `AgreementDetailsTable.vue`（supervision/agreement/xy/components）对应截图「新增」弹窗
- `index.vue`（benefit/components/AgreementDetailsTable）同一次误改一并恢复
- 同目录 `BuildSelectDialog.vue` 也写错误地址，但全仓无引用、不进构建，未改动；入参和弹窗逻辑未改

## 提交与验证
- 子模块 `zhi2-web-admin` `develop/v3.0.0` 提交 `ed2febdac`，已推送
- 父仓库 gitlink `8db386a`，已推送
- `npm run build` 通过；产物 `AgreementDetailsTable-BjouA6-q.js`、`detail-DH7s2yCz.js` 均为 `buildinginfo/xyBuilding`，错误路径命中 0
- nginx 8098 指向本仓库 `dist/`；未用真实账号点开弹窗
- 工作区遗留价格备案 `index.vue` 与 `public/version.json` 未提交改动，未纳入

## 禅道回写
- 2026-11-03 15:07:59 事务回写：status=resolved, resolution=fixed, resolvedBy=tiany, assignedTo=lichandan, resolvedBuild=trunk
- 操作记录 id 86125；台账记 E-028（docs/frontend/common-errors.md，未提交）


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6094",
  "source_extraction_id": "16eb6d67fa8848c4bca5d6843683279b",
  "version": 1,
  "memory_type": "entities"
}
-->