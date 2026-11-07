# 响应拦截器依x-encrypt头自动解密
`src/utils/request.js`响应拦截器在`x-encrypt`为`"true"`时，RSA解密`res.data.key`获AES密钥，AES-CBC零IV解密`res.data.data`并写回`res.data`。

## 工作机制
- 响应拦截器检测响应头`x-encrypt`是否为`"true"`
- 若为true：RSA解密`res.data.key`获得AES密钥，再用AES-CBC零IV解密`res.data.data`，将解密结果写回`res.data`
- 依赖经`public/assets/js/jsencrypt.min.js`与`vite.config.js`全局映射`JSEncrypt`引入；因当前环境`npm install`异常，采用与`crypto-js`相同的外部脚本方式（参考根目录`index.js`实现）

## 涉及文件
- 核心文件：zhi2-web-admin/src/utils/request.js、zhi2-web-admin/src/api/index.js、zhi2-web-admin/vite.config.js、zhi2-web-admin/index.html、zhi2-web-admin/package.json
- 依赖脚本：public/assets/js/jsencrypt.min.js

## 验证与归属
- 验证证据：extracted source=cursor
- 所属项目：宜兴公共收益；代码基线：none；来源会话：1be0669b-af87-48b5-b7d1-43a62062a380

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "response_auto_decrypt",
  "source_extraction_id": "033c4384d3a244c9b904b7072ccc1be0",
  "version": 2,
  "memory_type": "entities"
}
-->