# 小区周边地图链路静默返回与markers累加
H5嵌入小程序时小区周边地图无数据，需避免失败路径静默return[]且onShow重拉须重置markers防重复点。

## 排查路径
- 控制台过滤`[小区周边]`/`[小区周边/QQMap]`，依次核查宿主（`wx.miniProgram.getEnv`判断）是否web-view、Key是否为空、经纬度是否合法
- 检查JSONP/逆地理/地点搜索失败原因（超时、script错误、status/message）
- 成功但pickedCount为0则属过滤或POI稀疏，非代码错误

## 代码坑与修复
- 失败路径若统一`return []`且无日志，无法区分Key/坐标/宿主拦截（含JSONP超时与script报错），应对每段失败打点
- `onShow`重复拉详情时对`markers.push`会累加重复点，应每次重置为单个marker
- 涉及文件：pages_owner/project/info/index.vue、utils/index.js、utils/qqMapKey.js、utils/transaction.js、pages/facility/index.vue、components/ZsMap/ZsMap.vue

## 验证与归属
- 来源会话：44e9f45b-f8b3-4cdb-b60b-c803993c0d4a
- 验证证据：src=无锡市区小程序嵌入H5/017.md
- 代码基线：ca82c96
- 验证结论：用户要日志判断宿主能否调通地图并排查代码，列出日志对照表并指出静默return[]与markers.push累加两处问题
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "zsmap_markers_accumulate",
  "source_extraction_id": "1c38a5170e754f5592e379099b15620b",
  "version": 2,
  "memory_type": "entities"
}
-->