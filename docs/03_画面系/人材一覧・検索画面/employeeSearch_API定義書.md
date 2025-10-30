# API定義書（IPA標準）

API名: employeeSearch
API ID: API_EMPLOYEE_SEARCH_001
エンドポイント: /api/employee/search
HTTPメソッド: GET
関連画面: 人材一覧・検索画面

## 1. 機能概要
社員情報を検索・一覧表示する。キーワード、部署、状態による絞り込み検索が可能。

## 2. 入力パラメータ

| パラメータ名 | 必須 | データ型 | 桁数 | 説明 | 備考 |
|--------------|------|----------|------|------|------|
| keyword | △ | string | 100 | 検索キーワード | 氏名・メールアドレス等 |
| department | △ | string | 50 | 部署名 | - |
| status | △ | string | 20 | 社員状態 | active/inactive/pending |
| page | △ | number | - | ページ番号 | デフォルト1 |
| limit | △ | number | - | 1ページあたりの件数 | デフォルト20、最大100 |
| sort | △ | string | 50 | ソート条件 | created_at_desc等 |

## 3. 出力パラメータ

| フィールド名 | データ型 | 桁数 | 説明 | 備考 |
|--------------|----------|------|------|------|
| success | boolean | - | 処理成功フラグ | true/false |
| total | number | - | 総件数 | - |
| page | number | - | 現在ページ | - |
| limit | number | - | 1ページあたりの件数 | - |
| employees | array | - | 社員情報リスト | - |
| employees[].employee_id | string | 20 | 社員ID | - |
| employees[].full_name | string | 100 | 氏名 | - |
| employees[].email | string | 255 | メールアドレス | - |
| employees[].department | string | 50 | 部署 | - |
| employees[].status | string | 20 | 状態 | - |
| employees[].created_at | string | - | 登録日時 | ISO8601形式 |

## 4. エラーコード・メッセージ

| エラーコード | メッセージ | 発生条件 |
|--------------|------------|----------|
| E201 | データ取得失敗 | DB接続エラー等 |
| E202 | 不正なパラメータ | パラメータ形式エラー |
| E203 | 権限不足 | アクセス権限なし |
| E999 | システムエラー | 予期しないエラー |

## 5. 処理フロー
1. 入力パラメータ検証
2. 権限チェック
3. 検索条件組み立て
4. DB検索実行
5. 結果整形・返却

## 6. セキュリティ・その他
- 権限に応じた表示項目制御
- SQLインジェクション対策
- ページング処理による大量データ対応

## 7. テストケース
- 正常ケース: 各種検索条件での検索
- 異常ケース: 不正なパラメータ、権限なし
- 境界値: limit上限値、大量データ

## 8. 備考
- AIによる検索条件自動最適化機能付き（最大30%創造性）