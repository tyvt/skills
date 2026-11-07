# 禅道Bug 6302 现售备案申请奇安信浏览器一行仅显示一个字段
房产管理系统zhi2-web-admin中现售备案申请编辑态在奇安信可信浏览器（Chromium<105）下基本信息表单一行仅显示一个字段，已修复。

## 页面定位
- 页面：现售备案申请页 CashsaleInfoPanel.vue 内 Headline 包裹的 el-row/el-col 基本信息编辑表单
- 现象：奇安信可信浏览器新增/编辑态「基本信息」一行仅显示一个字段；Chrome 正常三列
- 截图 fileID=21863、txt 附件实为 PNG，对比确认旧内核 el-col 响应式类未生效

## 根因
- 三列布局来自 styles/detail-form.scss 内 @media(min-width:768px) 规则（#{$detail-collapse-grid}），将 .collapse-content .el-row > .el-col.el-col-sm-12 设为 flex:0 0 1/3
- 该规则为复合选择器列表，同一列表混有 .el-form:has(> .el-col)、.zs-form:has(> .el-col) 等 :has() 选择器
- 奇安信内核 Chromium<105 不支持 :has()，按 CSS 规范「选择器列表含无法解析选择器则整条规则丢弃」，连同纯 .el-row 的列宽声明一并失效
- el-col-sm-12 退回 Element 的 width:50%，叠加 el-row column-gap:32px 致两个 50% 列+32px 换行，一行仅一个字段
- 与 bug 6279/6281 同根因（:has() 旧内核不支持），但 6279 回退仅覆盖滚动规则，未覆盖 detail-form 栅格

## 修复方案
- detail-form.scss 在 @media(min-width:768px) 内新增 html.no-has-support 前缀、不含任何 :has() 的纯类回退块
- 镜像重声明三列 flex 宽度：el-col-12/sm-12/md-12/lg-12/xl-12/8/6=1/3；span=16=2/3；el-col-24/全宽=100%
- main.js 探测 :has 不支持时给 <html> 打 no-has-support（既有机制），老内核走回退，现代浏览器零影响
- 回退作用于通用 Headline el-row 选择器，同机制其他详情编辑表单一并修复

## 验证与交付
- npm run build 通过；产物 dist/assets/index-ChKwlYJU.css 含 html.no-has-support 三组回退规则且均无 :has()
- 8098 nginx 站点（苏州市房地产监测V3.conf，root=dist）已加载新 CSS
- lint 基线本就为红，本次仅改 SCSS 未引入新命中；未在奇安信浏览器实机回归（需登录环境），结论基于 CSS 规范机制与编译产物核对
- 子模块 zhi2-web-admin 提交 cfa17f1fe、父仓库 gitlink aaa1221，均推送 origin/develop/v3.0.0
- 禅道回写（DBX 事务化）：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan（原提交人）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6302",
  "source_extraction_id": "fd4e2c20de064e209edfe7496c1c587e",
  "version": 1,
  "memory_type": "entities"
}
-->