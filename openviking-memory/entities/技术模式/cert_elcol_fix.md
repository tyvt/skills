# CertTypeField证书列el-col断点覆盖修复
苏州市房地产监测V3 项目 zhi2-web-admin 中，项目管理子表证书新增的证书类型列因全局 ElCol 补丁导致单设 span 被覆盖，已在 CertTypeField.vue 修复。

## 问题根因
- src/utils/element.js:14-19 给全局 ElCol 打补丁，响应式断点默认值改为 xs=24/sm=12/md=12/lg=8/xl=8
- 所有 <el-col> 即使只写 :span="24"，运行时 DOM 也会带出 el-col-md-12 el-col-lg-8 等类
- detail-form.scss 中 el-col-md-12 半宽规则排在 el-col-24 整行规则之后、特异性相同，按级联顺序半宽胜出

## 修复方案
- CertTypeField.vue 显式声明全断点 24：<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
- 显式 props 优先于补丁默认值，单设 span 不再被覆盖

## 验证与归属
- 实测证书类型列 class 变为 el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-24 el-col-lg-24 el-col-xl-24，命中整行规则
- 涉及文件：src/utils/element.js、detail-form.scss、ProjectCertificateTabs.vue、projectCertificatePanelMixin.js
- 所属项目：苏州市房地产监测V3；来源会话：5c9bf331-76da-4e83-8468-69dcad25ccef

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_elcol_fix",
  "source_extraction_id": "97e9acda86194a2a9a55d80bc7b40fe0",
  "version": 1,
  "memory_type": "entities"
}
-->