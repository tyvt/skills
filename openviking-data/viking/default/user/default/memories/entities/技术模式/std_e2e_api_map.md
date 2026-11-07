# 标准化评价E2E造数捷径（api-map.md）
为「物业标准化评价」E2E 用例作者产出的接口契约文档 docs/std-evaluation/api-map.md 沉淀出直接决定 E2E 写法的结论。

## 文档概况
- docs/std-evaluation/api-map.md 共 1310 行 / 78KB，覆盖 110 个接口 / 16 个 Controller，九个域
- 后端子模块 zhi2-evaluation（develop/v2.6.2-suzhufang-dev），核心包 stdEvaluation 下 148 个文件

## 三条造数捷径
- 种子数据已有 5 份市标，雪花 id 2120000000000000001~...005，可直接全链路复用，E2E 无需新建标准
- H5 端 16 个接口无任何 @RequiresPermissions 注解，是最省事造数入口
- 写操作沿 zs-method 隧道：修改=POST+zs-method: put、删除=POST+zs-method: delete（直发 PUT/DELETE 不命中路由）；新增不传主键、响应 data 即雪花 id；提交用 id、审批用 dataId

## 注意点
- 写 E2E 前先读 api-map.md「0 通用约定」「数据准备链路」「可用基础数据」「各模块最小新增请求体」四节，造数优先走 H5 接口
- StdEvalGradeChangeSaveDto.changeReason 注释要求必填但无校验注解，按必填传值别指望后端拦截
- Nacos context-path 与网关路由本地核实不了（文档 §12 共 10 条待确认），用前实测一次 GET /v2.0/evaluation/standard/page

## 验证证据
- 会话 bdc91889-bdc1-4864-8a03-4e3a6f7cceb5（基线 05caac8）产出 api-map.md，未改任何源码
- 主要不确定项：Nacos context-path 与网关路由无法本地核实；changeReason 注释必填无校验

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "std_e2e_api_map",
  "source_extraction_id": "155efbc385c642a1986bf21689227a2b",
  "version": 1,
  "memory_type": "entities"
}
-->