# 小程序 WXSS 不支持通配选择器
苏住房C小程序编译报 WXSS error at token `*`，根因是微信不支持 `> *` 通配子选择器，需写具体类名撑满宽度。

## 现象与根因
- 微信开发者工具编译报 [WXSS 文件编译错误]，定位 app.wxss 与 pages_owner/elevator/add.wxss 某行 token `*`（lib 3.7.12）
- 小程序 WXSS 不支持 `> *` 通配子选择器（同类还有 min()/max()/clamp()），解析到 `*` 直接报错，报错行号指向生成后 wxss 易误判
- 「撑满不生效」非宽度问题：uni-app 的 picker/easyinput 有内部节点，外层 width:100% 到不了真正输入节点

## 正确做法
- 不追求通配，在全局 uni.scss 用具体类名开白名单：.zs-picker-root、.uni-easyinput 等逐类设置 width:100%
- 删掉 styles/form2.scss 与 uni.scss 重复的同类规则，避免两份来源互相覆盖
- 修完删 dist/dev/mp-weixin 重新 npm run dev，微信开发者工具清缓存再编译，否则旧产物继续报同一行错误
- ZsPicker 自研组件宽度问题优先在组件内部节点解决，不往全局塞通配规则

## 验证与归属
- 会话 9094fe77：用户要求 picker 表单内撑满 100% 反馈不行，贴 app.wxss(555:28) 与 add.wxss(276:45) token `*` 错误；改 uni.scss 具体类名、移除 form2.scss 重复样式、清 dist 重编译通过
- 涉及文件：uni.scss、form2.scss、ZsPicker.vue、elevator/add.vue；代码基线 5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "wxss_wildcard_error",
  "source_extraction_id": "81652a109a2b411098a21d593e97f48f",
  "version": 1,
  "memory_type": "entities"
}
-->