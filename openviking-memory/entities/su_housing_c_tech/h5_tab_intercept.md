# APP内嵌H5的Tab页拦截返回修复
苏住房C在APP WebView内嵌H5场景下，已实现tab页拦截，任何回到H5 tab的行为都调用原生`backInfo`返回APP。

## 问题背景
- APP WebView中用户后退可能落到H5的tab页(首页、苏找房、慧物业、掌服务、我的)，但这些tab应由原生实现，不应在H5展示

## 方案要点
- 新增`utils/appNavigation.js`，检测原生APP环境(webkit/android/harmony，排除SZDJSBridge)时统一拦截
- `uni.navigateBack`：若目标为tab页或栈中只剩一页→调用`backInfo()`
- `uni.switchTab`：直接调用`backInfo()`
- `uni.reLaunch`/`redirectTo`到tab页：调用`backInfo()`
- tab页`onShow`(`tabBar.js`兜底)：展示tab时调用`backInfo()`

## 修改文件与归属
- 修改文件：`src/utils/appNavigation.js`(新建)、`src/utils/tabBar.js`
- 所属项目：苏住房C(zhi2-mobile-shimin)；来源会话ID：34bbb144-2648-4883-b2f5-4039faa3aa6e

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "h5_tab_intercept",
  "source_extraction_id": "32b9912824bb4746851a7d42adfc4d01",
  "version": 1,
  "memory_type": "entities"
}
-->
