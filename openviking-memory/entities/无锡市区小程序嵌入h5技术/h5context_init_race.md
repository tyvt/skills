# 小程序web-view内H5的localStorage恢复与异步init竞态
切换小区后web-view URL参数已更新，但H5页仍显示旧小区名或houseId与名称错位，需h5Context同步URL并await whenH5ContextReady。

## 问题根因
- userStore启动从uni.getStorageSync('user')恢复上次选房
- App.vue的initH5Context/refreshH5Context异步拉房屋列表，子页onLoad立即读store常在初始化完成前请求
- URL已带houseId时若走applyProjectSelection可能把houseId改成该小区第一套房

## 解决方案
- utils/h5Context.js进入时同步把URL的complexId、houseId、name写入store
- 提供whenH5ContextReady()与getH5Selection()（优先URL）
- App.vue的onLaunch/onShow均调refreshH5Context()（切换小区重开web-view时重同步）
- 业务页（如维修资金）在onShow里await whenH5ContextReady()后用getH5Selection()取参，勿单独信任可能过期的store

## 验证与归属
- 验证会话：400a262f-e497-46ec-9234-87e452dc4641（基线fb55fa9），用户反馈切换小区后URL正确但数据相反
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/h5Context.js、src/App.vue、src/pages_owner/maintain/index.vue、src/pages/index/useProjectState.js
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "h5context_init_race",
  "source_extraction_id": "bbb7f3378b7b486988e7b7bf5524a595",
  "version": 1,
  "memory_type": "entities"
}
-->