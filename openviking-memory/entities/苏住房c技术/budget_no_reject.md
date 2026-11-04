# 预算页未传noReject致数据层错位
苏住房C业主端年度预算页因接口未传noReject，拦截器已解包导致response.data即为业务数组，自写解析取response.data.data得到undefined而显示空态。
## 问题现象
- 业主端zhi2-mobile-shimin年度预算页pages_benefit/budget/index.vue显示「暂无相关数据」
- 接口code=200且预算数组确实返回，但页面自写resolveBudgetResponse按response.data.data取数组得undefined
- 最终被兜底成[]，表现为接口成功但页面空态
## 根因
- getAnnualBudgetByComplexId未将{noReject:true}传给api.get
- 拦截器已解包并reject异常，实际返回{code,msg,data:[...]}，response.data本身是预算数组
- 再点.data得到undefined，静默空数组
## 解决方案
- 新增接口封装先确认是否传noReject；没传不写response.data.data这层
- 统一用项目通用写法res.data || [] / res.rows，删掉自造多层解析函数
- 加载后若当前年份无数据（如2026）自动回退到接口返回最新有数据年份（如2025）
- 排查顺序：先打日志确认拦截器返回层级，再怀疑渲染
## 验证与归属
- 会话ad82d807：预算页「暂无相关数据」，根因为resolveBudgetResponse期望response.data.data而接口未传noReject
- 涉及文件：src/pages_benefit/budget/index.vue、src/api/benefit.js、src/api/index.js
- 所属项目：苏住房C；来源会话ID：ad82d807-c9eb-4693-a967-eec366f6e641；代码基线：3ab0cff

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "budget_no_reject",
  "source_extraction_id": "1d069700b22d47f4910ca8e2360f52a7",
  "version": 1,
  "memory_type": "entities"
}
-->