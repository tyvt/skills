# 惠山二期G低内存构建
惠山二期G的CI机器仅4GB内存，通过降低构建峰值内存而非加堆解决OOM，改动在vite-build.mjs与vite.config.js。
## 背景约束
- CI只有4GB内存，之前OOM时堆已顶到4096MB上限，不能靠堆调到8192解决
- 目标是在4GB机器上降低构建峰值内存
## 已做修改
- scripts/vite-build.mjs：系统内存<6GB或CI=true或LOW_MEMORY_BUILD=true→低内存模式，堆上限3840MB；本地大内存仍用8192MB
- vite.config.js低内存模式：maxParallelFileOps:1串行、test模式关JS/CSS压缩、跳过manualChunks/visualizer/SVGO、cssCodeSplit:false
## 验证归属
- 模拟CI低内存构建已通过
- 所属项目：惠山二期G；来源会话：b2d5de3f-5090-4bd2-97e9-fac732c844c4

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "惠山二期G低内存构建",
  "source_extraction_id": "4f77472383724b95a4b59f9b96533a19",
  "version": 1,
  "memory_type": "entities"
}
-->
