# uni-app自定义tab同时写v-model与@update致切tab不请求
苏找房页面切换标签时高亮变化但列表不刷新，因对自定义tab组件同时写v-model与@update:model-value导致监听被覆盖，逻辑未执行。

## 问题现象与根因
- 苏找房页切「推荐/新房/二手房」tab高亮正常，但列表数据不刷新、不发请求、控制台无报错
- 模板对ProjectTabBar同时写v-model和@update:model-value="tabChange"；uni-app中v-model编译的update:modelValue监听覆盖同名自定义监听
- 结果curTab被v-model更新（高亮切换），tabChange从不执行，$refs.paging.reload()不被调，列表接口不重发

## 解决方案
- 去掉v-model，只保留:model-value + @update:model-value="tabChange"单一数据流
- tabChange里写入新tab后在$nextTick之后调reload()，保证curIndex更新再触发分页请求
- 删掉手动this.houseList=[]，列表重置交z-paging的reload()统一负责，避免自动重置与手动清空打架闪烁
- 修完按tab核对请求：推荐listRecommend、新房pageByKeyWord、二手房houseInfoDisplayList

## 验证与归属
- Verification: session 6e707628 user reported SuZhaoFang tab switch no interface call; located Project_Suzhufang.vue line 67 had v-model; fixed by removing v-model, reload after $nextTick, remove manual clear
- Verification evidence: src=苏住房C/063.md
- Involved files: src/pages/index/components/Project_Suzhufang.vue, menu/ProjectTabBar.vue, src/pages/index/project.vue, src/components/ZsPaging/ZsPaging.vue, src/components/commonNew/tabLine.vue, src/hooks/usePaging.js, src/pages.json
- 所属项目：苏住房C；来源会话ID：6e707628-a295-466a-98ef-4fff34cf5423；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "tab_vmodel_override",
  "source_extraction_id": "0424bc6fcd5a49b3a343fdf938f08ef6",
  "version": 2,
  "memory_type": "entities"
}
-->