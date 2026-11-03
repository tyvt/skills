# 苏住房C双后端基础路径
苏住房C小程序同时对接主接口szzfcjj.cn/api/v2.0与v1实例szfang.szfcweb.cn/prod-api，后者路径不带/v2.0。

## 接口实例
- 主接口：http://szf.szzfcjj.cn/api/v2.0（带/v2.0）
- v1实例：http://szfang.szfcweb.cn/prod-api（不带/v2.0）

## 错误写法
- v1Instance.js的base写成.../prod-api/v2.0导致重复版本段
- articleV1.js路径写成/v2.0/article/richText/page导致404

## 正确做法
- base止于/prod-api，路径从业务段起写（/article/richText/page、/transaction/house/favorite/page）
- 每个api文件只依赖自己实例base，不在路径重复版本段
- 环境变量成组更新：v1Instance.js、src/env/mp.js的BASE_URL_V1/IMAGE_BASE_V1、.env的VITE_APP_API_PROXY_V1/VITE_APP_IMG_PROXY_V1
- H5走/szf前缀由vite代理转发，本身不加/v2.0；改.env后必须重启开发服务

## 验证与归属
- 会话41cb8c35（2026-08-21，基线9832ba3）用户指出prod-api不需加/v2.0；修改v1Instance.js base与articleV1.js路径
- 会话41a97e7e将v1实例切到unlimited.c.h5.shimin...test.zhishusz.com/prod-api，需同步.env与mp.js
- 所属项目苏住房C；来源会话ID：41cb8c35-518b-4989-80ca-690e568b72c9, 41a97e7e-f4b1-47ec-b087-f85ba74fa510

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "v1_base_no_v2",
  "source_extraction_id": "78365181dbcb4a00b458a6e0aa385005",
  "version": 1,
  "memory_type": "entities"
}
-->