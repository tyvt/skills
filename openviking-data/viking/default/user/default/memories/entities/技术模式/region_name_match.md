# 区域名完整路径与短名称匹配失败
苏住房G大屏/统计页因接口返回完整行政区划路径而前端用短名称做严格匹配，导致统计卡片被静默过滤成空数组显示「暂无数据」。

## 现象与根因
- 大屏/统计页（views/property/largeScreen）业委会、物管会等统计卡片突然显示「暂无数据」，接口本身有数据
- 接口regionName为完整路径（如江苏省/苏州市/吴江区），前端排序列表用短名称（吴江区），transformRegionSort严格===匹配对不上，fourData被过滤为空
- 属「过滤后为空」而非报错，控制台干净、极难定位

## 解法
- 在utils.js落三个函数一次性收口：getShortRegionName（取路径末级）、matchRegionName（完整路径与短名称互认比较）、normalizeRegionData（入库前标准化区域名）
- transformRegionSort改用matchRegionName；区域列表未加载完时直接用标准化接口数据渲染，避免启动瞬间空白

## 验证与归属
- 来源会话97416c4f（基线eb8213c）：最终结论确认完整路径vs短名称匹配失败致fourData为空；修复增加三函数并支持互认
- 涉及文件：zhi2-web-admin/src/views/property/largeScreen/utils.js、index.vue、components/componentMap.vue、svgMap.vue
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_name_match",
  "source_extraction_id": "52723b29124e479cbd6d860437d400c6",
  "version": 1,
  "memory_type": "entities"
}
-->