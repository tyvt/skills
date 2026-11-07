# 小范围修复跨版本分支同步规范
缺陷已在主干修好后需带到多条版本分支时，用 cherry-pick 修复提交而非全量 merge，以降低冲突与评审成本。

## 适用场景
- 一个缺陷已在 develop/v2.6.1 修好，需同时带到 develop/v2.6.2 与 develop/v2.6.2-yulin
- 两分支已分叉较远，全量 merge 冲突多且与本次修复无关

## 根因与取舍
- 全量 merge 带无关改动、冲突面大、评审成本高、回滚困难
- 缺陷是极小公共样式/组件改动，按提交粒度搬运即可

## 操作流程
- 先在主干提交推送，记子模块提交号
- 目标分支 cherry-pick 该子模块提交，各产生新提交号再推送
- 父仓库仅更新子模块指针，三条分支各提交一次
- 本地 env/.env 代理配置不入库，提交前 git status 核对排除
- 完成后切回主干分支，逐分支远程核对提交到位
- cherry-pick 须人工确认未把只属于源分支的必填校验/参数改动带走或丢下（已知同类教训：漏恢复必填校验）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 会话 2ee3fa7e 结论：子模块 d87a19724 → v2.6.2 97cb12059 / v2.6.2-yulin f36236202 均为 cherry-pick
- 父仓库 669d166/c2d4531/90b47f6 更新指针；env/.env 未提交，工作区恢复 develop/v2.6.1
- 所属项目：产品2.0；来源会话：2ee3fa7e-3302-4162-9884-a54bd1cffc7f；代码基线：6accf9a
- 会话 23fa39f4 结论：源分支 v2.6.1 修复提交 666278cd7/199b0430b，其余分支 cherry-pick；父仓库 2280a01/5a095a5/13a77a4 更新指针；env/.env 未提交，收尾切回 develop/v2.6.1；涉及 zs-table.vue、index.scss
- 所属项目：产品2.0；来源会话：23fa39f4-c905-4fc1-b62e-36ce2d716c82；代码基线：6accf9a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cherry_pick_multibranch",
  "source_extraction_id": "7d247f9850784ea7a807d834ba19fc05",
  "version": 2,
  "memory_type": "entities"
}
-->