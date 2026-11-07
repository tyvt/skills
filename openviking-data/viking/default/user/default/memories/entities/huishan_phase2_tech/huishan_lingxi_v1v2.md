# 惠山V1V2灵锡绑房结构
惠山二期H5 存在 V1 小程序与 V2 H5 两套灵锡绑房实现，核心逻辑位置不同。

## V1 小程序
- 目录 d:\repository\惠山二期H5\惠山V1小程序\ 被 .gitignore 排除（惠山V1小程序/**），不在 git 跟踪内
- 灵犀绑房核心逻辑集中在 V1 的 src/App.vue（内联实现，无独立 handleLingxiLaunchQuery）
- src/utils/index.js 的 goAdd() 跳转灵犀授权页
- src/pages_home/huishan.vue 为 V1 绑房回跳首页（回调页）

## V2 H5
- 灵犀绑房核心逻辑抽离到 zhi2-mobile-admin-h5-c-unlimited/src/utils/lingxi.js
- V2 的 handleLingxiLaunchQuery 等价于 V1 App.vue 的启动登录 + 绑房回跳

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 涉及文件：d:\repository\惠山二期H5\惠山V1小程序\src\App.vue、d:\repository\惠山二期H5\惠山V1小程序\src\utils\index.js、zhi2-mobile-admin-h5-c-unlimited/src/utils/lingxi.js
- 来源会话ID：57638ffe-46d4-4d5b-85fc-638b24c77f63；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "huishan_lingxi_v1v2",
  "source_extraction_id": "7045f4d455184c36854e68c49be63b56",
  "version": 1,
  "memory_type": "entities"
}
-->