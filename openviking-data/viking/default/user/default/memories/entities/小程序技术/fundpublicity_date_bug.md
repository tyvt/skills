# 明细字段按错日期字段取值致整块无数据
苏住房C小程序pages_benefit/fundPublicity/detail.vue（物业服务企业账户明细）真实接口有返回数据但页面整块不显示。

## 根因与排查
- 字段映射用错日期字段：代码按 bookkeepingDate 取值/分组，该接口明细实际日期口径是别的字段，取到 undefined 后整块无法渲染成行
- 页面显示「数据没显示/整块空白」但接口200且非空时，第一动作贴接口原始报文对比模板绑定字段名与报文key，而非先查loading、分页、字典
- 日期类字段尤其容易错，同一业务常见 bookkeepingDate/accountDate/bizDate 多套命名

## 解决方案
- 拿真实接口返回报文逐字段核对明细行日期/金额字段名，把模板与映射函数里的 bookkeepingDate 换成接口实际下发日期字段；改完用真实数据回放验证「有行、有值」
- 提交命名 fix(fundPublicity): 修复物业服务企业账户明细字段映射错误导致无数据
- 子模块推 origin/sfb 并合并到 suzhou-shiqu-suzhufang-main-v2.1，父仓库只更新子模块指针（dev-sfb→同名main分支）；合并冲突按「子模块指针取包含本次提交的较新SHA」解决

## 验证与归属
- 验证：会话4a5e4ed3用户指出fundPublicity/detail.vue:154-170数据不显示，真实接口有数据但bookkeepingDate不对；提交67bfb6c2（子模块sfb）→合并25ce1de4；父仓83f31bc→合并d007291，子模块指针冲突按main-v2.1上25ce1de4解决
- 涉及文件：src/pages_benefit/fundPublicity/detail.vue、src/api/benefit.js、benefitDetail.vue、detail2.vue
- 所属项目：苏住房C；来源会话ID：4a5e4ed3-506f-4508-ab7a-666541b7f2c3；代码基线：c34c2b8

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "fundpublicity_date_bug",
  "source_extraction_id": "69140a56f4294c209be09391c39e043a",
  "version": 1,
  "memory_type": "entities"
}
-->