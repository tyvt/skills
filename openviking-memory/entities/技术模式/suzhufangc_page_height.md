# 苏住房C 小程序 page 高度塌陷致列表真机空白
苏住房C 市民端消息/微聊列表因给 page 设 height:100% 致高度塌陷、ZsPaging 拿不到确定高度而整页空白。

## 问题现象
- 消息/微聊列表模拟器正常、真机空白；加 page{height:100%} 与包装层后连模拟器也不显示
- 根因：微信小程序 page 设 height:100% 高度塌陷，flex:1 高度链断裂，ZsPaging 计算成 0 高不渲染

## 修复做法
- 撤掉 page{height:100%}/overflow:hidden 与包装层，还原原页面结构
- 改用 height: calc(100vh - var(--nav-height))，index.vue 注入 --nav-height = 状态栏高度 + 44px
- ZsPaging 外包 .paging-host 并写 :deep(.zs-paging){height:100%} 让内部滚动区继承确定高度

## 验证与归属
- 改完必须 build:suzhufang:mp-weixin 后真机验证，区分「空白/只显示顶部/显示暂无数据」三种现象
- 所属项目：苏住房C；来源会话：86040ce3-4045-4591-bad4-02ee7724cc1b；代码基线：b7bf813
- 涉及文件：src/pages_main/message/index.vue、message.vue、chitchat.vue、src/pages/message/index.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufangc_page_height",
  "source_extraction_id": "a59756a24d99485f998a670e9881d6cd",
  "version": 1,
  "memory_type": "entities"
}
-->