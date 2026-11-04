
# 苏住房后端
苏住房（苏州住房）物业系统多模块 Maven Spring Cloud 后端项目，位于 D:\repository\苏住房后端。

## 架构与核心服务
- 多模块 Maven Spring Cloud Alibaba 微服务，含网关与多个 server，共 26 模块；版本 zhi2 2.6.1，区别于本机 zhi3 3.0.0，承载防汛 C 端数据
- zhi2-property-server：防汛巡检家园区模块，端口9604，服务名zhi2-property，profile dev；2026-10-30构建12.6MB jar依赖齐全；截至2026-11-03稳定运行，Nacos注册正常、业务接口未带token返403
- common-framework-server：鉴权/登录服务，端口9211，服务名common-framework，profile dev；截至2026-11-03已启动注册Nacos；承载管理端/login与App/H5端/appAuth/login，token拦截器校验特定header
- property(9604)不承载登录接口(返404)，登录/鉴权由common-framework(9211)提供；本机zhi3网关(8080)无法复用其dev namespace

## 登录与鉴权
- 测试账号zsbase / Zs@2026Aa! (超级管理员，USER_ID=1，昵称"管理员"，权限*:*:*，角色admin)
- 登录密码须AES/CBC/PKCS5Padding加密，KEY=`A-16-Byte-keyVal`(16字节) IV=`A-16-Byte-String`(16字节) Base64，由AESUtil实现；明文致AuthServiceImpl.validate空指针；AESUtil.main样例密文陈旧不可作基准
- 服务间Feign调用须带zhi-project-id头，缺失报MissingRequestHeaderException致登录"获取用户失败"
- 2026-11-03联调login 9211用zsbase报NPE(用户null)，根因运行中的common-framework处test profile连test DB无账号；该账号在dev环境有效

## 数据库与运行依赖
- 连达梦测试库「苏住房测试」dameng.v2.suzhufang.shiqu.suzhou.test.zhi.com:5236(非MySQL)；用户表COMMON_FRAMEWORK.SYS_USER含zsbase(USER_ID=1)；密码BCrypt哈希不可逆LOGIN_PASSWORD为空
- 巡检表ZHISHU_PROPERTY.T_PATROL系列结构齐全原数据量0；2026-11-03插入样本关联小区667562048676123与COMPANY_ID 1744632087085916161；T_PATROL_ITEM必填ID/COMPANY_ID/ITEM_NAME/THE_STATE
- 样本插入后接口仍返total=0：BaseDO含@TableLogic theState默认0；zsbase无公司归属拦截器可能追加COMPANY_ID条件；根因未定位(疑日志缓冲)
- Java8+Maven3.9.16；远程Nacos nacos.dev.zhi.com(192.168.1.71, namespace suzhou-shiqu-suzhufang-v2)需鉴权；本机zhi3网关8080连yulin namespace不识别dev(返404)；本地Redis6379在跑MySQL未起

## 启动要点
- 须-Dfile.encoding=UTF-8 -Dsun.jnu.encoding=UTF-8，否则Nacos UTF-8中文配置GBK解析致MalformedInputException、JPush/Seata缺参启动失败
- 中文路径jar需用workdir相对路径 -jar zhi2-property-server.jar，避免Start-Process中文路径误编码打不开


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "su_housing_backend",
  "source_extraction_id": "f50f877d11dc4b4680b3c1097a023672",
  "version": 7,
  "memory_type": "entities"
}
-->