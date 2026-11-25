# 禅道缺陷 6967
禅道缺陷 6967「求援工单显示问题」于 2026-11-25 完成状态文案与详情页图片修复、构建通过、实机截图确认和 origin/dev 推送；同日完成禅道带图回写（resolved/fixed）与产物清零，链路终止。

## 问题与判定
- chain_id=禅道6967求援工单显示修复；原始目标为修复 3 个显示问题（2 个状态文案 + 1 个详情页图片），实机验证后回写禅道。
- 完成判定：3 问题修复 + build 退出 0 + 实机截图入会话经用户确认 + 禅道回写带图 + 过程产物清零。

## 根因与修复
- 实际代码较交接文档锚点漂移（detail.vue 模板节点区 :240-242 而非 :130-137），按第 5 节诊断以真实内容复核。
- detail.vue:38-43 已 4→done 但 label 仍「已完成」应为「已完结」；index.vue:39-44 仍 4→pending；两文件「救援处置中」应为「处理中」；图片根因是 nodes 丢弃 attachUrl。
- PROXY_TARGET host 正常供图（200 image/png）、upload.ts 无需改；参照 G 端 `splitAttach(log.attachUrl)+resolve+preview` 实现。
- 计划审核 88/100、P0=0；3 个 P1：splitAttach 在 detail.vue 内联、状态码限定 0..4、e2e 补 3=已驳回/旧值兼容/按钮流转/空图与多图预览；用户确认后实施 index.vue/detail.vue 状态映射、action 逻辑及协同记录图片渲染。

## 验证与提交
- 基线构建与改后 `npm run build` 均 exit 0；ESLint 未安装（以 build 为门），分支与 origin/dev 同步。
- 实机：列表 000006→已完结、000001→处理中；000001 详情现场照片 1/1 可见，「进度正常」节点图片已渲染。
- 三张时间戳截图 `verify-list-status-20261125-120956.png`、`verify-20261125-120907.png`、`verify-nodes-20261125-120934.png` 自检有效并经用户确认。
- 已提交 43f282f 推送 origin/dev；此前触顶 P0 硬交接写 9 节文档排 hop3，本跳为 hop2。

## 回写与收尾
- 按 `zentao-resolve.mjs 6967 --comment-file ... --attach ...` 生成的 8 步序列执行，未手拼 SQL，只写新禅道；元数据 openedBy=lichandan、product=79、project=141、execution=142。
- 三张验证图上传新禅道（fileID 24338/24339/24340），内嵌进 resolved 评论正文并挂到 bug；comment 含根因、修复、构建与实机证据。
- 事务复核通过并 COMMIT：status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=lichandan；action 带三图。
- 清理：`.tmp-bug6967/`、`$env:TEMP\zentao-6967/` 连目录删除并复核不存在；agent-browser 会话 `bug6967-verify-4382d7d38d88` 关闭；`job_list` 无残留后台 job。
- 不重跑：代码修复、基线/改后 build、实机验证、commit/push 沿用上一跳成果；hop2<10 但目标达成，不排下一跳。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6967",
  "source_extraction_id": "abfd11a567e04b27acb67bf8528a55b2",
  "version": 5,
  "memory_type": "entities"
}
-->