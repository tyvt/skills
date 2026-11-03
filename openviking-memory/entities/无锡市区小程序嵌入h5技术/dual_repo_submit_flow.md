# 无锡市区嵌入H5双仓与双分支提交流程
仓库结构为父仓 main-sfb + Git 子模块 zhi2-mobile-admin-h5-c-unlimited，功能修复须在子模块 dev_wuxi-sfb 与 dev_shiqu 两分支都落地。

## 仓库结构
- 父仓：main-sfb
- 子模块：zhi2-mobile-admin-h5-c-unlimited

## 提交流程
- 功能修复通常在子模块 dev_wuxi-sfb 提交，再 cherry-pick 或 merge 到 dev_shiqu
- 父仓提交更新子模块指针
- 用户要求「市区/苏服办两边都要提交」时须两条分支都落地，不能只改单一分支

## 验证与归属
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited 下维修资金模块（pages_owner/maintain/*、api/maintenance.js、store/repair.js、utils/transaction.js、pages.json 等）
- 会话 365fb309：维修资金交易详情项目信息不显示修复，子模块 dev_wuxi-sfb 提交 7866125，cherry-pick 至 dev_shiqu 生成 69ed86d，父仓 main-sfb 更新子模块引用至 06aa6e2
- 会话 b06c94d8：dev_wuxi-sfb 提交 69363c8 合并详情页字段，dev_shiqu 合并生成 50b65d1 并解决 index.vue、utils.js 冲突（采用 getAccountTransInfos 等实现），父仓 main-sfb 更新子模块引用至 4883b08
- 所属项目：无锡市区小程序嵌入H5；来源会话：365fb309-40ef-4c0c-9312-c60fde4230b6、b06c94d8-8cb8-4f4c-8390-dfa9fb3028aa；代码基线：06aa6e2

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "dual_repo_submit_flow",
  "source_extraction_id": "33d3bb10c5974475b872c4caf7399a25",
  "version": 2,
  "memory_type": "entities"
}
-->