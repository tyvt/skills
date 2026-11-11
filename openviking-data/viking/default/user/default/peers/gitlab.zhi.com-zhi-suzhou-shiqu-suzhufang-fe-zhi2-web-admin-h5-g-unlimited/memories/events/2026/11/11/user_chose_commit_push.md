# Summary
On 2026-11-11, the user chose 提交并推送 (commit and push) for the bug 6369 .txt-extension fix in zhi2-web-admin. The assistant noted this requires loading the submodule-commit skill and following the fixed submodule-commit ordering, since the submodule was detached at 4763f71bac8a.
# 2026-11-11 (Wednesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 已完成 bug 6369「下载后文件后缀变成 .txt」的回归修复，改动落在 **-li 的 worktree**（主仓 `D:\repository\苏住房G`，子模块 `zhi2-web-admin` 当前 detached `4763f71bac8a`，含 tiany 已合入的 `downloadGet` 鉴权修复）。

## 根因
tiany 把下载切到带 token 的 `downloadGet` 后，下载「成功」了，但出现两个丢扩展名的问题：
1. `saveBlobToFile` 用 `new Blob([data])`（未传 type）重建 Blob，服务端 `Content-Type` 被丢弃；且没像 `utils/zipdownload.js` 那样解析响应头 `Content-Disposition` 取真实文件名。
2. `downloadAttachmentFile` 计算文件名只取 `file.name || URL 末段`，当历史单据 `planFileName` 为空、URL 末段无扩展名时，`a.download` 拿到无后缀名，浏览器按 MIME 推断成 `.txt`。

## 改动
- [zhi2-web-admin/src/api/index.js](zhi2-web-admin/src/api/index.js)：`saveBlobToFile` 改为 `new Blob([blob], { type: blob.type || 'application/octet-stream' })` 保留 MIME；新增 `extractFilenameFromDisposition`（兼容 `filename=` 与 `filename*=UTF-8''`，RFC 5987 解码）与 `resolveDownloadName`（调用方传入名已带扩展名则优先，否则回退响应头 `Content-Disposition`）；`downloadGet` 增加 `returnRawResponse: true` 让响应头可达。兼容裸 Blob 与响应对象两种入参。
- [zhi2-web-admin/src/components/detail-template/detail-template.vue](zhi2-web-admin/src/components/detail-template/detail-template.vue)：新增 `getAttachmentDownloadName(file)`，优先 `file.name`，否则从 URL 末段或 `fileName/name/filePath/file` 查询参数取带扩展名的真实文件名，仍取不到由 `downloadGet` 的 `Content-Disposition` 兜底。
- [zhi2-web-admin/docs/flood/common-errors.md](zhi2-web-admin/docs/flood/common-errors.md)：新增 E25 条目与详细记录（触发场景、根因、修复、验证、未验证项、剩余风险）。

## 验证
- 定向 ESLint：`src/api/index.js` 与 `detail-template.vue` **本次新增代码 0 错误 0 警告**（仅剩 `GET`/`DELETE` helper 历史既有 `semi`/`arrow-parens` 风格告警，非本次改动）。已分析 `saveBlobToFile` 的 117 处调用方（`download`/`downloadJson`/`downloadGet` 多用于带 `.xlsx/.json` 扩展名的导出，行为不变）。
- `npm test`（test 模式 Vite 构建）→ **exit 0**，产物输出至父目录 `../dist`（index.html 已生成，gitHash `4763f71ba`）。注意：子模块 `outDir` 指向父仓 `D:\repository\苏住房G\dist`，故子模块本地 `dist` 为空属正常。
- **未验证**：真实账号/后端下载接口联调、浏览器点击下载后缀实际表现（无可用登录态与 fixture）；`downloadGet` 在 `returnRawResponse` 下对「status 200 但 JSON 错误体」的边界需按环境确认。

按项目约定，未提交/推送。是否要落库？
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: The user chose **提交并推送** (commit and push). This requires the fixed submodule-commit ordering, so I must load the `submodule-commit` skill before doing anything. Let me load it.
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: Committing requires the submodule-commit ordering, and the submodule is currently **detached** at `4763f71bac8a`. Before any git mutation I must load the authoritative `worktree-snapshot` (per the rule: no ad-hoc `git status`/`worktree list`), then verify the submodule's branch situation.

<!-- MEMORY_FIELDS
{
  "event_name": "user_chose_commit_push",
  "goal": "Record commit push decision",
  "summary": "On 2026-11-11, the user chose 提交并推送 (commit and push) for the bug 6369 .txt-extension fix in zhi2-web-admin. The assistant noted this requires loading the submodule-commit skill and following the fixed submodule-commit ordering, since the submodule was detached at 4763f71bac8a.",
  "ranges": "51,53,55",
  "source_extraction_id": "8a7d300965db42f5b0abfae30df1cfee",
  "version": 1,
  "memory_type": "events"
}
-->