# 机构注册完善企业信息页点击无反应修复
苏住房G 项目 companyInfo.vue 因 Element UI 栅格结构错误导致完善企业信息页输入字段点击无反应，已修复。

## 问题原因
- companyInfo.vue 错误结构为 el-row 包裹 zs-form，el-col 直接放在 el-form 内
- el-col 不在 el-row 内时栅格浮动/层叠异常，上方禁用字段透明遮挡下方可编辑字段
- 机构类别、机构名称等禁用字段仅展示数据不易察觉，从「行政区域」起可编辑字段受影响最明显
- companyRegister.vue 在 step=2 时仍保留空的 form-wrap 容器，可能带来布局干扰

## 修复内容
- companyInfo.vue 调整为 zs-form > el-row > el-col 结构（与 accountInfo.vue 一致）
- 底部按钮栏移入 zs-form 内（与 step1 一致）
- 银行账户弹窗表单补上 el-row 包裹
- 修正 diabled → disabled 拼写错误
- 底部留白增至 100px 避免固定底栏挡住字段

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：companyInfo.vue、accountInfo.vue、companyRegister.vue
- 来源会话ID：6399250a-897a-4f39-9311-dc61b064e712

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "companyinfo_click_fix",
  "source_extraction_id": "cc5f4cc126b94211921fea7c38780aa8",
  "version": 1,
  "memory_type": "entities"
}
-->