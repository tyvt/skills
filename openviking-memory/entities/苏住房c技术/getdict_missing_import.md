# 注销页字典列表空且静默：getDict 未导入
苏住房C 小程序注销页因未导入 getDict 导致注销原因选项全空且无报错，需作为固定排查项。

## 问题现象
- 我的-账号安全-注销页 pages_my/setting/cancellationReason.vue 只显示标题和提交按钮，单选无选项
- 页面不白屏、无明显报错，易被误判为「后端字典没配数据」

## 根因
- initDict() 调用 getDict('cancel_reason')，但文件顶部从未 import getDict
- onShow 抛 ReferenceError: getDict is not defined，异常在赋值前被吞，cancelReasonList 恒为空，ZsRadio 无渲染

## 解决方案
- 先查 script 顶部是否 import { getDict } from '@/api/common'（本项目字典统一从此走）
- 界面与「字典未配置」相同时，判定顺序：先证前端是否发请求→再查后端字典类型数据
- 字典驱动下拉/单选建议列表为空时打可控日志，区分「接口没发」与「发了没数据」

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话 1a7c73a2（基线 0011377）：用户反馈注销原因不显示，补 import 修复
- 涉及文件：src/pages_my/setting/cancellationReason.vue、src/api/common.js、src/components/ZsRadio/ZsRadio.vue
- 所属项目：苏住房C；来源会话ID：1a7c73a2-9bb1-429e-a2b6-09950e71add3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "getdict_missing_import",
  "source_extraction_id": "c383dd4637e24cfe83f7be5dd47bdfb2",
  "version": 1,
  "memory_type": "entities"
}
-->