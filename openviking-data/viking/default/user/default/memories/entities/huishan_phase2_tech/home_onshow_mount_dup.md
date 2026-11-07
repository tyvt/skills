# 首页接口重复因onMounted与绑房回跳并发
惠山二期H5 首页首次进入时 onShow 与 onMounted 均触发 loadPageData，且绑房回跳未等待致接口重复。

## 问题根因
- H5 首次进入 onShow 与 onMounted 均触发 loadPageData()
- 绑房回跳 handleLingxiHouseBind 内 syncHouseInfoAfterLogin 已拉取房屋/小区，首页未等待绑房结束并行请求

## 解决方案
- newHome.vue 中 H5 首次仅由 onMounted 加载并跳过首次 onShow
- 新增 waitForLingxiHouseBind() 使 loadPageData 等待绑房完成
- store 已有数据时跳过 getMyHouseList/getProjectList
- lingxi.js 与 newHome.vue 添加 [灵锡绑房回跳]/[newHome] 的 authCode 日志

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 验证：src=惠山二期H5/006.md
- 涉及文件：src/utils/sign.js、src/utils/lingxi.js、src/pages/index/property.vue、src/App.vue、src/pages/index/newHome.vue、src/pages/index/useProjectState.js
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：a739d214-76c7-4b31-95f6-240f6706b925；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "home_onshow_mount_dup",
  "source_extraction_id": "8c4a40e76b8e480d92d361435c8d6a78",
  "version": 1,
  "memory_type": "entities"
}
-->