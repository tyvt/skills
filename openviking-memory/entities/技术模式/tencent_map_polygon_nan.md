# 产品2.0 腾讯地图多边形坐标安全构造
统计地图页因园区多边形 path 按错误分隔符解析成 NaN 崩溃，所有 LatLng 构造须走安全校验函数。

## 问题根因
- benefit/statisticsMap 在 mounted 抛腾讯地图异常「LatLng 传入参数 (NaN, 120.311972) 非合法数字」。
- 后端返回园区多边形 path 是「分号 ; 分隔各点、逗号 , 分隔经纬度」，解析函数却按空格 split(' ') 切分。
- 构造 LatLng 前无合法性校验，一条脏数据就让整个地图初始化崩溃。

## 解决方案
- 解析函数统一按 ';' 切点、',' 切经纬度，对接字符串型几何数据须先确认实际分隔符。
- 封装 createSafeLatLng(lat, lng)，内部 Number 转换 + isFinite 校验，非法返回 null 并跳过该点。
- initMap、updateCenter、区域标注 nameLocation 等所有构造坐标入口都走安全构造，避免个别异常炸页面。

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话结论确认根因是分隔符错误，新增 createSafeLatLng，getBuildingPaths 改 split(';')，各入口改走安全构造。
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue、zhi2-web-admin/src/constant/map.js。
- 所属项目：产品2.0；来源会话ID：4ba54bd2-24d5-4b33-92bc-49f3cc906331；代码基线：a53a27c。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tencent_map_polygon_nan",
  "source_extraction_id": "d5c590fa365f4509a81c129f2975f534",
  "version": 1,
  "memory_type": "entities"
}
-->