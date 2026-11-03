# 苏住房C真机白屏因ZsPicker取ctx.$attrs未定义
苏住房C市民端memberForm页在微信真机整页白屏而模拟器正常，根因是公共组件ZsPicker初始化阶段执行了未使用的getCurrentInstance().ctx.$attrs，真机ctx为undefined抛错。

## 问题现象
- 苏住房C市民端zhi2-mobile-shimin的pages_owner_extra/family/memberForm页在微信真机整页白屏，微信开发者工具模拟器正常
- 同目录family/index列表页正常打开，说明仅用了特定公共组件的页面崩
- 真机调试Console可见组件setup抛错，模拟器因环境宽松不报错致开发期不暴露

## 根因
- memberForm用了两个ZsPicker，其内部有未使用却在初始化执行的`const attrs = ref(getCurrentInstance().ctx.$attrs)`
- 真机微信小程序运行时getCurrentInstance().ctx常为undefined，取.$attrs抛错致组件setup崩溃连带整页白屏
- 列表页未用ZsPicker故不受影响，正好解释“只有一个页面白”

## 解决方案
- 先按公共组件引用做差集缩小范围，别先怀疑页面自身逻辑
- 到公共组件内部查初始化期会执行的getCurrentInstance/ctx/proxy取值，此类防御性缺失真机必炸
- 直接删掉纯未使用的getCurrentInstance调用，而非加?.兜住；弹层ref改ref(null)
- 页面跳转改绝对路径/pages_owner_extra/family/memberForm，避免相对路径问题
- 验收必须真机复跑，模拟器通过不算通过

## 验证与归属
- 验证：会话82516bfa用户连报三次真机member/add等页面空白，定位ZsPicker未使用ctx.$attrs行，删除+ref(null)+绝对路径后恢复
- 涉及文件：src/components/ZsPicker/ZsPicker.vue、src/pages_owner/family/index.vue、src/pages_owner_extra/family/memberForm.vue
- 所属项目：苏住房C；来源会话ID：82516bfa-31ef-44c0-9835-1b565029f672；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zs_picker_ctx_bug",
  "source_extraction_id": "c55f157f273a42cf88ad1d855a226491",
  "version": 1,
  "memory_type": "entities"
}
-->