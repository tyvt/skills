# 地址取值参考benefit页计算属性
模板直接拼接[userStore.projectName,userStore.address]不准确，应改用benefit/index.vue的计算属性模式。

## 实现方式
- 新增 `buildRegionAddress` 与 `projectAddress` 计算属性，从 houseList 匹配拼接地址
- `onLoad` 调用 `ensureProjectInfo` 确保数据就绪
- 避免直接用 userStore.projectName/userStore.address 拼接

## 验证与归属
- 来源会话：07179d96-198e-473a-9756-27bdde80b66b
- 涉及文件：pages_benefit/benefit/index.vue、pages_benefit/elevatorPubEngCons/index.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "address_computed_pattern",
  "source_extraction_id": "1c38a5170e754f5592e379099b15620b",
  "version": 1,
  "memory_type": "entities"
}
-->