# 操作列删除按钮置灰修复
园区公共收益项目资产租赁合同备案详情页删除按钮置灰不可删的问题已修复，涉及 zs-operate-column.vue 与 houseTable.vue。

## 问题原因
- zs-operate-column 按钮 disabled 时仍可能触发 @click.native，置灰按钮仍可删
- handleDelete 未在方法内再次判断 canOperate
- visible 逻辑不当：非待提交时直接隐藏删除按钮，与置灰不可删需求不一致
- bizState 默认值 0 会在数据未加载时误判为待提交

## 解决方案
- zs-operate-column.vue 新增 isButtonDisabled / onButtonClick，禁用状态不执行删除
- houseTable.vue 去掉删除按钮 visible，非待提交时显示但置灰（与广告位等子表一致）
- handleDelete 开头增加 canOperate 校验
- bizState 默认值改为 undefined

## 效果与归属
- 仅按 bizState 控制，查看/编辑模式均可操作；非待提交显示置灰删除按钮
- 所属项目：园区公共收益；来源会话：4901c51b-48fd-4552-a991-5fc17b4c1409；代码基线：none
- 涉及文件：zs-operate-column.vue、houseTable.vue（assetsLeaseContractFiling/detail.vue）

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "operate_delete_fix",
  "source_extraction_id": "4b566ffdc76e457fbb659ffa7cef0027",
  "version": 1,
  "memory_type": "entities"
}
-->