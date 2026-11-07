# 入口页init阶段报Can't find variable
苏住房C账户注销原因页因调用API封装函数未import，导致初始化中断、字典选项为空，易被误判后端问题。

## 问题现象
- 进入「账户注销→请选择注销原因」直接报错、选项为空（pages_my/setting/cancellationReason.vue）。
- Vue3 setup 未声明标识符在 onLoad/onMounted 抛 ReferenceError: Can't find variable: getDict，整段初始化中断。

## 根因
- 页面 initDict() 调用 getDict('cancel_reason') 但漏写 import { getDict } from '@/api/common'。
- 表象像后端字典 cancel_reason 没配，实际是前端缺导入。

## 解决方案
- 拿到「Can't find variable / xxx is not defined」类报错，先在该SFC搜符号是否既有声明又有使用，缺哪个补哪个，尤其 api/common 工具函数最常漏。
- 字典类下拉为空排查顺序固定：页面报错 → import 是否齐全 → 再看后端字典是否配置。
- 新增页面照抄同目录页面时，注意把被调用API函数一并拷进 import。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 8fea7fec（基线 ce9e460）cancellationReason.vue 的 initDict 调 getDict 漏 import，补 import 后修复。
- 涉及文件：d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_my\setting\cancellationReason.vue、d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_my\setting\cancellationForm.vue
- 所属项目：苏住房C；来源会话ID：8fea7fec-d5ff-49f3-8b5d-6fe42f3a7694；代码基线：ce9e460

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "init_variable_missing",
  "source_extraction_id": "2df5dc51c76245cd8e19edc921ee51af",
  "version": 1,
  "memory_type": "entities"
}
-->