# 物业管理区域备案后端契约前端反推路线
苏住房G仓库无Java源码，只能通过mixin拼路径与组件链路反推complex保存/权限校验契约。
## 适用场景
- 需弄清complex（物业管理区域备案）保存/更新接口的后端权限校验、字段白名单等
- 仓库根目录仅为submodule容器（仅zhi2-web-admin），后端部署在远端
## 反推步骤
- 由详情页拿接口三要素：primaryKey:'complexId'、moduleName:'property'、businessName:'complex'
- 由mixins/form.js的addApiFull/editApiFull/detailApiFull拼接规则还原真实路径（/${moduleName}/${businessName}${suffix}）
- 逐层读调用链推断权限：detailMixins.js、form.js、bTerminalProjectMixin.js、OperationBtnGroup、ZsSubmit、utils/flowApi.js、terminalUser.js、projectContext.js、store/getters.js
- 用「按钮/字段在什么状态下才出现」反推后端允许编辑态
## 边界与归属
- 结论只能表述为「前端契约推断」，非后端实现事实；确认需后端开代码或文档
- 同类需求走此路线，勿在工作区grep找Java文件
- 涉及文件：property/complex/detail.vue、mixins/form.js、detailMixins.js、OperationBtnGroup/index.vue、terminalUser.js、projectContext.js、.gitmodules、env/.env
- 所属项目：苏住房G；来源会话：231da5b0-82db-4a83-819f-b9b0376ce290；代码基线：2a3ef8a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_backend_route",
  "source_extraction_id": "dcd170cd1ed947ccac43a5f904fd01c7",
  "version": 1,
  "memory_type": "entities"
}
-->