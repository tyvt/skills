# 禅道Bug 6302 现售备案申请奇安信浏览器一行仅显示一个字段
房产管理系统zhi2-web-admin中现售备案申请编辑态在奇安信可信浏览器（Chromium<105）下基本信息表单一行仅显示一个字段，已修复。

## 页面定位
- 页面：现售备案申请页 CashsaleInfoPanel.vue 内 Headline 包裹的 el-row/el-col 基本信息编辑表单
- 现象：奇安信可信浏览器新增/编辑态「基本信息」一行仅显示一个字段；Chrome 正常三列
- 截图 fileID=21863、txt 附件实为 PNG，对比确认旧内核 el-col 响应式类未生效

## 根因
- 三列布局来自 styles/detail-form.scss 内 @media(min-width:768px) 规则（#{$detail-collapse-grid}），将 .collapse-content .el-row > .el-col.el-col-sm-12 设为 flex:0 0 1/3
- 该规则为复合选择器列表，混有 .el-form:has(> .el-col) 等 :has() 选择器；奇安信内核 Chromium<105 不支持 :has()，整条规则丢弃，列宽声明失效
- el-col-sm-12 退回 width:50%，叠加 el-row column-gap:32px 致换行，一行仅一个字段
- 与 bug 6279/6281 同根因（:has() 旧内核不支持），但 6279 回退未覆盖 detail-form 栅格

## 修复方案
- detail-form.scss 在 @media(min-width:768px) 内新增 html.no-has-support 前缀、不含 :has() 的纯类回退块，镜像三列 flex 宽度（el-col-12等=1/3；span=16=2/3；el-col-24=100%）
- main.js 探测 :has 不支持时打 no-has-support（既有机制），老内核走回退，现代浏览器零影响
- 回退作用于通用 Headline el-row 选择器，同机制其他详情编辑表单一并修复

## 验证与交付
- npm run build 通过；产物 dist/assets/index-ChKwlYJU.css 含 html.no-has-support 三组回退规则且无 :has()
- 8098 nginx 站点（苏州市房地产监测V3.conf，root=dist）已加载新 CSS
- lint 基线本就为红，本次仅改 SCSS未引入新命中；未在奇安信实机回归，结论基于 CSS 规范与编译产物核对
- 子模块 zhi2-web-admin 提交 cfa17f1fe、父仓库 gitlink aaa1221，均推送 origin/develop/v3.0.0
- 禅道回写（DBX 事务化）：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan（原提交人）

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6302",
  "source_extraction_id": "d8a39bca08cd465f93ee5bc42351568e",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->