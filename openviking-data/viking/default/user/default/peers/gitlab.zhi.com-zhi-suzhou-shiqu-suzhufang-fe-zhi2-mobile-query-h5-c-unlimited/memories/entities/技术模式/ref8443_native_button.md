# ref8443组件改用原生button
在 zhi2-mobile-shimin（苏住房C）移动端项目中，ref8443 组件原使用 view 渲染，与参考站大量使用原生 button 不一致，导致样式差异。

## 问题根因
- 参考站大量使用原生 `button` 元素
- 本端 ref8443 组件使用 `view` 渲染，导致与参考站样式存在差异

## 解决方案
- 将 ref8443 组件改为原生 `button` 以对齐参考站样式

## 验证与归属
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源：2026-11-06 会话，消息 [73]

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_native_button",
  "source_extraction_id": "447655ae2799493190409ea72c96068f",
  "version": 1,
  "memory_type": "entities"
}
-->