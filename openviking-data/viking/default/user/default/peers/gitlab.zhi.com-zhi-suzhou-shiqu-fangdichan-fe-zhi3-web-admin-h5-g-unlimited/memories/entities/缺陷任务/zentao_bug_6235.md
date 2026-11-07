# 禅道Bug 6235 新增合同户室号分页缺陷
房产管理系统zhi2-web-admin预售合同签订「新增合同」弹窗中户室号分页缺陷，2026-11-05曾解决表格行数与外层滚动，2026-11-06因翻页仍显示第一页数据被重新激活。

## 根因与定位
- 页面：预售合同签订「新增合同」弹窗，点「楼幢」时列表走 contractRequest.js 的 queryHousesByBuildCode
- queryHousesByBuildCode 将 pageNum/pageSize 放在 POST body；后端与旧 api/presale/contractMainInfo.js 一致只认 URL query，分页无效
- 点「单元」时 getHouseList 已正确 params:{pageNum,pageSize}，故仅楼幢路径复现

## 修复方案
- contractRequest.js：queryHousesByBuildCode 改为 request({method:'post',params})
- chooseHouseDialog.vue：分页走即时 fetchOriginList()；翻页后清空待选勾选
- docs/frontend/common-errors.md 新增 E-040

## 验证与交付
- npm run build 通过；产物 queryHousesByBuildCode 为 method:"post",params:t；http://127.0.0.1:8098/ 返回200
- 子模块 zhi2-web-admin：fdb331230 → origin/develop/v3.0.0
- 父仓库：3749533 → origin/develop/v3.0.0（含 E-040 + gitlink）
- 临时 worktree 苏州市房地产监测V3-wt-6235 已删除

## 禅道回写与未验证
- bug 6235：status=resolved、resolution=fixed、assignedTo=lichandan、resolvedBy=tiany（库内已复核）
- 未验证：未用客测账号在弹窗里目视确认翻页，请 lichandan 在「新增合同 → 选楼幢 → 户室>5条翻页」再验一次
- 未提交：本地 env/.env 仍为个人改动，未进仓库

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6235",
  "source_extraction_id": "d2db6e09302743bb8f477fd173526b1e",
  "version": 1,
  "memory_type": "entities"
}
-->