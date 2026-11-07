# 双后端域名API前缀按域名分别配置
苏住房C前端同时对接两套后端，szfcweb.cn必须用/prod-api，主接口用/api，不可全局替换。

## 背景
- 主接口szf.szzfcjj.cn(V2+V1业务)与苏州市区房产交易网上服务平台http://szfang.szfcweb.cn
- 路径前缀约定不同：szfcweb.cn必须是/prod-api，主接口是/api
- 写成/api会因网关没配该前缀而404/502

## 配置做法
- 小程序端(mp)：API基地址集中在src/env/mp.js，V1实例在src/api/v1Instance.js里拼，BASE=`${BASE_URL_V1}/prod-api/v2.0`
- 改前缀只改这一处，不要散落到各个api文件
- H5端走环境变量代理，VITE_APP_API_PROXY_V1已指向http://szfang.szfcweb.cn/prod-api，无需改代码
- 主接口szf.szzfcjj.cn仍保持/api/v2.0，切换前缀时务必确认没有误伤它

## 判定口径
- 需求说「xx域名开头的接口」时，先按域名分组再动前缀
- 不要全局替换/api → /prod-api

## 验证与归属
- 来源会话bfce31c8(基线9832ba3)：用户两次强调szfang.szfcweb.cn开头接口用/prod-api
- 涉及文件：v1Instance.js、mp.js、index.js、vite.config.ts
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "api_prefix_domain",
  "source_extraction_id": "91c4dec38b054bbba12cbff6d880442c",
  "version": 1,
  "memory_type": "entities"
}
-->