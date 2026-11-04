# 苏住房C端小程序
苏住房（苏州住房）业主端H5/小程序前端，子模块为 zhi2-mobile-shimin，承载业主倡议与签字环节。

## 仓库结构
- 子模块 zhi2-mobile-shimin 三个分支：suzhou-shiqu-suzhufang-main-v2.1、suzhou-shiqu-suzhufang-main-v2.1-mp、sfb，均位于本机主工作区直接修改（不新建worktree）
- 旧版页面路径：主分支 pages_owner/propose，mp分支 pages_vote/propose；菜单映射 menuRouteMap.js 指向旧路径

## 榆林版迁移任务
- 禅道任务1976《【前端】【苏住房小程序】迁移榆林版本的业主倡议且增加签字环节》，关联STORY 1328（C端迁移+签字）
- 对接文档《业主倡议·签字环节 前端对接文档.md》要求C端4个签字环节基于榆林版新接口，且C端不回显签字（仅G端回显）
- 榆林版新接口：addAppSuggest(发起倡议,顶层signatureUrl)、cancelSuggestV2(撤回倡议,revocationSignatureUrl)、appSuggestResponse+suggestResponseStatus(响应/撤回响应)

## 参考实现
- 榆林C端代码参考实现位于"泰兴小程序"项目（用户2026-11-04确认），路径 D:epository\泰兴小程序 分支 dev-ui-yulin-v2.6.8 的 src/pages-suggest/
- 接口封装 src/api/autonomy.js（addAppSuggest/cancelSuggestV2/hasResponded/appSuggestResponse）
- 签字组件：苏住房C端已有 src/pages/components/SignBoard.vue（mp分支 src/components/shared/SignBoard.vue）+ pages_owner/decision/components/StepSign.vue

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "su_housing_c",
  "source_extraction_id": "1a9b3c3bdc7140bf86abf69a72558405",
  "version": 1,
  "memory_type": "entities"
}
-->