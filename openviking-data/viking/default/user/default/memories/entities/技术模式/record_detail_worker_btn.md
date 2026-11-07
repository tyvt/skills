# 已备案详情页创建工作人员入口
detail.vue 与 directDetail.vue 在指定条件下渲染「创建工作人员」按钮，直备与登记详情行为一致。

## 触发条件
- formMode != 'add' && form.committeeVersionId && form.bizState == 2 时渲染「创建工作人员」按钮

## 跳转逻辑
- goCreateCommitteeWorker() 携带 committeeId、complexId 跳转
- 直备(directDetail)与登记(detail)详情行为一致

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：src=园区公共收益/028.md
- 涉及文件：autonomy/record/components/detail.vue、autonomy/record/components/directDetail.vue、mixins/detailMixins.js
- 所属项目：园区公共收益；来源会话：16feeb76-4fb6-4182-823c-4dd71eb00369；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_detail_worker_btn",
  "source_extraction_id": "73db46eea5524c5d9a7735b32709d2a9",
  "version": 1,
  "memory_type": "entities"
}
-->