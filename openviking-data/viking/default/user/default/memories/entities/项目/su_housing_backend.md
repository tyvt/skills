
# 苏住房后端
苏住房（苏州住房）物业系统多模块 Maven Spring Cloud 后端项目，位于 D:\repository\苏住房后端。

## 架构与服务
- 多模块 Maven Spring Cloud Alibaba 微服务，26 模块，版本 zhi2 2.6.1（区别于本机 zhi3 3.0.0），承载防汛 C 端数据
- zhi2-property-server：防汛巡检端口9604，profile dev，2026-10-30构建正常，Nacos注册正常
- common-framework-server：鉴权/登录端口9211，承载管理端/login与App/H5端/appAuth/login
- property(9604)不承载登录(404)，登录由common-framework(9211)提供；本机zhi3网关(8080)无法复用dev namespace

## 登录与鉴权
- 测试账号 zsbase / Zs@2026Aa! (USER_ID=1, 管理员, 权限*:*:*, 角色admin)
- 密码须AES/CBC/PKCS5Padding加密 KEY=`A-16-Byte-keyVal` IV=`A-16-Byte-String` Base64；明文致NPE
- 服务间Feign须带zhi-project-id头，缺失报MissingRequestHeaderException致"获取用户失败"
- 2026-11-03联调login 9211用zsbase报NPE因common-framework处test profile连test DB无账号

## 数据库与运行
- 达梦测试库「苏住房测试」dameng.v2.suzhufang.shiqu.suzhou.test.zhi.com:5236；SYS_USER含zsbase(USER_ID=1)密码BCrypt空
- 巡检表ZHISHU_PROPERTY.T_PATROL系列；2026-11-03插入样本关联小区667562048676123与COMPANY_ID 1744632087085916161；插入后接口仍total=0根因未定位
- Java8+Maven3.9.16；远程Nacos nacos.dev.zhi.com需鉴权；本机zhi3网关8080连yulin namespace不识别dev；本地Redis6379在跑MySQL未起

## 启动要点
- 须-Dfile.encoding=UTF-8 -Dsun.jnu.encoding=UTF-8防Nacos UTF-8中文GBK解析失败
- 中文路径jar需用workdir相对路径 -jar zhi2-property-server.jar


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "su_housing_backend",
  "source_extraction_id": "2fb6b09cc6b04eb5bada4090400fbd04",
  "version": 8,
  "memory_type": "entities"
}
-->