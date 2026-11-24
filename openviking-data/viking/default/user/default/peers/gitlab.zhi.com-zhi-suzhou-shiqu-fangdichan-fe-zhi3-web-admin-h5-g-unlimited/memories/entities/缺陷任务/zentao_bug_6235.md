# 禅道Bug 6235 新增合同户室号分页缺陷
房产管理系统 zhi2-web-admin 预售合同签订「新增合同」弹窗户室号分页缺陷；2026-11-05 曾解决表格行数与外层滚动，11-06 因翻页仍显示第一页被重开，2026-11-09 11:47 lichandan 第三次激活后订正根因并修复。

## 根因与定位
- 「楼幢」路径走 contractRequest.js 的 queryHousesByBuildCode；request.js 194–205 行对非白名单接口执行 moveUrlQueryToBody，把 config.params 合并进 config.data 后 delete config.params
- 该接口不在 src/config/security.js 白名单，request({params}) 与 post(url,data) 加密请求完全相同，11/06「分页从 body 挪到 query」系空操作
- 后端按楼幢一次返回全量户室并忽略 pageNum；unwrapPageResult 用 rows.length 兜底 total=6；zs-table 的 table-tr 只算高度不截断数据，6 条始终在表里，翻页只改内部滚动位置
- 「单元」路径走 findHouseList 为后端真实分页，仅楼幢路径复现

## 修复方案
- src/views/contract/utils/pageRows.js 新增 paginateRows：全量结果按页码切片，后端已分页则原样返回
- chooseHouseDialog.vue 新增 applyOriginPage() 统一楼幢/单元路径并清空跨页勾选
- contractRequest.js 的 queryHousesByBuildCode 恢复 post(url,params) 并删错误注释
- scripts/check-page-rows.mjs 回归守卫挂入 npm run lint；docs/frontend/common-errors.md E-040 订正

## 验证与交付
- npm run build 通过（worktree 缺 esbuild 补齐后重跑），产物 pageRows-ZhUnEmV1.js 含 paginateRows；回归守卫 6 条全量→第 1 页 5 条／第 2 页 1 条；eslint --quiet 零错误，npm run lint 全量基线红 12509 条存量无关
- 未目视回归：无客测账号，本地 8098 被并行任务 12:16 构建占用未覆盖，需 lichandan 在「新增合同→选楼幢→6 户室翻页」复验
- 2026-11-09 用户授权后：子模块 zhi2-web-admin 提交 08bea07a3、worktree 父仓库 workspace 提交 e05f947（gitlink add460515→08bea07a3），同推 origin/fix/bug-6235-house-pagination-v3；两仓库工作区干净，未夹带 public/version.json、bun.lock；未本地合并 develop/v3.0.0，由用户走 MR
- 禅道 status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、resolvedDate=2026-11-09 13:11:15、assignedTo=lichandan；zt_action id=89271（action=resolved、extra=fixed）备注含订正根因/切片修复/两提交号/守卫验证/待 lichandan 复验，事务内与提交后双校验通过

## 落地与历史
- 独立 worktree 分支 fix/bug-6235-house-pagination-v3，D:\repository\苏州市房地产监测V3-wt-bug-6235-v3 保留；开工 6 个、收尾 7 个 worktree；主工作区 HEAD 被其他任务从 0967c67 推到 0144a81 再到 d140832，wt-bug-6173／wt-bug-6285 被其他任务删除，本轮仅用 wt-bug-6235-v3
- 历史误判（2026-11-06，已作废）：曾误判根因为 body/query 分页位置并回写 resolved/fixed/assignedTo=lichandan/resolvedBy=tiany；空操作提交子模块 fdb331230、父仓库 3749533 均推 develop/v3.0.0，保留在历史

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6235",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "source_extraction_id": "07f6d5383f84443283aa84f8c5522090",
  "version": 5,
  "memory_type": "entities"
}
-->