
# 未注册本地页跳转致navigateTo失败
苏住房C(zhi2-mobile-shimin)中houseLoanGuide页面跳转未注册页面引发navigateTo失败，改为webViewNav打开H5。

## 问题根因
- houseLoanGuide/index.vue跳转未注册页面pages/policy/fddydetail(pages.json未配置)引发navigateTo:fail page not found

## 解决方案
- 改为通过webViewNav打开外部H5页面，代码见zhi2-mobile-shimin/src/pages_transaction/houseLoanGuide/index.vue的goToDetail方法

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据src=苏住房C/068.md
- 涉及文件：src/pages_transaction/houseLoanGuide/index.vue、src/pages.json、src/api/transaction.js、src/pages_main/common/webViewNav.vue、src/pages_transaction/service/bankList.vue、bankDetail.vue、taxGuide/index.vue、src/utils/index.js
- 来源会话：2d03bb3e-84c4-4246-ae8a-bea874fd391d；代码基线none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "navigate_unregistered_page",
  "source_extraction_id": "f50f877d11dc4b4680b3c1097a023672",
  "version": 1,
  "memory_type": "entities"
}
-->