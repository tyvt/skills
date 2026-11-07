# 选房弹窗与合同编辑页报错修复
苏州市房地产监测V3 项目修复了选房弹窗（`chooseHouseDialog.vue`）及合同编辑页（`contract/index.vue`）的 `created` 阶段报错与数据不同步问题。

## 选房弹窗修复
- `loadNode` 展开项目（level 1）同步 `projectInfo`；点击楼栋（level 2）同步 `projectInfo` 与 `this.buildCode`；点击单元（level 3）同步祖父节点 `projectInfo` 与 `this.buildCode`
- 提交前校验：未选项目/楼栋时前端拦截
- 路由 query 增加 `projectCode`，与 `sessionStorage` 双保险

## 合同编辑页兜底
- `formMode === 'add'` 且缺 `projectCode`/`buildCode` 时先调 `getContractMainInfo` 补全
- `try/catch` 捕获失败提示后返回列表，避免 `created` 未捕获 Promise
- `getDetail` 失败时 `created` 提前 `return`

## 字典空数据处理
- `pre/chapter3.vue` 与 `cash/chapter3.vue` 处理 `wq_presale_down` 等字典空数据场景

## 涉及文件与验证
- `chooseHouseDialog.vue`
- `contract/index.vue`
- `pre/chapter3.vue`、`cash/chapter3.vue`
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：a735a6fd-dc76-4817-a33c-8400bcf1b742；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "choose_house_dialog_fix",
  "source_extraction_id": "6ec2c7711610458380e02ce0e47fab1d",
  "version": 1,
  "memory_type": "entities"
}
-->