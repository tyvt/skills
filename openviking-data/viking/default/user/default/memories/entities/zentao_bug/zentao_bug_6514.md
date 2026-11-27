---
audit_status: valid
last_checked: 2026-11-27T03:52:33+08:00
verdict_note: 实机核对：V3 utils/mapQxtEntInfo.js(70) QXT_PREFILL_ONLY_FIELDS 含 registeredAddress，common-errors.md(426-427) E-051 登记；GIS 死锁解锁修复属实。
---
# 禅道 Bug 6514
经纪机构注册工商提取后 GIS 校验死锁，2026-11-13 修复并回写禅道 resolved/fixed。

## 问题与根因
- 经纪机构注册工商提取后 GIS 校验死锁：提取映射不含坐标（registeredLat/Lng 无来源），agency 分支地址输入与 GIS 按钮被 `isExtracted('registeredAddress')` 锁死，而校验强制要坐标。
- 产品口径：开发企业/经纪机构/租赁机构通过提取的 GIS 地图自动带出后允许手动编辑修改。

## 修复
- `mapQxtEntInfo.js` 的 `QXT_PREFILL_ONLY_FIELDS` 增加 registeredAddress，开发企业/经纪/租赁注册及 companyManagement 提取入口同步解锁。
- e2e `institution-register-extract.spec.js` 补「提取→GIS弹窗→选点→坐标回写」闭环断言。
- 父仓 `docs/frontend/common-errors.md` 登记 E-051。
- 运维把 8098 vhost API upstream 从死掉的本地 8080 切至 dev 网关（备份 .bak-6514）。

## 验证与交付
- 子模块提交 e8b351511、父仓 f35f9e7。
- `npm run build` exit 0（gitHash b61b9c547）。
- 禅道 bug 6514 变为 resolved/fixed，assignedTo 退回 zhunan。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6514",
  "source_extraction_id": "955314ce34404803aed611d61c869231",
  "version": 1,
  "memory_type": "entities"
}
-->