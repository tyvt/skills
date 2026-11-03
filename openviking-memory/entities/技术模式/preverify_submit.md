# 慢接口拆预验证+提交两步客户端约定
苏住房C小程序业主认证原慢接口拆成预验证(3-5s)与提交(<1s)，客户端须串行全程loading、首次失败静默重试一次、二次失败才提示。

## 场景背景
- 原 POST /addOwnerByToken 因苏服办HTTP校验>5s，后端拆为 /preVerifyOwnerByToken 与 /submitOwnerByToken，旧接口保留
- 预验证查询缓存，失败重试一次收益高

## 交互要求
- 整个串行过程显示 loading，阶段间不 hideLoading
- 第一次失败一律静默自动重试一次
- 第二次仍失败才提示，并区分苏服办网关错误(取 Error.message)与业务错误(取 msg/message/sub_msg)

## 实现要点
- api 层 property.js 封装 verifyAndSubmitOwnerByToken(data,{loadingTitle,manageLoading})
- 内部 try 预验证→catch 静默重试→仍失败用 resolveOwnerAuthErrorMessage 解析后抛出；提交失败正常提示不用 noReject
- 页面(addHouse.vue等)删本地 showLoading/hideLoading 与重复 toast，只调函数；已有 loading 传 manageLoading:false
- 超时阈值须大于后端5秒

## 验证与归属
- 验证：会话 894fc213 用户明确两步接口变更与串行loading/静默重试要求，最终落封装函数与页面去重
- 涉及文件：src/api/property.js、PropertyAdd.vue、owner/add.vue、HouseAdd.vue、bindProject.vue、verify.vue
- 所属项目：苏住房C；来源会话ID：894fc213-ccb6-4c5b-912d-82f922d8f7fb；代码基线：5438dc6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "preverify_submit",
  "source_extraction_id": "a54db745c05a4f788c392edfc908a8f7",
  "version": 1,
  "memory_type": "entities"
}
-->