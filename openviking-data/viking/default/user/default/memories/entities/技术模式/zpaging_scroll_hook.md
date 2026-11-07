# z-paging 页面滚动模式显式注册钩子
z-paging 页面滚动模式必须显式注册 useZPaging 钩子才继续加载，且其为默认导出，命名导入致 H5 构建失败。

## 现象
- 历史上拉加载不追加：首屏 10 条之后不再触发下一页。
- 改成 import { useZPaging } 后 H5 端直接构建失败。

## 根因
- 页面滚动模式不会自动接管分页，必须显式注册 useZPaging 钩子把滚动事件转成分页请求，否则只走首屏一页。
- fixed 模式由组件自己滚动不暴露此问题，两模式触发机制不同。
- useZPaging 是默认导出，命名导入拿不到定义，构建阶段失败（小程序可能不报错，H5 才炸）。

## 解决方案
- 页面滚动模式显式注册 useZPaging，接上查询/加载回调。
- 导入写 import useZPaging from 'z-paging'（默认导入），不要加花括号。
- 排查「列表只加载一次」先确认是否为页面滚动模式而非 fixed 模式。
- 注册后必须验证第二页真追加进列表，而非只看首屏渲染。
- 双端（H5 + 微信小程序）都跑一遍，两端模块导出形态与构建链不同。

## 关联信息
- 涉及文件：src/pages/history/index.vue。
- 验证：单元测试 4 文件 18 项通过、typecheck 通过、H5 端到端 7 项全通过、build:h5 与 build:mp-weixin 均通过。
- 所属项目：uni-app 双端交付；来源会话：5ff6b6db-7cd5-4fef-9b29-75110106902c；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zpaging_scroll_hook",
  "source_extraction_id": "cdf303e2f7c24a1c81233edc438de6ce",
  "version": 1,
  "memory_type": "entities"
}
-->