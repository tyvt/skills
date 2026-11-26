# 下载模板按钮始终可见修复
zhi2-web-admin 附件要件的「下载模板」按钮由「无模板即不渲染」改为「始终渲染、无模板置灰并提示」。

## 修复内容
- 下载模板按钮由 `v-if="templatePaths.length"` / `v-if="getAppendixFileTemplatePaths(item).length"` 改为 `:disabled="!templatePaths.length"` / `:disabled="!getAppendixFileTemplatePaths(item).length"`，始终可见
- handleDownloadTemplate 与 downloadTemplateFiles 在无模板时不发起下载，并提示「该要件暂未配置模板，无法下载」
- 按钮真正可点仍需后端为该要件配置 fileTemplate；截图中「入网信息登记表」「授权委托书」无模板配置显示灰态，属后端数据侧而非前端可控

## 涉及文件与验证
- 文件：zhi2-web-admin/src/components/AnnexUpload/components/AppendixRequirementCard.vue、zhi2-web-admin/src/components/AnnexUpload/index.vue
- 验证：npx eslint 两文件通过（仅 npm workspace 配置 warning，与本次改动无关）；未跑完整 build

## 提交与归属
- 子模块 zhi2-web-admin develop/v3.0.0：686b8dca5，已推送到远程（26741558e..686b8dca5）
- 父仓 develop/v3.0.0：dfb52e7 更新子模块引用并推送（46cef57..dfb52e7）
- 来源会话时间：2026-11-05

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "download_template_fix",
  "source_extraction_id": "74d2cd5f617b4df38a00a9b22defdf24",
  "version": 1,
  "memory_type": "entities"
}
-->