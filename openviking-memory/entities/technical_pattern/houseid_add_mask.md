# houseId添加业主全屏遮罩防重复
i淮安H5 在存在 houseId 时调用添加业主接口并加全屏遮罩防重复提交。

## 触发逻辑
- 仅 currentSelect.houseId 存在时请求 addOwnerDirectly 添加业主
- 否则跳转 /pages_owner/house/owner/addNoCode 不调接口

## 防重复方案
- uni.showLoading 设 mask: true 全屏遮罩（参照 ViewOptionsList.vue）
- 以 submitting 状态、finally 重置、按钮 :disabled 防重复
- 方法头 if (this.submitting) return 拦截重复提交

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安H5
- 验证：src=i淮安H5/002.md
- 涉及文件：src/pages_owner/house/automaticAdd.vue、src/pages_owner/repair/submit.vue、src/components/ZsButton/ZsButton.vue、src/pages_owner/decision/components/StepSign.vue、ViewOptionsList.vue
- 所属项目：i淮安H5；来源会话：0827ee09-4d39-4174-b6b1-6333e223e06e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "houseid_add_mask",
  "source_extraction_id": "51c475875d87459b8f21f008402d2f1a",
  "version": 2,
  "memory_type": "entities"
}
-->