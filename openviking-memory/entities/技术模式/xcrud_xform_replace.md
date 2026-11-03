# 移除 xcrud 依赖本地 XForm 兼容替换
园区物管2.0 工作流设计器移除 xcrud 依赖，以本地 XForm.vue 按能力子集与同签名兼容替换。

## 背景
- Process 组件依赖第三方包 xcrud 的 x-form 渲染节点面板表单，需移除该依赖。
- 外部依赖体积/维护不可控，且项目只用到其中一小部分能力。

## 解决方案
- 新增本地兼容组件 src/components/Process/common/XForm.vue，只实现实际用到能力子集：input/select/radio/switch/datePicker/slot/tabs(表格行增删改)/operate，dic 同时兼容数组和 {data,label,value}。
- 保持 v-model 与 this.$refs.xForm.validate() 对外调用签名完全一致，现有页面零改动。
- mixinXcrud.js / mixinPanel.js 里动态 import('xcrud') 改为静态 import 本地 XForm；package.json 删依赖后 npm install 同步 lock。

## 验收与套路
- 验收：全局检索无 xcrud 残留引用 + ESLint，人工回归监听器参数表格增删校验、多实例配置按钮、节点面板字段联动。
- 套路：移除低频小众依赖时，先枚举实际用到能力面，再写签名兼容本地替代组件，调用侧不动。

## 关联信息
- 涉及文件：src/components/Process/common/XForm.vue、mixinXcrud.js、mixinPanel.js、package.json。
- 所属项目：园区物管2.0；来源会话：29ff46d9-0d81-4017-a199-d9ef206501c7；代码基线：4b38cdd27。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "xcrud_xform_replace",
  "source_extraction_id": "5219c7a7105248f8b4405359a4b162dd",
  "version": 1,
  "memory_type": "entities"
}
-->