# 预售许可注销列表列名顺序与穿透修复
苏州市房地产监测V3 的 permitCancel/index.vue 调整了列名、列顺序并完善穿透详情链接。

## 列调整
- 列名「预售许可证/现售备案编号」改为「预售许可证号」以与查询区一致
- 列顺序：预售许可证号、项目名称、开发企业、所属区域、注销类型、注销原因、业务状态、审批节点

## 穿透详情
- 预售许可证号改为链接，跳转预售许可申请详情（只读），逻辑同 `PermitHistoryPanel`（`buildNavigationByFilePath` + `busCode: ysxksq`）
- 项目名称仍为链接进入本条注销业务详情（`handleView`）
- 缺少 `presalePermitId` 时点击许可证号提示「暂无关联预售许可，无法查看」

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：e640535c-8323-466a-a60a-7228d3fd7819

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_cancel_list_fix",
  "source_extraction_id": "006a04fcf9644149a135bbe7d42014c7",
  "version": 1,
  "memory_type": "entities"
}
-->