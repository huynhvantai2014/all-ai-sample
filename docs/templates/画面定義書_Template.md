> ※ アクセス可否: ○ = được vào màn hình, để trống = không được vào
# 画面定義書（IPA標準）


画面名 (Tên màn hình): 
画面ID (Mã màn hình): 
画面物理名 (Tên vật lý màn hình): 

## 権限定義 (Phân quyền)

| 画面物理名 | 管理者 | マネージャー | 一般社員 | 観覧 | 組織 |
|------------|--------|-------------|----------|------|------|
| user_screen | ○      | ○           | ○        | ○    | (Toàn bộ, 営業部, 技術部) |

## 項目定義 (Định nghĩa item)

| 論理名 | 物理名 | 項目タイプ | 説明 | IN/OUT | 必須 | 桁数 | 正規表現 | 初期値 | 制御内容 | 備考 |
|--------|--------|----------|------|--------|------|------|--------|--------|--------|------|
| ユーザーID | user_id | text | ユーザー識別子 | IN | ○ | | | | | |
| パスワード | password | password | ログイン用パスワード | IN | ○ | | | | | |
| 氏名 | full_name | text | ユーザーの氏名 | IN | ○ | | | | | |
| メールアドレス | email | email | 連絡用メール | IN | ○ | | | | | |
| 登録日時 | created_at | datetime | 登録した日時 | OUT | | | | | | |
| 更新日時 | updated_at | datetime | 更新した日時 | OUT | | | | | | |

## イベント定義 (Event Definition)

### password onChange

### email onBlur

### user_id onBlur

## 画面遷移 (Screen Transition)

| 遷移元画面ID | 遷移元画面名 | 遷移先画面ID | 遷移先画面名 | 条件・イベント | 備考 |
|--------------|--------------|--------------|--------------|--------------|------|
| user_screen | ユーザー登録画面 | dashboard_screen | ダッシュボード | 登録成功時 |  |
| user_screen | ユーザー登録画面 | user_screen | ユーザー登録画面 | 登録失敗時（バリデーションエラー等） |  |

## アクション一覧 (Action List)

| アクション名 | 論理名 | 説明 | 条件・権限 | API名 | HTTPメソッド | 関連イベント | 備考 |
|--------------|--------|------|------------|-------|-------------|--------------|------|
| 登録         | register | 新規データ登録 | 管理者・一般 | /api/user/register | POST | 登録ボタン onClick |  |
| 編集         | edit    | 既存データ編集 | 管理者・一般 | /api/user/edit     | PUT  | 編集ボタン onClick |  |
| 削除         | delete  | データ削除     | 管理者       | /api/user/delete   | DELETE | 削除ボタン onClick |  |
| 検索         | search  | データ検索     | 全員         | /api/user/search   | GET   | 検索ボックス onSearch |  |
| ダウンロード | download| データダウンロード | 管理者・一般 | /api/user/download | GET   | ダウンロードボタン onClick |  |
| インポート   | import  | データ一括取込 | 管理者       | /api/user/import   | POST  | インポートボタン onClick |  |
| エクスポート | export  | データ一括出力 | 管理者       | /api/user/export   | GET   | エクスポートボタン onClick |  |
