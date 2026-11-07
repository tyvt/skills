# 禅道Bug 6328 合同范本跳转类型误判
房产管理系统zhi2-web-admin合同范本维护页缺陷：苏州2016版下从「范本内容」跳合同编辑页时contractType误判为现售。

## 基本信息
- 来源：用户于2026-11-06贴禅道链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6328
- 处理人：tiany（助手代理）
- 当前状态：修复已合并推送；msg172禅道仍为active，msg174助手开始DBX回写resolved

## 根因
- contract/index.vue 的 contractType 计算属性在苏州2016版用「菜单标题 / 路径是否含/cash」推断预售(0)/现售(1)
- 从合同范本「范本内容」跳入时，菜单meta.title往往不含预售/现售，路径可能未带/cash，导致误判为现售，页面标题显示「现售合同签订」

## 修复方案
- commercialHousingSales/presale/template/detail.vue 的 gotoContractTemplate：给query增加 contractType: String(this.form.contractType)（与字典wq_presale_contractType一致：0预售，1现售）
- contract/index.vue 的 contractType 计算：当 comeFromTemplate 且 query.contractType 为'0'或'1'时直接采用，避免走标题/路径启发式

## 验证与交付
- worktree D:\repository\苏州市房地产监测V3-wt-bug-6328，分支 fix/bug-6328-contract-template-route
- 改动两文件单独 eslint 通过(exit 0)；npm run build 成功（version.json改动已还原未提交）
- 子模块 zhi2-web-admin：fix/bug-6328-contract-template-route 推送，合并 develop/v3.0.0 后 HEAD=cdd058231（含79ae314e0修复+远端b9af8bade）
- 父仓库 develop/v3.0.0 fast-forward 推送 8037426（gitlink指向cdd058231）；主工作区 D:\repository\苏州市房地产监测V3 已pull同步
- 未在nginx部署站点做人工验收（本地未起前端服务）

## 禅道回写
- msg172：禅道#6328仍为active，约定用户确认页面无误后回写
- msg174：助手开始通过DBX回写状态resolved、解决方案与备注并关联提交（会话末进行中）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6328",
  "source_extraction_id": "8311e5a2d0244f298450b1822fadb0df",
  "version": 1,
  "memory_type": "entities"
}
-->