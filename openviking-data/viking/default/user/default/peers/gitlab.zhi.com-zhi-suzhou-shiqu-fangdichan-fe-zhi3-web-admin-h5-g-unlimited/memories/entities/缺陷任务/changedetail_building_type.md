# changeDetail 楼幢类型字段修复
zhi2-web-admin 楼幢变更页 changeDetail.vue 新增「楼幢类型」(buildingType) 字段的修复任务，与 bug6129 证书字段调整为同一文件的不同改动。

## 需求与定位
- 在 changeDetail.vue 新增「楼幢类型」表单项，姊妹页 building/buildingChange/detail.vue 已提交 buildingType，后端契约 /building/buildingChange 已支持
- 5 处改动：表单项 + options + 字典加载 + 必填校验 + view 态展示

## 修复与验证
- worktree 基线落后 develop/v3.0.0，先提交修复 4b6891c70，再合并最新 develop（6e4e46ab6，含 bug6129 证书字段 75+/24- 同文件改动但未含楼幢类型）避免合回时覆盖
- eslint 0 error，19 条 warning 均 prefer-zs-components（存量，新增 1 条同类）；npm run build 通过，dist 产物 detail-BbeB8khx.js 含 4 处「楼幢类型」
- worktree 构建时 vite rootDir=../ 指向主仓库根，outDir 落主根 dist（nginx 8098），dist/version.json 内容陈旧系并行 git 操作刷新，需干净重建核对

## 状态
- 截至 2026-11-04：修复已提交 4b6891c70，正在合并 develop/v3.0.0 并重新构建验证，尚未合入主分支

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "changedetail_building_type",
  "source_extraction_id": "bf182e6a1c434b2fb8726e352b1d9730",
  "version": 1,
  "memory_type": "entities"
}
-->