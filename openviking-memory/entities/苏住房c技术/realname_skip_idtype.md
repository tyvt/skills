# 实名认证跳过证件选择直达号码页
苏住房C小程序实名认证入口经shouldSkipIdTypeChoose()始终返回true，直达姓名+证件号码输入页。

## 问题背景
- 旧流程需经TypeChoose选择证件类型再填FormNonLocal/FormLocal，步骤冗余

## 解决方案
- src/utils/index.js中shouldSkipIdTypeChoose()由import.meta.env.PROD改为始终return true
- getRealNameEntryUrl()返回/pages_my/verification/FormLocal，个人中心等入口直达
- 旧TypeChoose/FormNonLocal链接onLoad重定向至FormLocal

## 验证与归属
- 验证证据：苏住房C/046.md；来源会话6e25ee6f-ffc6-40be-bf9d-065779c41cdc
- 涉及文件：src/utils/index.js、src/pages_my/verification/TypeChoose.vue、FormLocal.vue、pages.json、src/pages_owner/project/auth.vue、UnauthorizedPage.vue、src/pages_my/setting/userInfo.vue、AuthorizedFail.vue
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "realname_skip_idtype",
  "source_extraction_id": "cf25625703d14c518174696c3e7c1a4c",
  "version": 1,
  "memory_type": "entities"
}
-->