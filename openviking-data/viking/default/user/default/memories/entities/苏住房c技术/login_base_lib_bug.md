# 登录页clickCheckTask报错因基础库与旧编译器冲突
苏住房C市民端登录页在微信基础库3.8.6+与2023版uni-app编译器组合下报clickCheckTask err，多为控制台噪音不影响功能。

## 问题现象
- 登录页(pages_main/login/index，含多input)报`clickCheckTask err: TypeError: Cannot read property '0' of null`
- 伴随渲染层`undefined is not iterable`/webviewScriptError，但登录功能多数情况正常

## 根因
- 微信基础库3.8.0以上与项目uni-app编译器(3.0.0-3080720230703001)已知兼容问题
- 社区结论基础库3.8.0以上必现、3.8.0以下不报，非登录业务逻辑错误

## 解决方案
- 临时消噪：微信开发者工具本地设置调试基础库降到3.8.0或3.7.x(如3.7.12)
- manifest.json设libVersion=3.7.12、mergeVirtualHostAttributes=false，移除全局virtualHost:true，在login/index.vue、ImgCode、VerifyCode显式`virtualHost: false`
- 长期根治需升级uni-app依赖；排查先确认功能是否真异常再动依赖

## 验证与归属
- 会话2a7afd34用户贴报错栈(lib 3.16.2)，比对DCloud案例确认组合触发，给降基础库+manifest方案
- 涉及文件：src/pages_main/login/index.vue、src/components/VerifyCode/index.vue、src/components/ImgCode/index.vue、src/App.vue
- 所属项目：苏住房C；来源会话ID：2a7afd34-614f-40f8-8140-36dc5cc4cbe3；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "login_base_lib_bug",
  "source_extraction_id": "c7b854de2e864b02b107787c6c9eb2e8",
  "version": 1,
  "memory_type": "entities"
}
-->