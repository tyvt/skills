# 自治用户授权列表组织名称筛选
园区物管2.0 的 zhi2-web-admin 在 autonomy/userAuth/index.vue 中按后端字段接好「组织名称」(committeeName)，列表与查询均会带上。

## 查询条件
- queryParams 增加 committeeName: undefined
- formItems 增加「组织名称」输入框，支持模糊查询与清空

## 列表列
- columns 增加 { label: '组织名称', prop: 'committeeName', minWidth: 200 }，置于「组织类型」之后

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/autonomy/userAuth/index.vue
- 所属项目：园区物管2.0
- 来源会话：a64c833f-c485-4bfe-899a-5d177a83f9f3
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "committee_name_filter",
  "source_extraction_id": "18bb029c698a48dcbda633e8f296ab54",
  "version": 1,
  "memory_type": "entities"
}
-->