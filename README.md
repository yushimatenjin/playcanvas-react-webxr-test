## リポジトリの分析

このリポジトリは、**PlayCanvas** と **React** を組み合わせた **Monorepo** 構成で構築されています。主な目的は、WebXR（VR/AR）機能を活用したインタラクティブな3Dアプリケーションを開発することです。

### プロジェクト構造

- **apps/web/app/xr/**
  - [`page.tsx`](apps/web/app/xr/page.tsx): WebXRページのメインコンポーネント。XRコントロールや3Dシーンの設定が含まれています。
  
- **packages/**
  - **materials/**
    - [`MetalMaterial.ts`](packages/materials/MetalMaterial.ts): メタルマテリアルの定義。
    
  - **scripts/**
    - [`Rotator.ts`](packages/scripts/Rotator.ts): オブジェクトを回転させるスクリプト。
    - [`Scaler.ts`](packages/scripts/Scaler.ts): オブジェクトのスケールを制御するスクリプト。

- **utils/hooks/**
  - [`useMaterial.ts`](utils/hooks/useMaterial.ts): マテリアルを管理するカスタムフック。
  - [`useEnvAtlas.ts`](utils/hooks/useEnvAtlas.ts): 環境マップを読み込むカスタムフック。


## 簡単な実行方法

以下の手順に従って、リポジトリをローカル環境でセットアップし、実行することができます。

### 前提条件

- **Node.js**（バージョン14以上）
- **pnpm**（パッケージマネージャー）

### 手順

1. **リポジトリのクローン**

   ```bash
   git clone git@github.com:yushimatenjin/playcanvas-react-webxr-test.git
   cd playcanvas-react-webxr-test
   ```

2. **依存関係のインストール**

   Monorepo構成の場合、ルートディレクトリで以下のコマンドを実行します。

   ```bash
   pnpm install
   ```

3. **開発サーバーの起動**

   ```bash
   pnpm run dev
   ```

   ブラウザが自動的に開かない場合は、[http://localhost:3000](http://localhost:3000) にアクセスしてください。

4. **WebXR機能の確認**

   開発サーバーが起動したら、アプリケーション上で **Start VR** または **Start AR** ボタンをクリックして、WebXR機能を体験できます。
