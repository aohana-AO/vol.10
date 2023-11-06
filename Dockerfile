# ベースとなるイメージを指定（現在の推奨版にした）
FROM node:20.9.0-alpine
# アプリケーションのディレクトリを作成
WORKDIR /app

# gitのインストール
RUN apk add --no-cache git