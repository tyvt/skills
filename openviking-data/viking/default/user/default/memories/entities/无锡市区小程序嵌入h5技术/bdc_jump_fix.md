# 不动产跳转数据完整性修复
小程序跳转不动产场景修复用户数据不全问题，统一跳转前校验与刷新用户档案。

## 修复内容
- user.js 的 setUserInfo 修正：username 存真实姓名 realName，nickname 单独存昵称，展示用 username || nickname 兜底
- 新增 portal.js 跳转工具：getBdcJumpParams 取姓名/证件号/手机号、getMissingBdcFields 校验缺失、buildBdcQueryString 构建参数、ensureProfileForBdcJump 跳转前刷新
- home.vue 跳转前 await getUserInfo 防竞态；未实名跳 pages/face/verify；已实名但信息不全则本地提示不跳空参；抽取 navigateMiniProgram 复用
- usePortal.js 的 navigateToAddHouse 改 async，跳转前 ensureProfile

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：user.js、portal.js、home.vue、usePortal.js
- 所属项目：无锡市区小程序嵌入H5；来源会话：b91f733f-c012-4895-a19d-a04b64d87630

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "bdc_jump_fix",
  "source_extraction_id": "8aea2040c35a436fbdbb96856e9b42ea",
  "version": 1,
  "memory_type": "entities"
}
-->