# モーダルの実装方針

## 概要

本ドキュメントでは、UI コンポーネントとしての **Modal（モーダル）** を実装する際の設計方針を定義する。  
目的は、機能要件・VRT（Visual Regression Test）安定性・責務分離・拡張性のバランスを取った実装を行うことである。


## 実装方針の全体像

### 目的
- Modal の UI 構造と振る舞い（アニメーション、Portal 管理、Overlay 制御）を **段階的に分離** し、責務を明確化する。
- **VRT（ビジュアルリグレッションテスト）を安定させる** ために描画構造を制御可能にする。
- 拡張（アニメーションやフォーカス制御）を導入しても API 破壊が起きないようにする。

## 設計意図

### 表示制御と存在制御を分離する
通常、モーダルには「表示・非表示（UI 状態）」と「マウント・アンマウント（DOM 存在）」の 2 つの軸がある。  
アニメーションがない場合は両者を一致させてよいが、**アニメーションを導入すると「非表示中も DOM を残す」必要がある**。  
そのため、`open` props を導入する起点は **アニメーションが必要になったとき** である。
現在はモーダルにアニメーションがないため`open` props を導入する必要はない。
（仮に導入するとしてもPortalとModalコンポーネントに間にアニメーションを提供するWrapperComponentが入る想定）

> **設計判断基準**  
> - アニメーションなし → 親側で `isShow && <ModalSurface />`（アンマウント制御）  
> - アニメーションあり → `open` props を持たせ、内部で状態を保持（表示制御）

---

### Overlay・Portal を Modal から分離する
VRT を安定させるため、モーダルコンポーネントには Portal や Overlay を含めない構造にする。  
Portal 配下にある要素は Storybook の DOM 階層が変わり、スクリーンショット差分が出やすいためである。  

> **設計意図**  
> - VRT での差分は「見た目の構造」だけを対象にしたい。  
> - Overlay や半透明レイヤはピクセル差分を生みやすいため除外。  
> - 責務を明確化し、Portal やアニメーションの影響を UI 層から切り離す。

---

### stopPropagation を不要にする DOM 構造
Overlay クリックでモーダルを閉じる設計の場合でも、  
`stopPropagation()` を使うのはあくまで「親子構造時の副作用回避」である。  

以下のように並列構造にすることで、イベント伝搬自体を発生させず、**stopPropagation を不要化** する。

```jsx
<>
  <Overlay onClick={onClose} />
  <ModalSurface>...</ModalSurface>
</>
```


## 基本構成

モーダルの実装は、以下の3つのコンポーネントを組み合わせて構築されています：

1. `Portal`: DOM要素の配置を制御
2. `Overlay`: モーダルの背景オーバーレイ
3. `Modal`: モーダルのUIコンポーネント

## アーキテクチャ

### レイヤー構造

```
Portal.ModalContainer
├── Modal（z-index: 300）
│   ├── Modal.CloseButton
│   ├── Modal.Header
│   ├── Modal.Body
│   ├── Modal.Divider
│   └── Modal.Footer
└── Overlay（z-index: 200）
```

### コンポーネントの役割

#### Portal

- モーダルとオーバーレイを適切なDOM階層にレンダリング
- Compound Componentsパターンを採用
  - `Portal.ModalContainer`: モーダル用のコンテナ
  - `Portal.ToastContainer`: トースト用のコンテナ
  - `Portal.TooltipContainer`: ツールチップ用のコンテナ

#### Modal

- モーダルのUIコンポーネント
- Compound Componentsパターンを採用
  - `Modal.CloseButton`: 閉じるボタン
  - `Modal.Header`: ヘッダー部分
  - `Modal.Body`: コンテンツ部分
  - `Modal.Divider`: 区切り線
  - `Modal.Footer`: フッター部分

#### Overlay

- モーダルの背景を提供
- クリックイベントのハンドリング
- 背景の透過度設定が可能

## 実装例

### 基本的な実装

\`\`\`tsx
export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>モーダルを開く</button>
      
      {isOpen && (
        <Portal.ModalContainer>
          <Modal>
            <Modal.CloseButton onClick={handleClose} />
            <Modal.Header>
              <Text fontSize="20" fontWeight="bold">
                モーダルタイトル
              </Text>
            </Modal.Header>
            <Modal.Body>
              モーダルの内容
            </Modal.Body>
            <Modal.Divider />
            <Modal.Footer>
              <ActionPanel>
                <ActionPanel.Center style={{ display: "flex", gap: "8px" }}>
                  <button onClick={handleClose}>キャンセル</button>
                  <button onClick={handleClose}>保存</button>
                </ActionPanel.Center>
              </ActionPanel>
            </Modal.Footer>
          </Modal>
          <Overlay onClick={handleClose} />
        </Portal.ModalContainer>
      )}
    </>
  );
};
\`\`\`

## ベストプラクティス

### 1. モーダルの状態管理

- Reactの`useState`を使用してモーダルの表示/非表示を制御
- モーダルを開く/閉じる関数は明確な命名を使用（例：`handleOpen`/`handleClose`）

### 2. アクセシビリティ

- 閉じるボタンを必ず配置
- キーボード操作のサポート（ESCキーでの閉じるなど）
- 適切なARIAラベルの使用

### 3. レイアウト

- `ActionPanel`を使用してフッターのボタンを整列
- ヘッダーには適切な見出しレベルを使用
- コンテンツの余白は一貫性を保持

### 4. インタラクション

- オーバーレイクリックでモーダルを閉じる
- 閉じるアクションは複数の方法を提供（閉じるボタン、オーバーレイクリック）
- アクションボタンは意図が明確な配置と表示

## 注意点

1. z-indexの管理
   - モーダル: 300
   - オーバーレイ: 200
   - 適切なレイヤー順を維持

2. パフォーマンス
   - モーダルが閉じているときはコンポーネントをアンマウント
   - 不要なレンダリングを防ぐ

3. コンポーネントの分離
   - ロジックとUIを適切に分離
   - 再利用可能なコンポーネントとして設計

## 拡張性

- Drawer対応の予定あり
- Toastの表示位置指定機能の追加予定
- Tooltipの表示位置指定機能の追加予定

これらの拡張は、現在のアーキテクチャを維持しながら、新しい機能を追加する形で実装予定。
