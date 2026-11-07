# 学习园地条件下载与详情跳转
苏住房G 项目 zhi2-web-admin 首页学习园地（StudyPanel）实现条件下载与菜单详情跳转，新增 studyNav.js 路由映射。

## 改动内容
- StudyPanel.vue：rows 保留 id、type、attachmentUrl 等字段；仅当 hasStudyAttachment(it) 为真时显示「下载」，@click.stop 触发 download 事件
- 有 id 的行可点击/Enter 触发 open；占位行无 id、不可聚焦
- 新增 studyNav.js：type 1–5 映射到 article/richTextOne/detail … video / problem / richTextFive/detail
- studyNav.js 导出 resolveStudyDetailFilePath、hasStudyAttachment

## 涉及文件
- src/views/home/v2/components/StudyPanel.vue
- src/views/home/v2/studyNav.js
- src/views/home/index-v2.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话ID：febd2f1e-80ae-4a0b-974c-17c51f1b4e6b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "study_panel_download_jump",
  "source_extraction_id": "5a297a094f1d47ea94c2f934ab29510b",
  "version": 1,
  "memory_type": "entities"
}
-->