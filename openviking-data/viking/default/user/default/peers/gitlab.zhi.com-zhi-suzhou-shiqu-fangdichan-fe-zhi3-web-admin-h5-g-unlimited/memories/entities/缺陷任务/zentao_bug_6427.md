# 禅道Bug 6427 客户项目车位比保存后不显示
禅道缺陷 6427：苏州房地产客测环境，客户项目（customerProject）新增/编辑详情页「车位比」保存后不显示，实际录入比率（如1:1.3）却显示占位符「-」。

## 基本信息
- 提交人/开单人：zhunan；处理人：tiany（助手代理分析与修复）
- 禅道链接：http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6427
- 状态：2026-11-10 回写 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhunan（开单人待客测回归）
- 新增 zt_action #90282（action=resolved，actor=tiany）

## 现象与根因
- 路径：项目管理→客户项目（customerProject）详情/变更详情（detail.vue、changeDetail.vue）
- 截图确认：编辑页车位比输入「1:1.3」；保存后详情显示「-」占位符
- 根因：表单车位比为自由文本 zs-input（支持比率 1:1.3），但展示配置为 type:'amount', unit:'%'
- detail-template.vue 的 currencyFormatter 仅渲染数值，非数字（如 1:1.3）命中 number 正则失败、回落空值 → 显示「-」
- 相邻「容积率」使用 type:'text' 作对照

## 修复与验证
- detail.vue:542 车位比展示 type:'amount', unit:'%' → type:'text'
- changeDetail.vue:422 同上改动
- 验证：ESLint 该两文件 0 error（仅存量 el-form-item 警告）；npm run build exit 0
- 未验证：浏览器实际渲染未做（本项目不启动 dev server），建议客测环境用比率值复核

## 提交与回写
- 子模块 zhi2-web-admin 提交 d98c4a801（含 public/version.json 构建写入），父仓库 gitlink 7dd856c，均推送至 develop/v3.0.0
- 禅道回写：DBX 事务化 UPDATE zt_bug + INSERT zt_action 90282（备注含根因/修复/验证/提交号）
- 工作区仅 env/.env（已还原）与 .tmp-bug* 临时截图未进提交；并行 worktree 无

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6427",
  "source_extraction_id": "20dafd94d04d4ab4b510972e869a5f64",
  "version": 1,
  "memory_type": "entities"
}
-->