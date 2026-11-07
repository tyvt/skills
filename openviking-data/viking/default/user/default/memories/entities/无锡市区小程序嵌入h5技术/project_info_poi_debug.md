# 小区信息页周边配套调试日志
pages_owner/project/info/index.vue 的周边配套无数据时，已加 [小区周边]/[小区周边/QQMap] 日志帮助定位宿主、Key、坐标与接口链路问题。

## 日志判断项
- 宿主：区分 H5 与小程序 web-view（wx.miniProgram.getEnv）
- Key：qq.map.key 是否取到（脱敏）
- 坐标：详情接口经纬度是否存在、是否合法
- 接口链路：逆地理 JSONP/wx.request → boundary → 地点搜索；失败区分超时、script 报错、业务 status/message

## 已发现代码问题
- 失败路径原先全部静默 return []，无数据时无法区分 Key、坐标、逆地理或搜索故障（现已打点）
- onShow 重复拉详情时 markers.push 会累加，已改为每次重置为单个 marker

## 日志关键字对照
- 地图 Key 为空：配置/登录问题，请求未发出
- 小区未配置经纬度：业务数据问题，未调地图
- JSONP 超时 / script.onerror：宿主/网络拦截 apis.map.qq.com

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话 44e9f45b 用户反馈小区周边无数据要求加日志
- 涉及文件：src/pages_owner/project/info/index.vue、src/utils/index.js
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：44e9f45b-f8b3-4cdb-b60b-c803993c0d4a

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "project_info_poi_debug",
  "source_extraction_id": "db939e041a9d4a98beb9e35906b8523f",
  "version": 1,
  "memory_type": "entities"
}
-->