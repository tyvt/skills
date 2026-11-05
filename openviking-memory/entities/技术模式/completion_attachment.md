# 竣工验收附件能力对接
泰兴小程序竣工验收页已对接附件能力，对齐三方鉴定页实现方式，`busCode` 使用 `WXZJJGYS`。

## 接口改动
- `maintainProject.js` 更新 `fetchCompletionAcceptance(projectNo)`：查询详情后用 `dto.id` 调用 `getFiles('WXZJJGYS', dto.id)` 拉取附件。
- 附件映射为 `name/sizeText/type/url/raw` 结构，返回时写入 `detail.attachments` 供页面渲染。

## 页面改动
- `completion-acceptance.vue` 新增 `IMAGE_BASE` 引入。
- `onOpenFile` 由 `webView` 跳转改为：补全相对地址（拼接 `IMAGE_BASE`）→ `uni.downloadFile` 下载 → `uni.openDocument` 打开。
- 保持与三方鉴定页一致的失败提示（无链接/下载失败/打开失败）。

## 验证与归属
- 已检查两个文件 lint 无报错。
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`completion-acceptance.vue`、`third-party-appraisal.vue`、`maintainProject.js`。
- 来源会话ID：8ed15957-47c2-480a-bbac-d4149481f622；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "completion_attachment",
  "source_extraction_id": "2cef5dc4416d42e8836bab6bc515b643",
  "version": 1,
  "memory_type": "entities"
}
-->