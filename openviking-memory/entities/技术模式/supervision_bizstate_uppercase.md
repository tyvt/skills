# 监管模块BIZ_STATE大写字典修复
预售资金银行监管模块因业务状态字典类型误用大写`BIZ_STATE`导致状态列渲染为原始码值，已统一改为小写`biz_state`。

## 问题根因
- 门户「预售资金银行监管→监管项目备案」页业务状态列渲染成数字`0`
- 根因为业务状态字典类型写成大写`BIZ_STATE`，而公共字典是小写`biz_state`（见bizState.js、common.js的saveBizStateOption）
- 客测环境58.210.252.230:9002实测`BIZ_STATE`仅1条`4 银行开户中`，`biz_state`完整5条`0 待提交/1 审核中/2 已备案/3 作废/4 银行开户中`
- 查库COMMON_FRAMEWORK.SYS_DICT_DATA两类型并存，`BIZ_STATE`的0/1/2/3已被删，dict-tag回退渲染原始码值`0`

## 解决方案
- `src/views/supervision/**`共42个文件将`getDicts('BIZ_STATE')`与`dictUrl:'BIZ_STATE'`统一改为`biz_state`
- 覆盖agreement（jgxm/xy/xy_version/version/end/account/allocation）、account、deposit、progress、riskmanage、unblock的列表页与详情页
- `projectDelivery`本就走全局`biz_state`别名映射未动，参照价格备案commit `c9c9e2a74`

## 验证与归属
- eslint与改动前基线一致（1708 problems/779 error均为存量未新增），`npm run build`通过（gitHash `46d1d0cb5`）
- 产物`dist/assets/jgxm-BLkAXfGR.js`、`end-BLlqH44A.js`已含`biz_state`，nginx 8098返回200且`version.json`=`46d1d0cb5`
- 未用客测账号在页面目视确认（本环境无客测登录态）
- 子模块`zhi2-web-admin`提交`547117455` fix→`d50a01643` merge已合入`develop/v3.0.0`；父仓库`8981fa4`台账E-034已推送
- 禅道6131回写status=resolved/resolution=fixed/resolvedBy=tiany/指派回lichandan，补action 86764；所属项目zhi2-web-admin（预售资金银行监管），代码基线46d1d0cb5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_bizstate_uppercase",
  "source_extraction_id": "69c597c8f0c74434920714662e46db14",
  "version": 1,
  "memory_type": "entities"
}
-->