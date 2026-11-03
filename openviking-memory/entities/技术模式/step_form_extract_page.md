# 步骤表单抽离独立页致新开页及图片丢失
commit `0a68e52` 将步骤表单弹窗抽离为独立页面，借 navigateTo 与存储回传，致新开页且巡检图片因生命周期脱节丢失，后恢复内嵌弹窗。
## 问题根因
- commit `0a68e52` 将 `add.vue` 步骤表单弹窗抽离为 `record/editStep.vue` 独立页面。
- 借 `uni.navigateTo` 与 `uni.setStorageSync`/`uni.$emit` 回传，致新开页且「巡检图片」因生命周期脱节丢失。
## 解决方案
- 于 `src/staff/pages_facility/record/add.vue` 恢复内嵌弹窗及上传组件。
## 验证与归属
- 验证证据：src=泰兴小程序/005.md
- 涉及文件：src/staff/pages_facility/record/editStep.vue、src/pages.json、src/staff/pages_facility/record/add.vue、src/staff/components/ZsUploader/ZsUploader.vue、src/components/ZsBottomPopup/ZsBottomPopup.vue、src/components/ZsDialog/ZsDialog.vue、C:/Users/Administrator/.workbuddy/plans/toasty-vortex-babbage-oDFMsTxx.md、src/.workbuddy/memory/2026-09-10.md
- 来源会话ID：a76a97a2-e1d3-41ae-8139-d4a6dd188d85
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step_form_extract_page",
  "source_extraction_id": "05a8519eba4c4b9e8bf848e717c3609b",
  "version": 1,
  "memory_type": "entities"
}
-->