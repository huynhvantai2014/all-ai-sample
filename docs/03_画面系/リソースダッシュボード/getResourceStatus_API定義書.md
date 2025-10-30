# API定義書（IPA標準）

API名: getResourceStatus
API ID: API_RESOURCE_STATUS_001
エンドポイント: /api/resource/status
HTTPメソッド: GET
関連画面: リソースダッシュボード

## 1. 機能概要
部門ごとのリソース状況（稼働率、空き状況、プロジェクト参加状況）をダッシュボード表示用のデータとして取得する。

## 2. 入力パラメータ

| パラメータ名 | 必須 | データ型 | 桁数 | 説明 | 備考 |
|--------------|------|----------|------|------|------|
| department | △ | string | 50 | 部署名 | 全部署の場合は指定なし |
| period | △ | string | 20 | 期間 | monthly/weekly/daily |
| date_from | △ | string | - | 開始日 | YYYY-MM-DD形式 |
| date_to | △ | string | - | 終了日 | YYYY-MM-DD形式 |

## 3. 出力パラメータ

| フィールド名 | データ型 | 桁数 | 説明 | 備考 |
|--------------|----------|------|------|------|
| success | boolean | - | 処理成功フラグ | true/false |
| summary | object | - | 全体サマリー | - |
| summary.total_employees | number | - | 総社員数 | - |
| summary.active_employees | number | - | 稼働中社員数 | - |
| summary.available_employees | number | - | 空き社員数 | - |
| summary.utilization_rate | number | - | 稼働率（%） | - |
| departments | array | - | 部門別データ | - |
| departments[].department_name | string | 50 | 部門名 | - |
| departments[].total_count | number | - | 部門総員数 | - |
| departments[].active_count | number | - | 稼働中人数 | - |
| departments[].available_count | number | - | 空き人数 | - |
| departments[].utilization_rate | number | - | 部門稼働率（%） | - |
| projects | array | - | プロジェクト参加状況 | - |
| projects[].project_name | string | 100 | プロジェクト名 | - |
| projects[].member_count | number | - | 参加人数 | - |
| updated_at | string | - | データ更新日時 | ISO8601形式 |

## 4. エラーコード・メッセージ

| エラーコード | メッセージ | 発生条件 |
|--------------|------------|----------|
| E601 | データ取得失敗 | DB接続エラー等 |
| E602 | 不正なパラメータ | 日付形式エラー等 |
| E603 | 権限不足 | アクセス権限なし |
| E999 | システムエラー | 予期しないエラー |

## 5. 処理フロー
1. 入力パラメータ検証
2. 権限チェック
3. リソース状況データ取得
4. 稼働率計算
5. データ整形・返却

## 6. セキュリティ・その他
- 全権限でアクセス可能
- キャッシュ機能（5分間）
- リアルタイム更新対応

## 7. テストケース
- 正常ケース: 各種条件での状況取得
- 異常ケース: 不正な日付、権限なし

## 8. 備考
- AIによるリソース配分最適化提案機能付き（最大30%創造性）