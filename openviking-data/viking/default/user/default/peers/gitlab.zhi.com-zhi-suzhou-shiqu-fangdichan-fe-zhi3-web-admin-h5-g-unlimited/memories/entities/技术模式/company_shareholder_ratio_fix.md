# 开发企业股东比例两位小数修复
修复禅道bug 6380：开发企业端企业股东信息新增/编辑页持股比例未保持2位小数。

## 根因
- company/shareholder/detail.vue 持股比例使用普通 zs-input，不做小数格式化，原始值如 20.12345 原样提交

## 修复要点
- 输入框改为 amount-input(unit="%")，失焦按2位小数四舍五入，与 institution/toB 同类页一致
- getForm() 保存时用 formatFixedDecimal(value, 2) 兜底四舍五入保留2位

## 验证与归属
- eslint 0 error，npm run build 通过，nginx(8098) 部署包含新占位符「请填写0到100内的数字,保留二位小数」
- 子模块提交 e9c08737f + 合并 7cb9540c7，推送 HEAD 1d10df68e；父仓库 gitlink 733d674
- 禅道 bug 6380 回写 resolved/fixed/trunk/resolvedBy=tiany/assignedTo=zhunan
- 所属项目：苏州市房地产监测V3；来源会话：2026-11-09 bug6380修复

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "company_shareholder_ratio_fix",
  "source_extraction_id": "cdc8d453ba5c40a0acca37469a40beb6",
  "version": 1,
  "memory_type": "entities"
}
-->