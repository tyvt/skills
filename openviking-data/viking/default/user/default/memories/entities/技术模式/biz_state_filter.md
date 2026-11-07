# 已备案列表默认筛选分清两套值源
苏住房G项目把行业管理/项目管理/业主自治模块列表默认筛选设为已备案，需分清 BIZ_STATE 常量与全局 biz_state 字典。

## 问题背景
- 列表页为「薄包装页 + components/index.vue 内核」两级结构，字段名须读内核
- 路由由后端菜单动态生成，meta.filePath 对应 views 目录，URL 经 getRouterPathByFilePath() 解析
- 已备案值常量 '2'（0待提交/1审核中/2已备案/9已撤销），源出 src/views/indemnity/components/enums.js 的 BIZ_STATE.RECORDED
- 列表筛选用全局 biz_state 字典（登录时 store.dispatch('common/saveBizStateOption') 加载）

## 解决方案
- 默认值写进 data().queryParams，resetQuery() 走 this.$options.data().queryParams 保留默认
- 筛选字段多数 bizState：物业服务企业、项目经理、企业备案记录等口径一致
- 项目经理列表有 bizState 列但 formItems 未暴露筛选项，需补 model:'bizState' + options: this.bizStateOptions
- 同模块别名（propertyManager 只有 jobStatus）非备案列表，勿顺手加

## 验证与归属
- 已知清单 249 条只说业务状态走全局 biz_state、BIZ_STATE 常量保持原样，本条补默认筛选取哪个值源
- 涉及文件：company/companyManagement/property/index.vue、components/index.vue、staffManagement/personnelRecord/index.vue、staffManagement/components/index.vue、indemnity/components/enums.js
- 所属项目：苏住房G；来源会话：01b7d0f8-8018-41e8-9a52-062f491b10ff；代码基线：d109b83

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "biz_state_filter",
  "source_extraction_id": "dab230741e8b4b79a6560976b4006de8",
  "version": 1,
  "memory_type": "entities"
}
-->