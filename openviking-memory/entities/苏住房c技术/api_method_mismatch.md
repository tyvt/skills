# 移动端接口层请求方法约定
苏住房C的 src/api/transaction.js 中 listRecommend 原写POST导致列表无数据，需逐接口按实际后端核对方法。

## 问题现象
- listRecommend（新房推荐列表）原先写成 POST 调用，与同文件其它列表接口不一致，接口拿不到数据。
- 前端表现列表静默为空，难从现象反推方法写错。

## 根因
- uni-app 项目 api/*.js 按模块平铺、无接口文档可查，POST/GET 混写不被编译器拦下。
- 请求拦截器照常发出，后端按方法未匹配返回空/异常数据。

## 解决方案
- 用户点名某接口是 get 时，直接改成与同文件其它 GET 同构：apiV1.get('/模块/资源/listRecommend', { params })，参数走 query string。
- 新增接口先在同文件找同类接口（列表GET、详情/提交POST）照抄形态，不要自创。
- 排查「列表无数据」时把方法、参数名、参数包裹层级（params vs body）一起核对，而非只看字段映射。

## 验证与归属
- 验证证据：会话 00dded85（基线 e04432d）用户指出 zhi2-mobile-shimin/src/api/transaction.js:247-249 的 listRecommend 应为 GET，改为 apiV1.get 并保持与同文件 GET 写法一致。
- 涉及文件：d:\repository\苏住房C\zhi2-mobile-shimin\src\api\transaction.js
- 所属项目：苏住房C；来源会话ID：00dded85-b3a2-4381-8085-aac881094b86；代码基线：e04432d

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "api_method_mismatch",
  "source_extraction_id": "2df5dc51c76245cd8e19edc921ee51af",
  "version": 1,
  "memory_type": "entities"
}
-->