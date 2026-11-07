# 苏住房G 流程节点区块预览渲染守卫
苏住房G 流程定义配置弹窗中按 taskId 取活动列表的区块须在预览态加显式业务谓词，避免空区块与异常请求。
## 问题现象
- nodePanel/task.vue 预览态出现空白活动区，或不该请求时发出 /system/user/ 反查
- 渲染条件写成「有配置就显示」或直接 <div>，未纳入「是否有效节点」判断
- 取数逻辑在 mounted/watch 里无条件跑，taskId 为空时打接口拿空数据
## 解决方案
- 区块显示条件收敛为显式业务谓词（有效节点 + 有 taskId + 预览态允许展示），模板用 v-if 而非 v-show
- 取数函数开头加守卫，taskId 为空直接 return，不发 /undefined/... 请求
- 区分「数据没取到」与「本不该显示」：有请求返空＝数据层问题，地址含 undefined＝id 未就绪，无请求＝条件不成立
## 涉及与来源
- 涉及文件：nodePanel/task.vue、tool/definition/detail.vue
- 所属项目：苏住房G；来源会话：24929f7a-3693-4ae6-b04b-d0abf802ee41；代码基线：cb37a39
- 本条目为归纳性模式，引用前请核对代码

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_task_preview",
  "source_extraction_id": "d4f9217e4b834d00b440bed176913edd",
  "version": 1,
  "memory_type": "entities"
}
-->
