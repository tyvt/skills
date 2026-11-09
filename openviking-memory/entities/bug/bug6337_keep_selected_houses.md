
# 预售选房弹窗已选房屋清空修复
苏州市房地产监测V3 禅道 Bug #6337（lichandan 提交，截图 fileID 21960）：预售合同签订「新增合同」弹窗中点左侧楼幢后已选房屋被清空，已修复闭环。

## 问题根因
- chooseHouseDialog.vue 的 handleClickNode 在楼幢（node.level==2）与单元（node.level>=3）分支共三处执行 `this.targetData = []`，把「已选房屋」当成随楼幢切换的临时列表清空
- handleDown 用 `targetData.includes(item)` 引用比较，跨楼幢重新拉数后行对象不同会重复添加

## 修复内容
- 删除三处清空逻辑，targetData 作为跨楼幢已选真相源保留
- 新增 `getHouseKey(houseId ?? houseCode ?? roomNo 归一化)` 按下移去重
- 新增 `syncOriginSelection()` 在 getListByBuilding/getListByUnit 重拉后 nextTick 清旧勾选并按 key 回显当前页已选行
- 两个列表请求用 `beginDialogAsyncLoad(this, 'originListLoadSeq')` 的 `isCurrent()` 忽略过期响应
- 改动集中在第 169–172、320–360、378–398、455–495 行；docs/frontend/common-errors.md 新增 E-044 台账条目

## 验证与结果
- 单文件 `npx eslint` 0 error（仅 1 条存量 prefer-zs-components warning，模板既有 el-select，非本次引入）
- `npm run lint` 全量退出码 1，为存量 4998 个格式类 error（indent/semi/quotes/comma-dangle），改动文件未新增 error
- worktree 内 `node scripts/vite-build.mjs build` 退出码 0，buildTime 2026/11/9 12:07:57，产物含 originListLoadSeq 并引用 dialogAsyncLoad
- 主工作区 `npm run build` 退出码 0，buildTime 2026/11/9 12:16:36，gitHash=0910feb64
- nginx 8098 部署站点 / 与 /version.json 均 200 且为新构建；assets/contractMainInfo-CF7mbrWo.js 200 且含 originListLoadSeq；源码里 targetData = [] 只剩 onClose 关窗重置
- 未验证：无客测登录态、不启 dev server，未在真实账号下点测弹窗交互与后端 saveHouseInfo 联调

## Git 与禅道回写
- worktree 苏州市房地产监测V3-wt-bug-6337 / 分支 fix/bug-6337-keep-selected-houses：新建 → 提交 → 合并回 develop/v3.0.0 → 删除（git worktree remove --force + prune）
- 子模块 0910feb64 → 远程 fix/bug-6337-keep-selected-houses；父仓库 263deea → 远程 develop/v3.0.0；父仓库 gitlink 与子模块 HEAD 一致，本地与远程同步
- 禅道 DBX 事务回写：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、resolvedDate=2026-11-09 12:22:21、指派回 lichandan
- 新增 zt_action id 89258（根因+修复+验证+提交号），提交后独立连接复核一致

## 环境情况
- 主工作区首次构建触发 vite-build.mjs 自动 bun install 导致 node_modules 缺 esbuild；用 PM=npm node scripts/install.mjs 修复依赖并重建成功，package-lock.json 未改
- 主工作区仍有他人未提交内容（env/.env、子模块 eslint-rules/* 缺失、.tmp-bug-6324.png、.tmp-bug6285/），本任务未纳入提交、未触碰
- 涉及文件：zhi2-web-admin/src/views/commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue
- 所属项目：苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "bug6337_keep_selected_houses",
  "source_extraction_id": "9f8a50b60d4b4d8b88a18c63980e6a12",
  "version": 2,
  "memory_type": "entities"
}
-->