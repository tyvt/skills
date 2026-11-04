
# 小程序端WXSS本地背景图导致渲染层报错
苏住房C(zhi2-mobile-shimin)中pages_owner/house/index.vue的WXSS背景图本地路径致微信小程序渲染层错误，采用条件编译。

## 问题根因
- pages_owner/house/index.vue中.top-empty与.history-container的WXSS背景图在微信小程序端使用本地路径导致渲染层网络层错误

## 解决方案
- 条件编译：H5使用本地../../static/images/szf/Bg-szf.png，微信小程序使用CDN https://szf.szzfcjj.cn:8888/static/images/szf/Bg-szf.png

## 验证与归属
- 验证证据src=苏住房C/069.md
- 涉及文件：src/pages_owner/house/index.vue、src/components/ZsImage/ZsImage.vue、src/pages_owner/tenant/index.vue、src/pages_owner/house/components/TypeChoose_Suzhufang.vue
- 来源会话：5fbd3e35-025c-45df-996f-22495a68d907；代码基线none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "wxss_local_bg_error",
  "source_extraction_id": "f50f877d11dc4b4680b3c1097a023672",
  "version": 1,
  "memory_type": "entities"
}
-->