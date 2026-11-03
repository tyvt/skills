# 共用内核列表按 organType 差异化筛选项
companyManagement 下多菜单共用列表内核，按 organType 条件替换筛选项，仅影响指定菜单。

## 问题与根因
- 物业服务企业菜单需将「企业类型」筛选替换为「是否分支机构」，但内核对所有 organType 渲染同份配置
- 全局替换会连累开发/经纪企业；单页复制列表页会造成漂移实现

## 解决方案
- 共用内核按 organType 分支返回筛选配置（organType === '02' 用「是否分支机构」，其余保留「企业类型」）
- 新增筛选项用 sys_yes_no 字典加载（0=否/1=是），不前端写死中文
- queryParams 同步增加 branch，确认导出走 ...this.queryParams 自动带参
- 页面入口（property/index.vue）保持薄壳只传 organType，不复制筛选逻辑
- 切换后检查 listMixins 搜索缓存是否残留已删字段，必要时清理缓存再查

## 验证与归属
- 验证证据：会话 83f5c572，用户要求物业服务企业菜单新增是否分支机构筛选替换企业类型
- 涉及文件：zhi2-web-admin/src/views/company/companyManagement/components/index.vue；property/index.vue；develop/index.vue
- 所属项目：苏住房G；来源会话ID：83f5c572-274a-4ccc-859a-bbd8c2c48f60；代码基线：4fad664

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "common_kernel_filter_organ",
  "source_extraction_id": "abebe2c56425424f94ff991329e745aa",
  "version": 1,
  "memory_type": "entities"
}
-->