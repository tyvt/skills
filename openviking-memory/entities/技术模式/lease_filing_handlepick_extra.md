# B端租赁备案选区域 handlePick 扩展
园区物管2.0 中资源租赁合同备案 detail 选择「物业管理区域名称」弹窗，需对齐资产租赁备案同场景增加 extra 与 extraLinks。

## 背景
- 资源租赁合同备案 detail 选择「物业管理区域名称」弹窗应参考 assetsLeaseContractFiling/detail.vue 实现

## 解决方案
- 在 handlePick 中当 terminalType === "B" 时传入 extra 文案（仅可选已开户且已签署公共收益监管协议的区域）
- 配置 extraLinks 快捷跳转（如「前往开户」「签署协议」，分别指向监管账户、监管协议新增路由）
- 非 B 端保持原接口与筛选
- 使用 getRouterPathByFilePath 拼跳转路径

## 验证与归属
- 验证：会话 0cfa47f3 用户要求 resourcesLeaseContractFiling/detail.vue 参考 assetsLeaseContractFiling/detail.vue 增加 extra
- 涉及文件：zhi2-web-admin/src/views/benefit/resourcesLeaseContractFiling/detail.vue、zhi2-web-admin/src/views/benefit/assetsLeaseContractFiling/detail.vue
- 所属项目：园区物管2.0；来源会话：0cfa47f3-cb5a-437f-98b1-f0ce4821fd79；代码基线：7fe15a8cb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_filing_handlepick_extra",
  "source_extraction_id": "681170c36c0a48678c1d9fd2cb28823e",
  "version": 1,
  "memory_type": "entities"
}
-->