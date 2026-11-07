# 用户名误存昵称且跳转前未刷新信息
嵌入H5中setUserInfo字段映射错误致username误用nickName，跳转竞态致参数为空，需修正映射并在跳转前await刷新。

## 问题根因
- setUserInfo字段映射错误，username误存为nickName，user.js中username实际存realName、nickname独立字段
- 跳转竞态：未等待getUserInfo完成即跳转，导致参数为空

## 解决方案
- portal.js新增getBdcJumpParams等跳转工具
- home.vue与usePortal.js跳转前await getUserInfo并调用ensureProfileForBdcJump校验分流

## 验证与归属
- 所属项目：无锡市区小程序嵌入H5
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：src=无锡市区小程序嵌入H5/011.md
- 涉及文件：src/pages/index/home.vue、src/store/user.js、src/api/security.js、src/pages/login/index.vue、src/App.vue、src/utils/h5Context.js、src/pages/index/property.vue、src/pages_owner/house/automaticAdd.vue
- 来源会话：b91f733f-c012-4895-a19d-a04b64d87630；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "username_nickname_jump",
  "source_extraction_id": "e41348d9ae7f40a696931618195d7ebc",
  "version": 1,
  "memory_type": "entities"
}
-->