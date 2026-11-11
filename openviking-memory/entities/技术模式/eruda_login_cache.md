# 市民H5登录日志Eruda缓存补打
市民H5项目将登录接口入参与响应先存入内存缓存，待Eruda接管控制台后再补打，避免Eruda加载慢导致日志丢失。

## 方案说明
- 登录接口（URL含login）的入参与响应先进入内存缓存
- Eruda真正接管console后以[补打]标签补打一次
- 已由Eruda接住的日志不再补打

## 日志标签
- URL含login请求打印：[登录接口] 入参、[登录接口] 响应、[登录接口] 失败
- 苏服办登录打印：[苏服办登录] 入参、[苏服办登录] 响应

## 关键参数
- 日志立即打印一次，Eruda未接管时留存内存，最多等待约12秒
- 涉及项目：无锡市市民H5（benefit-fe-zhi2-mobile-shimin-h5-c）
- 代码提交：H5子模块dev_wuxi-sfb（21d91aa），父仓库main-sfb（d5d7e32）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "eruda_login_cache",
  "source_extraction_id": "22b5698b69ab4fcf9f09b39917dabe57",
  "version": 1,
  "memory_type": "entities"
}
-->