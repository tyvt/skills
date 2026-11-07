# 审批接口未传 path 修复
产品2.0 的 zs-approval 组件审批请求体缺失 path 字段问题已修复。

## 问题根因
- submitForm 主审批请求 requestBody 未传 path
- 421 重新提交分支用 this.path || this.$route.fullPath，但 path 未定义为 prop

## 修复方案
- 新增可选 path prop，支持父组件自定义路由路径
- 审批请求体补充 path: this.path || this.$route.fullPath，与重新提交逻辑一致
- 使用示例：<zs-approval :path="customPath" /> 或 <ApprovalProcessDialog :path="customPath" />

## 涉及文件与归属
- 文件：components/zs-approval/ApprovalProcessDialog.vue、components/zs-approval/index.vue
- 所属项目：产品2.0；来源会话：5a5032e9-1eb3-4c40-9529-326bcd83ba44；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_approval_path_fix",
  "source_extraction_id": "9a39b38a52124808ace9dff74296b3b4",
  "version": 1,
  "memory_type": "entities"
}
-->
