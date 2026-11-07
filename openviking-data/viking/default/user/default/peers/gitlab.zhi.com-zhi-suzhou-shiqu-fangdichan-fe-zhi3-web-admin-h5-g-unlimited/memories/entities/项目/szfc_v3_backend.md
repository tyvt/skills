# 苏州市房地产检测V3后端
苏州房产管理系统（苏州市房地产检测V3）后端服务，与 zhi2-web-admin 前端子模块配套。

## 服务与端口
- common-gateway：8080
- zhi3-prefund：9214（预售资金）
- zhi3-presale：9213（价格备案）
- common-flowable：未运行

## 登录鉴权
- 登录接口：POST /security/auth/userLogin
- 验证码：算术题，答数字
- 密码加密：AES-256-CBC（KEY=A-16-Byte-keyValA-16-Byte-keyVal，IV=A-16-Byte-String）
- 所有环境 VITE_CRYPTO_ENABLED=false（含 production，非白名单接口也不加密）
- 返回：accessToken（JWT）与 token（UUID）；前端须用 accessToken 写请求头

## 接口特征
- todoTaskList：业务类型仅按精确 busCode 过滤；keyWord 忽略（不影响结果集）；submitTittle 按标题过滤。验证：busCode 13 行、空 keyWord 仍 287 行、submitTittle 35 行
- listBusCodeMenuByKeyWord：远程搜索下拉，@RequestBody String 收原始纯文本 body；前端须 text/plain 发 keyWord（JSON/引号/空 body 均空，空格返全部 165 项，单字如'办'返匹配）


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "项目",
  "name": "szfc_v3_backend",
  "source_extraction_id": "dbc3611be781479c96ef14b63011f42f",
  "version": 1,
  "memory_type": "entities"
}
-->