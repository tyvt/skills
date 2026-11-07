# Snowflake ID precision loss in JS Number
19-digit database snowflake IDs exceed JavaScript Number.MAX_SAFE_INTEGER (2^53), so converting them with Number() corrupts the trailing digits and breaks backend lookups.

## Problem
- Converting a 19-digit id like `2117093674846941186` via Number() yields a rounded value (e.g. ...186 to ...200), so the backend reports the record as not found ("预警不存在")
- Two distinct templateItemIds can collapse to the same corrupted Number, producing duplicate items in the payload

## Fix
- Send all Long/snowflake IDs as strings in JSON; do NOT wrap them with Number() in the store or request layer
- Spring/Jackson coerces JSON strings to Long fields, so string IDs are accepted by the backend without change

## Verification
- After switching flood store payloads to String IDs, save and submit returned code=200 and detail echoed fill values correctly through the nginx proxy

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "snowflake_id_precision_loss",
  "source_extraction_id": "77c34fd9b6ca444b85d55baeb884d4f7",
  "version": 1,
  "memory_type": "entities"
}
-->