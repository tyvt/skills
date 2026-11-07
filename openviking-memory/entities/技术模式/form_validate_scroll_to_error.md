# 表单校验失败滚动定位
Element UI 校验失败仅标红不滚动，需在自定义滚动容器内新增 scrollFormToFirstError 实现定位聚焦。

## 现象
- 弹窗表单过长出现内部滚动时，点确定校验失败页面无效果，错误项在可视区外看不到标红。

## 根因
- Element UI 校验失败只给 el-form-item 加 is-error 类，不滚动定位。
- 项目滚动发生在自定义容器（.candidate-form-box、.app-main），非 window，通用 scrollIntoView 可能滚错容器。

## 解决方案
- utils/validate.js 新增 scrollFormToFirstError：查找第一个 .el-form-item.is-error，向上找最近可滚动父容器，平滑滚动并聚焦输入框。
- 逻辑收口进公共 zs-form 的 validate 失败分支，所有消费 zs-form 的页面/弹窗一次性获得定位+聚焦能力。

## 关联信息
- 涉及文件：src/utils/validate.js、src/components/zs-form/zs-form.vue、src/views/autonomy/candidateCollect/components/CandidateDialog.vue、src/mixins/dialogMixins.js、src/mixins/form.js。
- 所属项目：园区物管2.0；来源会话：b7798d11-726e-4733-aeb4-7435cb7b009a；代码基线：none。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_validate_scroll_to_error",
  "source_extraction_id": "175779f5800742d9a6b6bf5fa413e19e",
  "version": 2,
  "memory_type": "entities"
}
-->
