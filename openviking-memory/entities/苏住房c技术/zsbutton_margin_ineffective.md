# 自定义组件 ZsButton 上 margin/UnoCSS 间距类不生效
苏住房C 小程序中写在 ZsButton 等自定义组件标签上的 margin（含 UnoCSS mt-80 原子类）不会作用到组件内部真实按钮节点，间距改了无效。

## 问题现象
- publishHouse/type.vue「下一步」按钮与上方提示文字的间距改了两轮都不生效，用户回「未生效」。

## 根因
- 微信小程序里写在自定义组件标签上的 margin（包括 UnoCSS 的 mt-80 这类原子类）往往不会作用到组件内部真实按钮节点——与「class 透传不到组件内部」是同一类问题。
- 普通块级布局下相邻元素的外边距折叠也会吞掉一部分间距。

## 解决方案
- 不在自定义组件标签上写 margin/间距原子类。
- 用原生 view 包一层（如 .next-step-btn），把 margin-top: 80rpx 写在包裹层的 scoped 样式里。
- 父容器显式加 flex 纵向布局（display:flex; flex-direction:column），避免外边距折叠。
- 改完必须重新编译再预览，dev 热更新对小程序不总可靠。
- 结论：间距类需求优先改「包裹层」，不要反复调组件上的工具类——这是该类「改了没效果」需求的默认第一反应。

## 验证与归属
- 验证：会话 a2751523：用户先报 type 页「下一步按钮距离上面提示文字的间距」未调整，第二次直接回「未生效」。最终结论为 ZsButton 上的 margin/UnoCSS mt-80 不作用到内部按钮，改为原生 view 包裹 .next-step-btn 设 margin-top:80rpx，并给 .publish-type-box 加 flex 纵向防外边距折叠。
- 涉及文件：src/pages_transaction/publishHouse/type.vue、src/components/ZsButton/ZsButton.vue、uno.config.ts。
- 所属项目：苏住房C；来源会话ID：a2751523-b238-42d9-b41f-5da721879c3a；代码基线：f1939b0。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsbutton_margin_ineffective",
  "source_extraction_id": "55b2f7ec05614bdf8869f3a530457f35",
  "version": 1,
  "memory_type": "entities"
}
-->