- 禁止通过 this.xxx 或 $xxx 调用挂在 Vue 原型上的方法，避免隐式全局依赖，跨模块复用与静态检查不友好。
- 凡是可抽成公共方法的逻辑，一律用显式 import 引入函数再调用，不通过 this 或 $ 前缀访问原型方法。
- 抽公共方法时，将调用方需要差异化的部分（如服务名）做成入参。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue 公共方法调用方式",
  "source_extraction_id": "bac00bb0f43c43b58b0b15478530d125",
  "version": 1,
  "memory_type": "preferences"
}
-->