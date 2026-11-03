# 迁移苏州原代码审批流组件SCSS变量缺失致编译失败
从苏州市房地产监测原始代码迁移 showApproval 等审批流组件后，本地 dev 编译报错，业务详情页打不开。

## 问题根因
- 原工程 SCSS 变量 $--color-primary 在 V3 不存在同名注入，V3 主题色是 CSS 变量 --primary-color / --primary-color-rgb
- SCSS 变量未定义是编译期错误，整块样式编译失败导致整页崩坏，表现成「详情页进不去」
- 旧组件依赖的相对图片路径在 Vite 下也可能解析失败

## 迁移替换规则
- $--color-primary → var(--primary-color)
- rgba($--color-primary, .4) → rgba(var(--primary-color-rgb), .4)
- 图片等静态资源统一改到 /assets/images/ 这类 Vite 可解析路径
- 改完必须本地跑一次构建确认编译通过，再进详情页验证

## 涉及文件与归属
- 涉及文件：commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue、components/zs-approval/ApprovalProcessDialog.vue（均在 d:\repository\产品2.0\zhi2-web-admin\src 下）
- 会话 0e3dadb0 用户指认 detail.vue 查通用审批流并给出原始路径，最终修复 showApprovalHeader.vue 用 var(--primary-color)、showApproval.vue 用 rgba(var(--primary-color-rgb), .4)、图片改 /assets/images/icon-flow.png，构建通过
- 所属项目：产品2.0；来源会话 0e3dadb0-95af-45c8-ad5c-3b978035c651；代码基线 62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_scss_bug",
  "source_extraction_id": "ec9ce0013b2443a8a8fee4d4e2edd636",
  "version": 1,
  "memory_type": "entities"
}
-->