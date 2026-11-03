# 备案登记详情创建工作人员按钮可见性约束
物管会直接登记与业委会等备案详情中，「创建工作人员」按钮仅已在备案 bizState=2 时显示，避免与「提交」等同屏矛盾。

## 约束规则
- 按钮 v-if 不能只判 formMode≠add 且存在 committeeVersionId，须增加 form.bizState == 2 条件。
- 待提交 bizState=0、已提交待审 bizState=1 均不应出现，仅已备案 bizState=2 显示。
- directDetail.vue 与 detail.vue 两处组件改按钮 v-if 时保持一致。

## 验证与归属
- 验证证据：已备案物管会登记待提交仍显示创建工作人员，需增加 bizState==2 条件。
- 涉及文件：zhi2-web-admin/src/views/autonomy/record/components/directDetail.vue、zhi2-web-admin/src/views/autonomy/record/components/detail.vue
- 所属项目：园区公共收益；来源会话：e8bd1ba5-4e51-4622-a994-695e0ceb3e3a；代码基线：bd275b5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "create_worker_bizstate",
  "source_extraction_id": "181b587a4f3b429fa55c316b8577fde9",
  "version": 1,
  "memory_type": "entities"
}
-->