# 主包Tab兜底占位图须放主包static否则空白
苏住房C苏找房「全部」Tab二手房卡片因默认图放分包未预加载而整块空白，非默认图缺失。

## 问题现象
- 苏找房「全部」Tab二手房卡片图片显示空白，连默认占位图也没出来（用户强调「不是默认图，是整块空白」）
- H5生产环境图片代理写http://，在HTTPS WebView里属混合内容被拦截

## 根因
- listRecommend返回的二手房记录thumbnail为null，接口本身不带图片
- default.png放在pages_transaction分包，苏找房Tab属主包页面，分包未预加载时分包内静态资源路径不可访问
- 图片字段映射不完整：部分接口返回imageUrl而非thumbnail，原写法imageUrl:e.thumbnail会把已有地址覆盖成undefined

## 解决方案
- 把default.png复制到主包src/static/images/szf/，并在utils/mainStaticPaths.js注册主包默认图路径
- houseCard.vue与各列表页图片字段映射统一改成thumbnail ?? imageUrl，不再反向覆盖
- pages.json进入苏找房Tab时预加载pages_transaction分包（兜底，不替代主包方案）
- .env.production图片代理改https://szfang.szfcweb.cn

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话fa5768fc二手房图片整块空白；listRecommend返回thumbnail均为null；default.png在分包内致主包不可访问；修复后主包复制+映射改thumbnail??imageUrl+预加载+代理改https
- 另需向上游说明：「全部」Tab缺缩略图属后端数据问题（szfHQuery已有该数据但listRecommend未返回）
- 涉及文件：src/static/images/szf/default.png、src/utils/mainStaticPaths.js、src/components/commonNew/houseCard.vue、src/pages_tab/components/Project_Suzhufang.vue、src/pages_transaction/stockHouse/index.vue、src/pages.json、.env.production
- 所属项目：苏住房C；来源会话ID：fa5768fc-b738-4e95-83d7-d7bd81e5939a；代码基线：0cea241

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "main_tab_placeholder",
  "source_extraction_id": "cc94cc1db25f4df5aeee6e6f8a3b8b62",
  "version": 1,
  "memory_type": "entities"
}
-->