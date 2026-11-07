# 全局弹窗宽度统一改造
苏州市房地产监测V3全局排查所有弹窗，统一为单列表单和双列表单两种宽度，已全完成。

## 最终结果
- 412个表单类弹窗全部收敛，分5批次独立提交
- 批次1 commit 69b82d2d3：基础设施+21个试点（32文件）
- 批次2 commit e3cbebdd7：50个改span真双列+CSS扩展+校验脚本（54文件）
- 批次3 commit b60a16245：63个复用现有栅格（64文件）
- 批次4 commit 4e65e87a8：254个改单列，存量清零（250文件）
- 批次5 commit 4a833e58e：动态属性+规则豁免+文档（6文件）
- 最终状态：389个弹窗用form-layout（117双列+272单列），36个左树豁免，181个非表单类保持现状
- ESLint新规则命中0，两检查脚本全绿，构建通过（3768产物，两档宽度与双列作用域规则均已进包）

## 实质问题修复
- 129个多字段弹窗里86个列全为span24，光改宽度不变双列；批2把:sm/:md/:lg/:xl从24改写为12

## 宽度规范与近期修正
- 表单弹窗宽度规范：`single` 为 500px 单列整行；`double` 为 1000px 双列（span=6/8/12/16 按半宽解释）
- 未加 `form-layout` 的表单弹窗仍走 `detail-form.scss` 三列语义；曾标 `single` 却用 `span=12` 导致 500px 窄窗下仍三列排布
- `detail-form.scss` 为 `.zs-dialog--form-single` 增加单列整行规则，避免单列弹窗再出现多列
- `PriceTableDialog.vue`（价格备案户室）设 `form-layout="double"`，对齐 1000px 两列
- 全局纠偏：33 个误标 `single` 却含半宽栅格的弹窗改为 `double`（含监管、物业、维修等模块）
- `ProjectCertificateDetailDialog` 去掉无效的 `form-layout` 标记
- 来源会话：d99faf5a-8387-4970-bb87-4f3f06899686；验证：extracted source=cursor project=苏州市房地产监测V3

## 涉及文件
- benefit/components/AutoReconciliationDialog.vue
- building/houseSplit/components/AddDialog.vue
- property/account/components/AccountDialog.vue
- property/workOrder/order/WorkOrderActionDialog.vue

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：5e0a7497-a6b0-4210-a09a-c115fce18836；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_popup_width_unify",
  "source_extraction_id": "ab84d021aea649a287e577acdb50812d",
  "version": 2,
  "memory_type": "entities"
}
-->