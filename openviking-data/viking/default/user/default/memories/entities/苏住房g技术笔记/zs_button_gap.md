# zs-button 依赖菜单权限且前端无超管旁路
苏住房G 前端把按钮显隐完全交给后端下发的菜单加权限字符，zs-button 依赖 checkPermission 且无超管旁路，菜单未注册时按钮静默不渲染。

## 问题现象
- 评价报告模块页面代码写全，但「等级变更」「发布」「导出报告」按钮在交付环境根本不出现，页面等同不可达
- zs-button 可见性由 checkPermission 决定，无超管旁路，权限字符缺失即按钮静默不渲染，非禁用非灰

## 两类缺口
- 配置缺口：COMMON_FRAMEWORK.SYS_MENU 与 SERVICE_EXPAND 两张菜单表均查不到记录，导致按钮不渲染，归为不可标完成
- 反向缺口：整改通知书 reply/confirm/close/supervise/generate 五 API 全仓库零调用、详情页无按钮，但菜单权限已配好，那才是前端接线缺口

## 判定与修复
- 收到「页面做了但按钮不显示」先查 permission 字符串与 moduleName/businessName 拼出的后端值，再查两张菜单表
- 菜单未注册归配置缺口，勿在前端硬写 v-if 绕过后端权限；菜单权限已存在而 API 零调用才是前端接线缺口
- 用 zs-operate-column 须在 data() 声明 moduleName/businessName，否则 mixin 契约断裂按钮全无

## 验证与归属
- 来源会话 session-c3716c15，基线 05caac8，审计结论评价报告 2197 因菜单未注册不可标完成、整改通知书 2194 只差接线
- 涉及文件 zs-operate-column.vue、stdEvaluation/standard/index.vue、api/evaluation/stdEvaluation.js
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "zs_button_gap",
  "source_extraction_id": "f0896f43021441b09295c93548a90738",
  "version": 1,
  "memory_type": "entities"
}
-->