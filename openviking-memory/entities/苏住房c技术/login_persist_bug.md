# uni-app小程序登录态不持久
苏住房C小程序登录后关闭重开回到未登录，Pinia持久化被条件编译裁剪导致小程序端不执行。

## 问题根因
- store/user.js将Pinia状态本地持久化整段包在#ifdef H5条件编译里
- mp-weixin构建时该段被删除，uni.setStorageSync/getStorageSync回填从未执行，登录态仅存内存

## 解决方案
- 持久化逻辑写全平台生效位置，H5专用sessionStorage单独包#ifdef H5
- 排查同类H5正常小程序异常问题，优先查store与utils的#ifdef/#ifndef标签
- 修复后必须走重新编译小程序→登录→完全关闭→重开验证

## 验证与归属
- 验证会话：81967bea，用户报关闭小程序重开退出登录
- 涉及文件：zhi2-mobile-shimin/src/store/user.js、src/pages/login/index.vue、src/App.vue、src/api/index.js
- 代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "login_persist_bug",
  "source_extraction_id": "2b4445ef78724ef68f75a93c4eeae34d",
  "version": 1,
  "memory_type": "entities"
}
-->