# 禅道缺陷 7017
苏住房防汛C端（zhi2-mobile-query-h5-c）管理APP检查填写页的评价等级交互改造缺陷，2026-11-26 经 hop1→hop3 完成代码改动、实机验证、提交推送、禅道回写与清理，链路终止。

## 问题与目标
- 禅道链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=7017；属前端 UI 变更，涉及「管理APP」检查填写页（src/pages/project-check/form/index.vue）。
- 目标：把评价等级从独立行改为标题栏直接编辑，并加笔形编辑图标。
- 历史交接链 bug6931-检查中修改评价等级 与此处代码直接相关。

## 方案与改动
- 移除评价等级独立行，将徽标包进 picker 并加 uni-icons 的 compose 笔形图标（经 easycom 可用）。
- 图标使用品牌色 --c-brand:#075ed1；同步把 .pc-cat-level 改为 inline-flex 并删除废弃行样式。
- 本地应用地址 http://localhost:8150/，部署面板项目键为「防汛C端」。

## 进展与验证
- 计划评审 88/100、0 个 P0 阻断，按 approved_sha256 置为已批准并获用户人工确认。
- 改前与改后 npm run build 均 exit 0，diff 干净、无残留旧引用。
- hop3 实机验证通过并获用户确认：截图自检五项全过；agent-browser 真实指针点击徽标展开 5 档、点「市标一级」并确定后徽标由「市标三级」变为「市标一级」，onLevelChange 生效、笔形图标仍在；levelEditable=false 分支以源码 v-else 静态核验（如实标注）。

## 交付与收尾（hop3 完成）
- 2026-11-26 累计等效成本 1.00M 触发 P0 硬交接，经 hop1（文档 D:/plan/苏住房防汛C端/HANDOFF-CHAIN-bug7017-评价等级标题栏直接编辑-hop1-20261126-1423.md，9 节）→hop2→hop3 接续完成；hop3 文档 HANDOFF-CHAIN-bug7017-评价等级标题栏直接编辑-hop3-20261126-1441.md（9 节）。
- 唯一改动 src/pages/project-check/form/index.vue:425-431,580-581，commit 9c3456e 已推送 dev，工作区干净。
- 禅道 7017 回写 resolved/fixed、comment 内嵌验证图 fileID 24592（挂到 bug/7017），事务已提交复核。
- 临时脚本目录、验证图（禅道落库后删）、hop1/hop2 遗留 agent-browser batch 残留进程均已清理；链路终止，无下一跳。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7017",
  "source_extraction_id": "49e0d092694449399b8fe6f75e5620c0",
  "version": 2,
  "memory_type": "entities"
}
-->