# 禅道Bug 6129 楼幢变更证书字段调整
房产管理系统zhi2-web-admin楼幢变更记录页证书信息字段调整缺陷，severity 3，zhunan提交、指派tiany。

## 需求与定位
- 截图标注：移除「国有土地使用证」「商品房预售许可证」（楼幢维护与变更页均不需要）
- 「建设工程规划许可证」「建设工程施工许可证」需支持编辑
- 菜单「楼幢变更记录」组件 projectManagement/buildingChange/detail.vue 封装 buildinginfo/changeDetail.vue，实际改 changeDetail.vue
- 参照 buildinginfo/detail.vue 证书选择弹窗；DATA_PROPERTY.T_BUILDING_CHANGE 无证书ID列仅证书号列

## 修复方案
- changeDetail.vue 删除两项旧证书表单项，查看态 contentInfo1 同步留两项建设工程证书
- 两项证书改 readonly+clearable+suffix-icon 选择输入框
- @focus 打开弹窗(/presale/planLic/page、/presale/consLic/page 按 projectId+bizState='2' 过滤)，@clear 清空，新增 openPlanLicSelect 等5个方法+checkProjectBeforeCertSelect

## 验证与交付
- eslint 该文件 0 error（16 warning存量）；全量 eslint 与基线一致；7个 check-*.mjs 无新增
- npm run build 通过（2026/11/4 10:47:25，gitHash 6e4e46ab6）；产物含新逻辑不含旧证
- nginx 8098 部署返回200
- 子模块 zhi2-web-admin c25d1fa29→合并 51630109e（分支 fix/bug6129-cert-fields 合入 develop/v3.0.0 推送，worktree删）；父仓库 ff6599a(gitlink→6e4e46ab6)推送；台账 50b9213 推送，common-errors.md 增 E-032

## 禅道回写与未验证
- bug 6129 status=resolved,resolution=fixed,resolvedBuild=trunk,resolvedBy=tiany,resolvedDate=2026-11-04 10:49:50,assignedTo=zhunan；zt_action 86734(action=resolved)
- 未验证：未用客测账号真机选证书保存，弹窗回填与后端入库未端到端联调
- 过程事故：worktree junction 指向主工作区 node_modules 被 git worktree remove --force 穿透删除，bun install 重建复验；教训 E-032（worktree 勿用 junction 指向主工作区 node_modules）
- 并行 bug6128/6131 及他人 merge 未触碰，父仓库 merge 冲突已解决 gitlink 指向 6e4e46a 收尾推送


<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6129",
  "source_extraction_id": "3fa18db9490d40edb8cfce6f011e8649",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->