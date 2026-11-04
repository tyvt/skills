# 渲染层腾讯地图Key鉴权失败因AppID未绑定
苏住房C移动端渲染层报“当前产品鉴权失败”为腾讯地图Key未与小程序AppID绑定所致，非业务代码错误。

## 问题根因
- 腾讯地图 Key 未与小程序 AppID 绑定或未开通产品
- 渲染层报“当前产品鉴权失败”并非业务代码错误

## 修复要点
- Key 配置存于 src/components/ 相关文件
- 需在腾讯位置服务侧完成绑定与产品开通校验
- 涉及文件：manifest.json、ZsMap.vue、utils/index.js、unionBank.vue、package.json

## 验证与归属
- 验证证据：src=苏住房C/080.md
- 来源会话ID：b1546e14-b5e1-43ee-beef-578fcfc4626f

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "map_key_fail",
  "source_extraction_id": "2426b49c7fdf4f01ad92a4896738da13",
  "version": 1,
  "memory_type": "entities"
}
-->