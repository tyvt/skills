
# 禅道Bug 6235 新增合同户室号分页缺陷
房产管理系统zhi2-web-admin预售合同签订「新增合同」弹窗户室号分页缺陷。2026-11-05曾解决表格行数与外层滚动；2026-11-06因翻页仍显示第一页数据被重开；2026-11-09 11:47 lichandan第三次激活后订正根因并修复。

## 根因与定位（2026-11-09订正）
- 点「楼幢」走 contractRequest.js 的 queryHousesByBuildCode；request.js 194–205行非白名单接口统一 moveUrlQueryToBody，将 config.params 合并进 config.data 后 delete config.params
- /presale/houseInfo/queryHousesByBuildCode 不在 security.js 白名单，request({params}) 与 post(url,data) 加密请求完全相同，11/06「分页从body挪到query」系空操作
- 后端按楼幢一次返回全量户室、忽略 pageNum；unwrapPageResult 用 rows.length 兜底 total=6；zs-table 的 table-tr 只算高度不截断数据，6条始终在表里，翻页只改内部滚动位置
- 点「单元」走 findHouseList 后端真实分页，仅楼幢路径复现

## 修复方案（2026-11-09第三次）
- pageRows.js 新增 paginateRows：全量结果按页码切片，后端已分页则原样返回
- chooseHouseDialog.vue applyOriginPage() 统一楼幢/单元路径，翻页清空跨页勾选
- contractRequest.js 恢复 post(url,params) 并删错误注释
- scripts/check-page-rows.mjs 回归守卫挂入 npm run lint；docs/frontend/common-errors.md E-040 订正

## 验证
- npm run build 通过（worktree 缺 esbuild 补齐后重跑），产物 pageRows-ZhUnEmV1.js 含 paginateRows；回归守卫：6条全量→第1页5条/第2页1条
- eslint --quiet 零错误；npm run lint 全量基线红12509条存量无关
- 未目视回归：无客测账号，本地8098被并行任务12:16构建占用未覆盖，需lichandan在「新增合同→选楼幢→6户室翻页」复验

## 提交推送与禅道回写（2026-11-09 用户授权后执行）
- 子模块 zhi2-web-admin 提交 08bea07a3 推送 origin/fix/bug-6235-house-pagination-v3；父仓库 workspace 提交 e05f947 推送同名远程分支；gitlink 从 add460515 更新为 08bea07a3
- 两仓库工作区干净，未夹带 public/version.json、bun.lock
- 禅道：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、resolvedDate=2026-11-09 13:11:15、assignedTo=lichandan
- zt_action id=89271（action=resolved、extra=fixed）含订正根因+切片修复+两提交号+守卫验证+待lichandan复验；事务内与提交后双校验通过
- 未本地合并 develop/v3.0.0，仅推 fix 分支由用户走 MR；worktree D:\repository\苏州市房地产监测V3-wt-bug-6235-v3 保留

## 落地与归属
- 独立 worktree 分支 fix/bug-6235-house-pagination-v3；开工6个收尾7个worktree，主工作区HEAD由其他任务从0967c67推进到0144a81
- 并行变化（非本轮）：主工作区HEAD由其他任务从0144a81推进到d140832，wt-bug-6173/wt-bug-6285被其他任务删除；本轮仅用wt-bug-6235-v3

## 历史误判（2026-11-06，已作废）
- 曾误判根因为body/query分页位置并回写 resolved/fixed/assignedTo=lichandan/resolvedBy=tiany；11/09第三次激活后结论作废
- 空操作提交子模块 fdb331230、父仓库 3749533 均推 develop/v3.0.0，保留在历史


<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6235",
  "source_extraction_id": "9f8a50b60d4b4d8b88a18c63980e6a12",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 4,
  "memory_type": "entities"
}
-->