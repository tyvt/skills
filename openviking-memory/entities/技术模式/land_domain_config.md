# 地名域名配置改为参数读取
苏州市房地产监测V3 中地名相关页面（land.do）的域名配置改为从后端参数设置读取。

## 配置要求
- 后端参数库需有 `land.domain` 配置，键值为完整根地址（如 `https://fdc.szzfcjj.cn/dmsp`），末尾斜杠自动去掉
- 缺失时页面空白并在 `placeApproval` 给出提示

## 环境差异
- 各环境原地址不同（test 为 `http://58.240.192.148:9996`），现统一由参数配置决定
- 切环境时需在对应环境后台各配一次

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 涉及文件：src/utils/placeDmsp.js、public/version.js、src/api/system/config.js
- 所属项目：苏州市房地产监测V3；来源会话：session_f915ba6c510a5289dbc91c768090573a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "land_domain_config",
  "source_extraction_id": "2c072e69afdd4a59a3e7709f2e41e121",
  "version": 1,
  "memory_type": "entities"
}
-->