# 禅道 Bug 6235
苏州市房地产监测V3 / zhi2-web-admin 预售合同签订「新增合同」弹窗户室号翻页失效缺陷，真实根因为后端按楼幢一次返回全量户室并忽略 pageNum。

## 根因
- 接口 /presale/houseInfo/queryHousesByBuildCode 按楼幢一次返回全量户室、忽略 pageNum
- 前端 unwrapPageResult 以 rows.length 兜底 total
- zs-table 的 table-tr 只按 Math.min(tableTr,dataLength) 计算表格高度、不截断数据，翻页仅改变内部滚动位置
- 11/6 错误结论「分页参数必须放 URL query、放 body 后端忽略」：request.js 194–205 行对非白名单接口执行 moveUrlQueryToBody，将 config.params 合并进 config.data 后 delete config.params
- 该接口不在 src/config/security.js 白名单，request({params}) 与 post(url,data) 加密请求完全相同，11/6 改动为空操作

## 修复
- 新增 src/views/contract/utils/pageRows.js 的 paginateRows(rows,total,pageNum,pageSize)（rows.length>pageSize 判全量切片，否则原样返回）
- chooseHouseDialog.vue 新增 applyOriginPage() 统一楼幢/单元路径并清空跨页勾选
- contractRequest.js 的 queryHousesByBuildCode 恢复 post(url,params) 并写明真实约束
- 新增 scripts/check-page-rows.mjs 挂入 npm run lint 作回归守卫
- docs/frontend/common-errors.md 的 E-040 已订正

## 验证与状态
- 验证：npm run build 通过且产物含 pageRows-*.js，回归守卫通过，改动文件 eslint --quiet 零错误；npm run lint 全量基线 12509 条存量问题
- 未验证：无客测账号目视回归，本地 8098 站点被并行任务构建占用未覆盖
- 落地：独立 worktree 苏州市房地产监测V3-wt-bug-6235-v3 / 分支 fix/bug-6235-house-pagination-v3
- 2026-11-09 用户指示「提交推送回写禅道」并完成：子模块 zhi2-web-admin 提交 08bea07a3、父仓库 e05f947，分支均为 fix/bug-6235-house-pagination-v3，均已推送 origin 且 git ls-remote 与本地 HEAD 一致
- 未本地合并 develop/v3.0.0，worktree 保留待后续 MR
- 禅道 DBX 回写：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、resolvedDate=2026-11-09 13:11:15、assignedTo=lichandan，新增 zt_action id=89271（action=resolved，备注含订正根因/修复/提交号/验证/待客测回归）
- 待办：lichandan 在「新增合同 → 选楼幢 → 6 户室翻页」客测回归
- 2026-11-09 被 lichandan 第三次激活，反馈「翻页后仍是显示的第一页内容」；此前 11/5、11/6 两次修复均无效


<!-- MEMORY_FIELDS
{
  "category": "禅道缺陷",
  "name": "zentao_bug_6235",
  "source_extraction_id": "2d9610a6e14742ef900371b50ae9f06d",
  "version": 3,
  "memory_type": "entities"
}
-->