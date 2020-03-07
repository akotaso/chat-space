<img width="1429" alt="chat-space01" src="https://user-images.githubusercontent.com/59213808/76144183-3ad1bd00-60c1-11ea-84ad-b48efb0932ba.png">

# Chat-Space
グループチャットアプリケーション

# 機能
* 非同期通信
* 自動更新
* インクリメンタルサーチ機能

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false|
|password|string|null: false|

 add_index :users, :username

## Association
- has_many :messages
- has_many :groups, through: :group_users
- has_many :group_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
## Association
- has_many :messages
- has_many :users, through: :group_users
- has_many :group_users

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

## Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

## Association
- belongs_to :user
- belongs_to :group
