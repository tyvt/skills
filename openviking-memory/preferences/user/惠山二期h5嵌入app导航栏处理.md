- H5 嵌入 App 时须隐藏 uni 系统导航栏：`pages.json` 的 `globalStyle` 中以 `// #ifdef H5` 条件编译设置 `navigationStyle: "custom"`，微信小程序保留系统导航栏，本地 H5 无 `uni-page-head` DOM。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "惠山二期H5嵌入App导航栏处理",
  "source_extraction_id": "a19c7dd9788e46288fc68265c7b9e7f1",
  "version": 1,
  "memory_type": "preferences"
}
-->