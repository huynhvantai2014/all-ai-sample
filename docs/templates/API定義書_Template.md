# API定義書（IPA標準テンプレート）

---
API ID:
API名:
エンドポイント:
メソッド:

## 1. 機能概要 (Tóm tắt chức năng)
- 

## 2. パラメータ定義 (Định nghĩa tham số)
| パラメータ名 | 種別 | 必須 | 型 | 桁数 | 説明 |
|--------------|------|------|----|------|------|
|              |      |      |    |      |      |

## 3. レスポンス定義 (Định nghĩa response)
| フィールド名 | 型 | 桁数 | 説明 |
|--------------|----|------|------|
|              |    |      |      |

## 4. エラーコード・メッセージ (Mã lỗi, message)
| コード | メッセージ | 条件 |
|--------|------------|------|
|        |            |      |


## 5. 処理フロー (Luồng xử lý API)
- 1. 入力バリデーション (Validate đầu vào):
	- Kiểm tra định dạng, bắt buộc, kiểu dữ liệu của input
- 2. 相関バリデーション (Validate tương quan/DB):
	- Kiểm tra tồn tại, trùng lặp, ràng buộc dữ liệu trong DB
- 3. 業務処理 (Xử lý nghiệp vụ):
	- Thực hiện logic nghiệp vụ chính của API
- 4. レスポンス生成 (Trả kết quả):
	- Tạo response trả về client (thành công/lỗi)

## 6. 備考 (Ghi chú)
- 

> ※ パラメータ定義: định nghĩa input (query, body, path...)
> ※ レスポンス定義: định nghĩa output (json, object...)
> ※ エラーコード: mã lỗi, message trả về
> ※ 備考: ghi chú đặc biệt nếu có
