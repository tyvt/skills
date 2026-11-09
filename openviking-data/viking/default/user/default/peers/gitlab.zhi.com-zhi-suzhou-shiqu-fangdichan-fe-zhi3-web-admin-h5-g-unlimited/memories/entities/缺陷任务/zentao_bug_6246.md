
# 禅道Bug 6246 楼幢维护编辑户室房屋类型页面抖动
房产管理系统zhi2-web-admin中楼幢维护编辑户室房屋类型时页面抖动的缺陷任务，2026-11-09 完成二次修复并提交合并。

## 基本信息
- bugID 6246，标题：楼幢维护-编辑户室的房屋类型时页面抖动
- 初版修复人 tiany（2026-11-05，commit 0d306c0f9），重开人 lichandan（2026-11-09 10:00 反馈「此问题还是存在」）
- 二次修复人 助手（2026-11-09），状态：已修复并提交合并子模块 develop/v3.0.0，待回写禅道

## 分析过程
- 助手加载禅道分析 skill，通过 DBX 拉取 bug 详情与全部备注、附件清单
- 定位真实根因：tiany 初版 scrollbar-gutter:stable 因项目全局自定义 ::-webkit-scrollbar（index.scss:46）静默失效，叠加 ResizeObserver 限高循环形成自持抖动
- 二次修复方案：zs-dialog.vue 的 applyScrollableBody 将限高滚动容器 overflowY 'auto' 改为 'scroll'，强制轨道常驻占位，构建验证通过（exit 0）
- 提交 fix/bug-6246-house-type-jitter（4c4f7e8aa）并 fast-forward 合并入子模块 develop/v3.0.0 推送；父仓库 gitlink 指向 4c4f7e8aa

## 关联系统
- 缺陷跟踪系统：禅道（zentao-biz.zhi.com）
- 涉及项目：苏州市房地产监测V3；涉及页面：楼幢维护（projectManagement/buildinginfo 相关）；涉及文件：zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue


<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6246",
  "source_extraction_id": "a6a8fd80ad9e4332848d585c8fd9ee7a",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->