# 创建工作人员按钮状态显示修复
园区公共收益项目修复了「已备案物管会登记详情」中待提交数据仍显示「创建工作人员」按钮的问题。

## 问题根因
- 「创建工作人员」按钮原先只判断formMode!='add'且存在committeeVersionId，未结合业务状态
- 待提交（bizState==0）时仍会显示，与「提交」按钮同时出现，逻辑不一致

## 修复要点
- 在directDetail.vue（物管会直接登记）和detail.vue（业委会/监委会等备案）中增加form.bizState==2条件，仅已备案后显示
- 业务状态：bizState==0待提交不显示、bizState==1已提交待审核不显示、bizState==2已备案显示

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/autonomy/record/components/directDetail.vue、zhi2-web-admin/src/views/autonomy/record/components/detail.vue
- 所属项目：园区公共收益；来源会话：e8bd1ba5-4e51-4622-a994-695e0ceb3e3a；验证证据：extracted source=cursor project=园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "park_worker_btn",
  "source_extraction_id": "a1f19bf299fc4ba097b3d4df83e400e1",
  "version": 1,
  "memory_type": "entities"
}
-->