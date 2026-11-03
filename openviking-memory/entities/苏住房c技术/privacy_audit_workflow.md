# 小程序隐私合规审计清理冗余定位声明
苏住房C被要求确认是否使用定位隐私接口，结论不依赖GPS须清掉scope.userLocation冗余声明。

## 判断口径
- 权限声明不等于实际使用，须全仓检索uni.getLocation/openLocation/wx.getLocation并确认是否被调用
- 再看功能链路是否真依赖GPS

## 解决方案
- manifest.json删permission.scope.userLocation与requiredPrivateInfos
- 删除utils/app.js无人引用的getMap()/getLocation()及连带showToast导入
- 保留ZsMap、localSearch、location.png、公告displayLocation字段（与GPS隐私API无关）

## 验证与归属
- 验证会话：87d969f3，全项目检索确认仅utils/app.js有getLocation且无引用
- 涉及文件：zhi2-mobile-shimin/src/manifest.json、src/utils/app.js、src/components/ZsMap/ZsMap.vue
- 代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "privacy_audit_workflow",
  "source_extraction_id": "2b4445ef78724ef68f75a93c4eeae34d",
  "version": 1,
  "memory_type": "entities"
}
-->