# 禅道Bug 6254 预售许可延期申请日期选择器置灰
房产管理系统 zhi2-web-admin 预售许可延期申请新增页「变更后有效期止」日期选择器面板默认月错误，导致整月置灰不可选。

## 现象
- 预售许可延期申请新增页，「变更后有效期止」点开后面板停在当前月（如 2026-11）
- 「原发证有效期止」为 2028-11-05，disabledDate 要求必须晚于原有效期止，导致首开月份整月置灰，看起来像不能选

## 根因
- 页面 zhi2-web-admin/src/views/presale/permitExtend/detail.vue 只配了 disabledDate，未给 zs-date-picker 设 default-value
- Element UI 默认展示「今天」所在月
- 选证回填用了 formatDateOnly，详情 normalizeDetail 对 origValidTo 未统一截取，存在不一致风险

## 修复方案
- permitExtendConstants.js 新增 getExtendValidToDefaultValue（原有效期止 +1 天所在月作为面板默认月）
- detail.vue 增加 :default-value="extendValidToDefaultValue"；normalizeDetail 对 origValidTo / extendValidTo 做 formatDateOnly
- docs/frontend/common-errors.md 登记 E-039

## 验证与交付
- npm run build 通过（gitHash c0146dce8，分支 fix/bug6254-permit-extend-date）；产物已含 getExtendValidToDefaultValue
- 子模块 zhi2-web-admin：c0146dce8 合并并推送 develop/v3.0.0
- 父仓库：c5142cb 推送 develop/v3.0.0；临时 worktree szfc-v3-wt-bug6254 已删除

## 禅道回写与未验证
- #6254 回写 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=lichandan，备注含根因与提交号
- 未验证：未在客测 58.210.252.230:9002 目视回归（本环境无企业端登录）；建议客测选证→点「变更后有效期止」→面板应落 2028-11 且 6 日及以后可选→保存
- 本地部署：nginx 根目录指向父仓库 dist/ 刷新即可测前端包；env/.env 本地改动未提交

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6254",
  "source_extraction_id": "f2b9d5999cde46fcaa8a05a25a419932",
  "version": 1,
  "memory_type": "entities"
}
-->