# 可搜索下拉失焦必须回全量
远端 keyWord 搜索型 el-select 失焦时必须复位并清防抖重拉全量，避免选项残缺或回显成裸编码。

## 问题现象
- 筛选项改为可搜索下拉并加 keyWord 后，用户输关键字不点选项直接失焦，下拉只剩过滤后残缺列表，界面看似选项少了
- 若输入时挂防抖请求，失焦后定时器晚一步把列表再刷成过滤结果

## 根因
- 远端搜索型 el-select 选项列表被上一次 keyWord 请求覆盖，失焦仅关浮层不自动重新取数
- 防抖定时器在失焦后仍可能执行

## 解决方案
- 在 el-select 监听 @visible-change，visible===false 时先 clearTimeout 取消未执行防抖，再调不带 keyWord 取数函数重拉全量
- 已有选中值用 sticky option 合并回列表，避免回显值不在选项显示裸编码
- 单选封装组件（如 SingleSelect）内部已有 @visible-change 做浮层同步，与 v-on="$listeners" 并存一般会一起触发，若父级监听不到需封装内显式 $emit('visible-change')
- 同一模块多个同类流程页（todo/finished/process）一起改，口径一致

## 验证与归属
- 验证证据：会话 4a5b9010 todo.vue 改可搜索下拉后用户两次补充失焦恢复全量，最终三页加 handleBusCodeSelectVisible 重置并合并 sticky option
- 涉及文件：zhi2-web-admin/src/views/flowable/todo.vue、finished.vue、process.vue、zhi2-web-admin/src/components/zs-select/SingleSelect.vue
- 所属项目：产品2.0；来源会话：4a5b9010-52ef-4ec0-87b3-3334f8586fb8；代码基线：6da8974

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remote_select_blur_reset",
  "source_extraction_id": "864f8e223f1e4bbc8b0262bd6bfcb62d",
  "version": 1,
  "memory_type": "entities"
}
-->