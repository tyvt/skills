# 禅道缺陷 7047
惠山二期G zhi2-web-admin-h5 业主账户开户详情「新增开户明细」页无分页缺陷，2026-11-27 已定因为既有提交修复、经前端验证门确认，并回写禅道 resolved/fixed 收口。

## 缺陷与定因
- 链接 `http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=7047`；标题「【惠山物业】业主账户开户详情：新增开户明细页无分页，放大/缩小分辨率都不显示」。
- chain_id `bug7047-新增开户明细分页`，不设 maxHops；目标 ScopeSelectDialog.vue 分页修复 → 前端验证门出证据 → 用户确认 → 禅道 resolved+fixed 附图；2026-11-27 未完成项清空、链终止。
- 决定性定因：`b95646281` 提交标题「泰兴生产-新增开户明细，缺少分页控件」，只改 `ScopeSelectDialog.vue`（+7/-53），与 bug 7047 同类问题。
- 修复在位：源码 `:23` `<zs-pagination v-show="total > 0" :total="total">`、`:396-399` 双回退（`response.rows || response.data?.rows || []`、`Number(response.total ?? response.data?.total)`、`responseTotal > 0 ? responseTotal : rows.length`）；8120 部署包 `ScopeSelectDialog-BxBMa94r.js` 已含该修复，git status 干净。
- 证伪：`20cf91a66` 回归曾把 zs-pagination 移入 table-wrap 且 CSS 改 `flex-shrink:0`；hop4 DOM/实机证伪 CSS 裁切（改 `total=8` 后 display `none`→`flex`、渲染「共8条记录」、`clientHeight===scrollHeight`），hop9 证伪旧部署论。

## 验证与偏差
- id=100 已备案详情「开户明细」有真实数据 10 行（室号 101/102/201…）+ 分页完整（共 692 条记录 / 10条每页 / 页码 1-6…70 / 上下页 / 前往页）；证据图 `bug7047-pagination-20261127-124047.png`（`C:/Users/Administrator/AppData/Local/Temp/zentao-7047/`）经用户确认通过。
- 原图 8 行无分页场景无法端到端复现：隆舜园（projectId=2108129383671762946）、疑隆苑园（2125417978386280449）`generateHousesForOpenAccList` 全返回 0 行（测试数据无房屋）；已在禅道 comment 如实说明。
- API 形态：扁平 `{total:"0",rows:[],code,msg,costMap}` 无 `data` 包裹、`total` 为字符串；当前测试数据均为 0 行草稿态。
- 入口：edit 页（id=109）明细区「新增」直开 ScopeSelectDialog 列表视图，无需先保存/跳 edit；列表视图 `cardValue==1` 走 getTable 路径。
- 禅道图场景：列表视图 8 行无分页，弹窗 VM 沿 `$parent` 到 parent3 的 `tableList` 曾 `total=0`、`queryParams.pageSize=10`；按当前代码应置 `total=8` 并显示。

## 回写与交付
- 2026-11-27 上传证据图得 fileID=24779；bug 7047 原 active、未回写过；openedBy=fuxiachao、product=17、project=193、execution=194。
- 事务回写（session → begin → UPDATE bug → INSERT action 含内嵌证据图 → 挂附件 → 复核 → commit → close）：`zt_bug` status=resolved、resolution=fixed、resolvedBy=tiany、resolvedDate 已落库、assignedTo=fuxiachao（创建人）；最新 action=tiany resolved；fileID=24779 已挂到 bug。
- 无源码改动：子模块 git status 干净，修复由既有提交 b95646281 承载并部署，无需提交推送。
- 清理：`zentao-7047` 过程产物目录已删（4 张截图 + comment 文件）、浏览器会话已关、`/tmp` 历史产物已不存在。


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7047",
  "source_extraction_id": "149f495b182742f88fe7e275a3c76361",
  "version": 6,
  "memory_type": "entities"
}
-->