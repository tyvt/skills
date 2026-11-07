# 步骤弹窗原生input与组件混用致显隐异常
步骤弹窗内「步骤名称」「标准工时」使用原生 input 与 placeholder-class，而「巡检说明」采用差异化组件，渲染机制不同导致显示异常。
## 问题根因
- 步骤弹窗内「步骤名称」「标准工时」使用原生 `input` 与 `placeholder-class="input-placeholder"`。
- 「巡检说明」采用差异化组件，原生 input 与组件渲染机制不同导致显示异常。
## 解决方案
- 统一弹窗内表单元素渲染方式，避免原生 input 与组件混用。
## 验证与归属
- 所属项目：泰兴小程序
- 验证证据：extracted source=cursor project=泰兴小程序
- 验证证据：src=泰兴小程序/005.md
- 涉及文件：src/pages.json、src/staff/pages_facility/record/add.vue、src/components/ZsTextarea/ZsTextarea.vue、src/staff/components/ZsUploader/ZsUploader.vue、src/uni.scss、src/staff/pages_facility/repair/submit.vue、src/staff/pages_facility/issue/components/CompleteDialog.vue、src/README.md
- 来源会话ID：11a4e214-e500-42a0-9c0a-82e53325ad0f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step_popup_input_mix",
  "source_extraction_id": "05a8519eba4c4b9e8bf848e717c3609b",
  "version": 1,
  "memory_type": "entities"
}
-->