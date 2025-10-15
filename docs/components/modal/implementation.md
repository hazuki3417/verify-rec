# モーダルの実装方針

## 概要

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