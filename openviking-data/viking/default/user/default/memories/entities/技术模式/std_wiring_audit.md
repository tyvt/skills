# 提交/审批接线判定须沿调用链核查（std-evaluation）
不能因模块api文件无submit/approval方法就判定功能未接线，实际走通用OperationBtnGroup + flowApi.buildBusinessApi拼接路径。

## 错误结论与纠正
- 审计曾据 rectificationApi 无submit/approval方法得出D8「前端未接提交/审批」，被lead逐行核对源码推翻
- 真实链路：提交/审批走通用组件 OperationBtnGroup（ZsSubmit/zs-approval）+ flowApi.buildBusinessApi，各模块api文件仅封装业务数据接口

## 正确判定链
- 沿调用链查：组件(OperationBtnGroup) → 路径拼接(flowApi.buildBusinessApi/route.meta.submitApi) → 页面传参(moduleName/businessName) → 后端@PostMapping，四处对上才算通
- 报告分「已接线」与「封装风格不一致」两栏，别混成缺陷
- 列表页无提交/审批按钮非缺陷（本项目约定详情页做提交审批）
- 真实前端缺口单独列（本次4个整改操作+1个生成入口未接线）

## 审计留痕
- 结论被挑战时逐行核对源码+controller，改正文档（只改文档用例未重跑），做「原结论/实际/处理」对照表
- rectificationApi 全仓库无人import，9个方法死代码；页面走listMixins/detailMixins通用封装

## 验证与归属
- 来源会话 d38c482b（基线05caac8）用户诉求4
- 涉及文件 OperationBtnGroup/index.vue、flowApi.js、detail.vue、docs/std-evaluation/api-map-check.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "std_wiring_audit",
  "source_extraction_id": "3e2e7f4e118548deb96ba4904d71db2b",
  "version": 1,
  "memory_type": "entities"
}
-->