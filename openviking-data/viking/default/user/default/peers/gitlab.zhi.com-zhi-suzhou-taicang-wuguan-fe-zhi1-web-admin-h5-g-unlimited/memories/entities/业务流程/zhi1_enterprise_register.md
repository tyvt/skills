# 太仓物管 zhi1 企业注册流程
太仓物管前端 zhi1-web-admin 的企业（机构）注册创建流程，属禅道任务 2334 原型还原范围。

## 接口与校验
- 真实企业创建接口先校验图形验证码，通过后才进入机构类型校验。
- 2026-11-15 以无写入方式探测：CAPTCHA 被接受，真实创建接口到达机构类型校验阶段。
- 该探测全程未触及数据库，未产生任何真实写入。

## 草稿复用规则
- 源码显示：相同 USCC（统一社会信用代码）的待提交草稿会被复用，沿用旧草稿而非新建。

## 测试数据规则
- 因草稿复用，正式验证使用带 `T2334` 标记的随机合成 USCC、唯一名称与合成护照号。
- 测试记录按用户要求保留，不清理。
- 验证码及接口返回的账号密码只在进程内使用，不写入文件、不对外输出。

## 归属
- 所属项目：太仓物管前端 zhi1-web-admin（登录/注册原型还原）。
- 代码基线：本地仓库 `D:\repository\太仓G\zhi1-web-admin`。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-taicang-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "category": "业务流程",
  "name": "zhi1_enterprise_register",
  "source_extraction_id": "0fe585bf2f5b4c91aff26e648c0bcb05",
  "version": 1,
  "memory_type": "entities"
}
-->