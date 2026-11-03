# 报告编制企业列表恒空的根因链
报告编制接口companyCount恒为0、companyList恒空，根因是跨服务DTO契约缺口，需锁定到行号。

## 现象与实测
- 报告编制接口返回companyCount恒为0、companyList恒为空
- 用有生效物业合同的小区实测（complexId 667579428045292等5个，合同bizState=2）仍为0，说明非数据未配

## 根因链（逐行）
- StdEvalReportPrepareServiceImpl.deriveCompanies依赖ComplexDto.getCompanyId()
- 物业侧ComplexApiImpl.listByIdList（POST /api/property/complex/listByIds）走ComplexServiceImpl.listByComplexIds，只做Complex→ComplexVo的BeanUtil拷贝
- ComplexVo根本没有companyId字段；ComplexApiImpl也只回填companyName/联系电话/负责人，没回填companyId
- 过滤条件全空→派生结果空→StdEvalReportPrepareServiceImpl:315抛错
- 对照组单小区详情接口（ComplexServiceImpl:2302）才有setCompanyId(contract.getCompanyRecordId())

## 排查与修复原则
- 遇「字段拿不到」先定位字段从哪个DTO来，再看该DTO有无此属性——BeanUtil拷贝不会凭空造字段
- 批量接口与单条接口逐字段对比：单条有批量没有，就是批量侧映射漏了（本次ComplexVo缺companyId+ComplexApiImpl:239只回填企业名）
- 根因链逐行记下并注明对照组行号，责任方可直接定位
- 对方服务不在本地部署时明确写「当前环境无法验证修复」，不假装已修
- 修复方向是让批量接口也回填companyId（或DTO加字段），而非消费侧兜底造值

## 验证与归属
- 来源会话 b1c0919f-1d59-4d84-b098-af6f3b182d48（基线05caac8）用户诉求4
- 涉及文件 zhi2-web-admin/src/views/evaluation/stdEvaluation/report/detail.vue、docs/std-evaluation/api-map-report.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "std_report_company_gap",
  "source_extraction_id": "3de88f366cf7424d88a42c9766d22bcd",
  "version": 1,
  "memory_type": "entities"
}
-->