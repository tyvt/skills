# dialog_mixins_onclose
Vue2 弹窗组件若模板写 @close="onClose" 而公共 dialogMixins 仅暴露 close()，会报 Property or method "onClose" is not defined 警告。

## 根因
- 项目公共 dialogMixins 只导出 close()（内部重置表单+同步 visible），无 onClose 别名。
- 模板 @close="onClose" 渲染期找不到成员即告警，且关闭重置表单语义未走到 mixin 的 close()。

## 修复做法
- 在本组件补转发方法 onClose() { this.close() }，与 depositNotice 的 AddDialog 写法一致。
- 不要改成 @close="close" 绕过告警，也不要自己写 visible=false 绕过 mixin。

## 验证与归属
- 验证：会话 0462a732 粘贴 Vue warn 栈指向 guaranteeDeposit/components/AddDialog.vue；结论补上 onClose() { this.close() }。
- 涉及文件：src/views/maintenance/guaranteeDeposit/components/AddDialog.vue、components/index.vue、src/mixins/dialogMixins.js
- 所属项目：产品2.0；来源会话：0462a732-b177-45a1-9056-c252739c0ac9；代码基线：effe72a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_mixins_onclose",
  "source_extraction_id": "1ce6084d6ca64635b40c426f08a19a89",
  "version": 1,
  "memory_type": "entities"
}
-->