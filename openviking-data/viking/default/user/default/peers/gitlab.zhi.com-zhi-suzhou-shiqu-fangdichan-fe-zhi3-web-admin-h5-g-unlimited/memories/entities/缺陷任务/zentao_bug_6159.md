# 禅道Bug 6159 形象进度弹窗附件行UI未对齐
房产管理系统zhi2-web-admin中预售许可申请-预售楼幢列表「已维护形象进度查看」弹窗附件行UI未对齐缺陷任务，zhunan提交、指派tiany。

## 根因与定位
- 页面：预售许可申请页预售楼幢列表，「查看」弹窗「工程形象进度查看」(PresaleProgressDialog.vue，只读查看态)
- 现象：红框标注「附件 2号楼：未上传」一行标签与值垂直未对齐，值比「附件」标签高约10px
- 根因：附件行 .progress-file-row 为 flex 布局(align-items:center)，内容高度=文本约20px+margin-bottom:8px≈28px、文本居中于约10px处；Element .el-form-item__label 行高固定40px、文字居中于20px处 → 值比标签高约10px
- 确认：Element 基础 .el-form-item__label{line-height:40px}；相邻「当前形象进度」el-input 行因控件约32-40px高故对齐正常

## 修复方案
- 纯 CSS 改动(PresaleProgressDialog.vue <style> 块)：.progress-file-row 加 min-height:40px(单行内容与40px标签同基线)、&:last-child{margin-bottom:0}(多楼幢末行不留多余间距)
- 多行时每行40px，标签line-height40锚定首行垂直中心，与首行内容中心对齐，不影响多行支持

## 验证与交付
- 同构 HTML 对照复现：修复前「附件」低于值、修复后同基线，确认效果
- npx eslint 该文件 0 error(仅存量 el-form-item 提示，非本次引入)；npm run build 成功(gitHash 886b9e437)
- 生产构建部署 nginx 8098 站点(dist 指向父仓库，HTTP 200)
- 工作流：独立 worktree zhi2-web-admin-wt-bug6159 完成并已合并删除，未触碰并行任务(bug6160 由其他任务并行提交 8510f1e96)
- 子模块提交：修复 d09c18a5a → 合并 886b9e437(含 bug6160 为祖先)；父仓库 gitlink 82fb987；均推送 develop/v3.0.0，工作区干净
- 禅道回写(DBX事务化已提交复核)：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan(原提交人)，补 resolved action(id 87037)含根因/修复/验证/提交说明

## 未验证项
- 本机无客测环境登录态，未在真实客测页面目视确认(依据为同构HTML对照+构建部署)

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6159",
  "source_extraction_id": "0d268ba8936c4a7485464d077311a40a",
  "version": 1,
  "memory_type": "entities"
}
-->