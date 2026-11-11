# 预售选房弹窗已选房屋清空修复
苏州市房地产监测V3 禅道 Bug #6337（lichandan 提交，截图 fileID 21960）：预售合同签订「新增合同」弹窗点左侧楼幢后已选房屋被清空，已修复闭环。

## 问题根因
- chooseHouseDialog.vue 的 handleClickNode 在楼幢(node.level==2)与单元(node.level>=3)分支共三处执行 `this.targetData = []`，把已选房屋当临时列表清空
- handleDown 用 `targetData.includes(item)` 引用比较，跨楼幢重拉后行对象不同会重复添加

## 修复内容
- 删除三处清空逻辑，targetData 作为跨楼幢已选真相源保留
- 新增 `getHouseKey(houseId ?? houseCode ?? roomNo 归一化)` 按下移去重
- 新增 `syncOriginSelection()` 在 getListByBuilding/getListByUnit 重拉后 nextTick 清旧勾选并按 key 回显当前页已选行
- 两个列表请求用 `beginDialogAsyncLoad(this, 'originListLoadSeq')` 的 `isCurrent()` 忽略过期响应
- 改动行：169–172、320–360、378–398、455–495；docs/frontend/common-errors.md 新增 E-044 台账

## 验证结果
- 单文件 `npx eslint` 0 error（1 条存量 prefer-zs-components warning，非本次引入）
- `npm run lint` 全量退出 1，存量 4998 格式类 error，改动文件未新增
- worktree 构建 exit 0（2026/11/9 12:07:57，含 originListLoadSeq）；主工作区构建 exit 0（2026/11/9 12:16:36，gitHash=0910feb64）
- nginx 8098 部署新构建 200，assets/contractMainInfo-CF7mbrWo.js 含 originListLoadSeq；targetData=[] 仅存 onClose
- 未验证：无客测登录态、未启 dev server、未真实点测与后端 saveHouseInfo 联调

## Git与禅道
- worktree 苏州市房地产监测V3-wt-bug-6337 / 分支 fix/bug-6337-keep-selected-houses：建→提交→合 develop/v3.0.0→删
- 子模块 0910feb64→远端 fix 分支；父仓库 263deea→远端 develop/v3.0.0；gitlink 一致且本地远程同步
- 禅道回写：status=resolved, resolution=fixed, resolvedBuild=trunk, resolvedBy=tiany, resolvedDate=2026-11-09 12:22:21, 指派回 lichandan；新增 zt_action 89258

## 环境与其他
- 主工作区首构建触发 bun install 致缺 esbuild，用 PM=npm node scripts/install.mjs 修复，package-lock 未改
- 主工作区他人未提交（env/.env、eslint-rules/* 缺失、.tmp-bug-6324.png、.tmp-bug6285/）未触碰
- 涉及文件：chooseHouseDialog.vue；所属项目：苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "bug6337_keep_selected_houses",
  "source_extraction_id": "9267aef47c9249b899e8ede3cc002af0",
  "version": 3,
  "memory_type": "entities"
}
-->