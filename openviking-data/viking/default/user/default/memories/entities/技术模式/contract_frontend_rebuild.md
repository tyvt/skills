# 合同页面改造前端
苏州市房地产监测V3 中合同页面前端改造已完成，覆盖入口版本控制、公共组件、第一章当事人表格与章节字段补充。

## 入口与版本控制
- `src/views/contract/index.vue`：合同签订 / 数据变更 / 范本入口统一强制渲染 2016 组件
- `contractType` 改为按路由 `/cash` 判定现售（原 2016 硬编码预售），放开 2016 保存 / 提交入口
- 修正 `reSign` 现售跳转 `/pre` 缺陷，2016 分支在合同签订入口渲染完整按钮组

## 新增公共组件
- `components/ContractOperationActions.vue`：保存 / 提交 / 审批 / 撤销 / 重签 / 人工备案 / 缴款 / 数据变更 / 打印 / 返回，两个分支共用

## 第一章当事人表格
- `chapters/suzhou2016/chapter1.vue`：出卖人单行只读表格（开发商唯一），买受人多行 `zs-table` 新增 / 编辑 / 删除复用 `vendeeAgentDialog`
- 销售代理机构字段重命名对齐主表 + `agencyId` + 机构选择弹窗，字段按第五节映射重命名（sellerName→seller 等）

## 章节字段与归属
- chapter2 `decorationType→decorateType`，chapter3 `paymentMode→payment...` 等字段重命名
- 涉及文件：`src/views/contract/index.vue`、`components/ContractOperationActions.vue`、`chapters/suzhou2016/chapter1.vue`、`chapters/pre/chapter1.vue`、`utils/contractRequest.js`
- 来源会话：52faca44-46f3-48c0-9ba2-d452448948d2；所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_frontend_rebuild",
  "source_extraction_id": "c9b7683152ec4919bda99ba8cded66d5",
  "version": 1,
  "memory_type": "entities"
}
-->