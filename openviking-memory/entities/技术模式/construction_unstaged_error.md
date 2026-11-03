# 构建前需将修复改动加入暂存区
园区物管2.0 中 construction/index.vue 的修复改动若未进入 git 暂存区，会导致相关报错仍存在于构建产物中。

## 问题描述
- construction/index.vue 的修复改动未进入提交暂存区，导致相关报错仍存在
- 构建报错源于改动未被纳入提交范围

## 解决方案
- 核对文件内容并将修复改动加入暂存区后再提交
- 确保修复文件在 git 暂存区中再触发构建

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/construction/index.vue
- 所属项目：园区物管2.0；代码基线：none；来源会话：88565b66-71d3-4d18-8d9c-edb6a2b3c7c1

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "construction_unstaged_error",
  "source_extraction_id": "39b925c8e09649388134551189dae6f4",
  "version": 1,
  "memory_type": "entities"
}
-->