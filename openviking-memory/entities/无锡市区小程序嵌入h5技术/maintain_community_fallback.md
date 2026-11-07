# 维修页所属小区名houseId兜底
maintain/index.vue 所属小区原仅读 URL 参数或 userStore.projectName，嵌 H5 只传 houseId 致小区名空白。

## 问题根因
- 嵌入 H5 场景仅传入 houseId，原逻辑无对应取值路径
- 小区名读取依赖 URL 参数或 projectName，houseId 场景缺兜底

## 解决方案
- 增加 resolveCommunityName 按优先级取值
- h5Context.js 中 getH5Selection 增加 houseId 查 houseList 兜底

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：6c36b4fe-74d0-426f-82e3-e6ed3c6e89a6；代码基线：none
- 涉及文件：src/pages_owner/maintain/index.vue、src/store/repair.js、src/api/repair.js、src/utils/h5Context.js、src/pages/index/useProjectState.js、src/store/user.js、src/api/maintenance.js、src/pages_owner/maintain/detail.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "maintain_community_fallback",
  "source_extraction_id": "dc39a6e5b671492c87b68671b8c83d92",
  "version": 1,
  "memory_type": "entities"
}
-->