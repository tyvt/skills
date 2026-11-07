# 街道社区字段统一赋编码
园区物管2.0 表单页街道/社区字段须直接赋接口返回的编码，禁止经名称转换，并借此移除字典等待逻辑。

## 问题根因
- 表单页把「默认小区」和「手动选择小区」两条链路字段赋值分开实现，B 端默认小区链路漏传街道/社区字段
- 手动选择链路经 getSubdistrictNameByCode / getCommunityNameByCode 把编码转成名称再赋表单，提交体 subdistrict/community 成中文名，与后端代码口径对不上
- 两条链路赋值逻辑不一致，B 端默认填充路径未覆盖区域字段

## 解决方案
- applyPropertyProjectRow 作为唯一赋值入口，直接把小区接口返回的 row.subdistrict、row.community（编码）赋给表单字段，不做任何名称转换
- 默认小区（B 端 initCurrentProject）与手动选择小区（showPropertyProjectDialog）都调用同一函数
- 移除 waitForAreaOptions「等字典加载完成再赋值」等待逻辑，减少初始化时序耦合

## 验证与归属
- 验证：applyPropertyProjectRow 直接赋 row.subdistrict/community（编码），不再经名称转换函数；去掉 waitForAreaOptions；默认与手动选择统一逻辑，提交时街道社区为代码
- 涉及文件：zhi2-web-admin/src/views/benefit/pubManagementOrg/detail.vue
- 所属项目：园区物管2.0；代码基线：7fe15a8cb；来源会话：2e908be5-90f0-4ee1-998f-327c7c2fb67b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_field_code_assignment",
  "source_extraction_id": "53246eca93fe4b4fb7a3b7d493699f83",
  "version": 1,
  "memory_type": "entities"
}
-->