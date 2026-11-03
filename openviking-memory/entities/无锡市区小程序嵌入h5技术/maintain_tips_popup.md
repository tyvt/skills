# 维修资金房屋历史交易明细温馨提示弹窗
对接鹏业维修资金明细后，在「房屋历史交易明细」区块增加可点击的「温馨提示」弹窗展示固定合规文案。

## 需求与内容
- 客户在对接鹏业维修资金明细后要求增加「温馨提示」，弹窗含手机端仅 2021-01-01 起数据、单日多笔流水余额展示顺序免责、2020-12-31 前须窗口查询及电话 0510-82752979 等
- 交互为标题旁入口 + 弹窗只读文案，非接口字段

## 实现位置
- 落在业主端维修资金模块（如 maintain/detail 与 TransactionTable 区域）
- 交付时按项目惯例同步 `dev_wuxi-sfb` 与 `dev_shiqu`（cherry-pick/合并后推送），父仓更新子模块指针

## 验证与归属
- 验证证据：会话 38fc3a21 用户给出完整温馨提示正文与截图需求，提交说明 feat(maintain): 维修资金明细增加温馨提示弹窗，cherry-pick 至 dev_shiqu
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/maintain/detail.vue、src/pages_owner/maintain/index.vue、src/pages_owner/maintain/components/TransactionTable.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：38fc3a21-3d77-4897-a319-5240c361e84e；代码基线：9eda33f

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "maintain_tips_popup",
  "source_extraction_id": "55ebfb54fdd04af4b4e59c85f823897e",
  "version": 1,
  "memory_type": "entities"
}
-->