# 委托代售详情页布局优化与 E2E 修复
苏州市房地产监测V3 中委托代售（entrust sale）详情页重跑验证，主流程跑通并顺带修复 E2E 测试。

## 重跑结果
- 登录新密码已生效，【企业端】列表查询通过
- 主流程（用例 2）跑通：新增 → 填表 → 要件上传 → 保存 → 楼幢增删 → 编辑保存
- 签署步骤卡住：天印电子签环境/账号未配置或未登录（code=401 登录信息不存在），与页面布局改动无关
- 提交、主管部门审批用例因 serial 未继续执行

## 顺带修复的 E2E
- entrust-sale-helpers.js 与 entrust-sale-real-api-flow.spec.js 调整
- 委托期限日期选择（当月单元格，避免面板不稳定）
- 委托权限等 textarea 填写方式
- 楼幢批量删除按钮定位（与行内「删除」区分）

## 验证与归属
- 如需 5 条用例全绿，需测试环境配好天印
- 涉及文件：entrust-sale-helpers.js、entrust-sale-real-api-flow.spec.js、index.scss、detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：37f3b795-445f-4b9e-932e-974e07145a79

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_entrust_sale_e2e",
  "source_extraction_id": "ffad441a88ee4d7980bb4a86cbbef7dd",
  "version": 1,
  "memory_type": "entities"
}
-->