# benefit.js统一走http封装并支持options
benefit.js 模块原 import api from '@/api' 不一致，改为 import { http } from '@/http/http' 并统一函数签名支持 options 覆写。

## 修改内容
- benefit.js 原 import api from '@/api' 缺少工程入口且与其它模块不一致，改为 import { http } from '@/http/http'
- 函数签名统一为 export async function xxx(..., options = {})，调用 http.get/post 时合并 showLoading: true 与 ...options

## 解决方案目标
- 支持调用方通过 options 覆写请求配置（如 showLoading）

## 验证与归属
- 验证证据：extracted source=cursor session=cd0867d2-9384-495f-bd33-2f01b7443794
- 涉及文件：benefit.js
- 来源会话：cd0867d2-9384-495f-bd33-2f01b7443794；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_http_options",
  "source_extraction_id": "cbe7f99334114351b9d7d6c20eaddbd5",
  "version": 1,
  "memory_type": "entities"
}
-->