# ZsButton未声明disabled致点击穿透
在苏住房C小程序中，ZsButton组件未声明disabled prop也未透传到原生button，导致须知页倒计时期间按钮灰显却可点击跳转。
## 根因
- AgreementPage传`:disabled="isCounting"`，但ZsButton未声明该prop，属性被当普通attr丢弃，仅视觉禁用态生效
- 自研按钮组件缺少禁用契约，同类loading期间不禁用的隐患
## 解决方案
- ZsButton补齐disabled prop并绑定原生button的disabled，loading=true也视为禁用
- AgreementPage点击处理加`if (isCounting) return`第二道守卫
- 今后凡靠倒计时/状态锁按钮，先确认组件真声明并下发disabled
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话c9900767，needToKnow满5秒前可点；修复为ZsButton增disabled+AgreementPage判断isCounting
- 涉及文件：ZsButton.vue、AgreementPage.vue、needToKnow.vue、useCountDown.js
- 所属项目：苏住房C；来源会话ID：c9900767-72b2-4323-9462-1cd68d147b99；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsbutton_disabled_missing",
  "source_extraction_id": "b9d8b7ebce554cb182f77784992bd5df",
  "version": 1,
  "memory_type": "entities"
}
-->