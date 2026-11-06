- 惠山二期H5嵌入App时通过pages.json的globalStyle中`// #ifdef H5`设置`navigationStyle: "custom"`，H5不再显示uni顶部系统标题栏；微信小程序不受影响仍用系统导航栏。
- 真机WebView若仍看到顶栏，可再加`uni-page-head`的CSS兜底。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "惠山二期H5嵌入App不显示导航栏",
  "source_extraction_id": "42e42a6c3c634f6c89552210c79fc318",
  "version": 1,
  "memory_type": "preferences"
}
-->