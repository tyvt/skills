# 苏住房C SZDJSBridge遗留逻辑清退
苏住房C小程序由早期H5嵌入原生APP改造而来，需移除残留的SZDJSBridge及webkit/android分支，统一走appLogin。

## 背景与原因
- 苏住房C原为H5嵌入原生APP形态，残留苏周到SZDJSBridge(jsbridge-3.0.4.min.js)及webkit/android分支
- 用户明确要求「现在是微信小程序，不需要了，移除相关逻辑」
- 桥接代码注册在全局window与组件生命周期，不存在时会走进错误分支（登录不跳转、tab状态错乱、定位回退异常）

## 代码清退落点（前端）
- index.html删除SZDJSBridge脚本
- utils/index.js的goMenu未登录统一跳PAGES.login，不再区分SZDJSBridge/webkit/android
- utils/app.js移除backInfo、isNativeApp、device、clickEvent、face等原生桥接，只保留appLogin、getMap、toService、getLocation、openPDF
- api/httpInstance.js的401统一调appLogin()

## 页面与组件清退
- 各tab组件去掉onShow里用backInfo同步原生tab的代码
- pages/redirect/index.vue去掉backInfo()（该页是否整页删需先问用户）
- unionBank.vue去掉webkit/android分支，统一定位或默认坐标

## 待确认与结论
- redirect深链中转页是否整页删除需用户确认
- _Jiayuanqu旧版tab组件是否随之一并清理需确认，不要擅自删
- 清理完成后同类改造：401/未登录一律收敛到appLogin()单一入口
- 来源会话：1116fda6；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "szdjsbridge_cleanup",
  "source_extraction_id": "bc2e17ccbf314a70a51b2c2bf67c360f",
  "version": 1,
  "memory_type": "entities"
}
-->