# 灵锡V1绑房内联于App而V2抽为工具模块
惠山V1小程序与V2 H5在灵锡登录绑房逻辑的组织方式不同，V1内联于App.vue，V2抽离到utils/lingxi.js。

## 项目结构
- 惠山V1小程序目录被 .gitignore 排除，未纳入Git跟踪
- V1启动登录与绑房回跳内联在 App.vue
- V1的 utils/index.js 中 goAdd 跳转授权页，pages_home/huishan.vue 为回调首页

## V2重构
- V2（zhi2-mobile-admin-h5-c-unlimited）将相关逻辑抽离到 src/utils/lingxi.js

## 验证与归属
- 验证：extracted source=cursor session=57638ffe-46d4-4d5b-85fc-638b24c77f63
- 涉及文件：src/utils/lingxi.js、惠山V1小程序/src/App.vue、src/utils/index.js、pages_home/huishan.vue 等
- 所属项目：惠山二期H5 / 惠山V1小程序；来源会话：57638ffe-46d4-4d5b-85fc-638b24c77f63；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "lingxi_v1_v2_architecture",
  "source_extraction_id": "81ea005e02284cf9a207c22dfc8a128a",
  "version": 1,
  "memory_type": "entities"
}
-->