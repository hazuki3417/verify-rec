# props/配下のコンポーネントドキュメント

## 概要
`props/`ディレクトリは、コンポーネントの共通プロパティと、それらを処理するためのユーティリティ関数を提供します。このディレクトリは、UIコンポーネントの一貫性とコード再利用性を高めることを目的としています。

## コンポーネント類の使い方

### 1. 基本的なプロパティタイプ

```typescript
// 色に関するプロパティ
import { type Color, type MainColor, type BaseColor } from './props/color';

// サイズに関するプロパティ
import { type Size } from './props/size';

// バリアントに関するプロパティ
import { type Variant } from './props/variant';
```

これらのタイプは以下のように使用します：

```typescript
interface MyComponentProps {
  color?: Color;
  size?: Size;
  variant?: Variant;
}
```

### 2. プロパティの変換
```typescript
import { transform } from './props';

// コンポーネント内での使用例
const MyComponent = (props) => {
  const styled = transform.props.toStyled({
    variant,
    error,
    // その他のプロパティ
  });
  return <StyledComponent {...styled} />;
};
```

## 作成意図

1. **一貫性の確保**
   - UIコンポーネント全体で統一された見た目と挙動を維持
   - プロパティの型安全性を確保
   - テーマシステムとの密接な統合

2. **再利用性の向上**
   - 共通のプロパティ定義を一元管理
   - スタイリングロジックの重複を防止
   - メンテナンス性の向上

3. **拡張性の確保**
   - 新しいバリアントやスタイルの追加が容易
   - テーマの変更に対して柔軟に対応可能

## 関数の設計思想

### resolve系関数の設計思想
resolve系の関数は、プロパティ値からスタイルを解決する過程で柔軟な処理を可能にするために、意図的に疎結合な設計を採用しています。この設計により、以下のような利点があります：

1. **条件分岐の柔軟な挿入**
   - プロパティ値に基づく複雑な分岐ロジックの実装が可能
   - コンポーネント固有の要件に応じたスタイル解決ロジックの実装
   - 外部の状態やコンテキストに基づくスタイルの動的な調整

2. **スタイル解決プロセスのカスタマイズ**
   - 中間処理や変換ロジックの追加が容易
   - デバッグやログ記録のポイントとして活用可能
   - パフォーマンス最適化のための処理を挿入可能

### css系関数の設計思想
css系の関数は、プロパティのキー、値、初期値からスタイルまでの解決を一括して提供する、より高次な抽象化を実現しています。resolve系関数より結合度は高いものの、コンポーネント間での再利用を考慮した適度な疎結合を維持しています：

1. **統合的なスタイル解決**
   - プロパティの解決から最終的なスタイル適用までをカバー
   - 共通のスタイリングパターンを再利用可能な形で提供
   - styled-componentsとのシームレスな統合

2. **適度な抽象化レベル**
   - 一般的なユースケースに対する簡潔なAPI
   - コンポーネント間での再利用性を確保
   - カスタマイズ性と使いやすさのバランスを考慮
resolve系関数を使用して、条件に応じて異なるスタイルを適用する例：

## resolve関数の使い方

### 1. resolveSize
```typescript
import { resolveSize } from './props/size';

// 使用例
const styles = resolveSize({
  prop: 'md',  // プロパティ値
  style: {     // サイズごとのスタイルマップ
    xs: { fontSize: '12px' },
    sm: { fontSize: '14px' },
    md: { fontSize: '16px' },
    lg: { fontSize: '18px' }
  }
});
```

### 2. resolveColor
```typescript
import { resolveColor } from './props/color';

// 使用例
const color = resolveColor({
  prop: 'primary',
  value: colorValueMap
});
```

### 使用シーン
- コンポーネントのサイズバリエーション適用時
- テーマカラーの動的な適用
- 状態に応じたスタイル変更（アクティブ、無効状態など）
- レスポンシブデザインの実装

## css関数の使い方

### 1. cssSize
```typescript
import { cssSize } from './props/size';

// styled-componentsでの使用例
const StyledComponent = styled.div`
  ${cssSize({
    defaultValue: 'md',
    style: {
      xs: { padding: '4px' },
      sm: { padding: '8px' },
      md: { padding: '12px' },
      lg: { padding: '16px' }
    }
  })}
`;
```

### 2. cssVariant
```typescript
import { cssVariant } from './props/variant';

const StyledButton = styled.button`
  ${cssVariant({
    defaultValue: 'primary',
    style: {
      primary: { /* スタイル */ },
      secondary: { /* スタイル */ }
    }
  })}
`;
```

### 使用シーン

1. **コンポーネントスタイリング**
   - 基本的なスタイリングの適用
   - 条件付きスタイリング
   - レスポンシブデザインの実装

2. **スタイルの一貫性確保**
   - テーマに基づいたスタイリング
   - 共通のスタイリングパターンの適用

3. **動的スタイリング**
   - プロパティに基づくスタイル変更
   - 状態に応じたスタイル適用
   - アニメーションやトランジション

## 実装のベストプラクティス

1. **プロパティの定義**
```typescript
// コンポーネントのプロパティ定義
interface MyComponentProps {
  size?: Size;
  variant?: Variant;
  color?: Color;
  // その他のプロパティ
}
```

2. **スタイルの解決**
```typescript
const MyComponent = (props: MyComponentProps) => {
  const { size, variant, color, ...rest } = props;

  // スタイルの解決
  const resolvedStyles = {
    ...resolveSize({ prop: size, style: sizeStyles }),
    ...resolveVariant({ prop: variant, style: variantStyles }),
    ...resolveColor({ prop: color, value: colorMap })
  };

  return <StyledComponent {...resolvedStyles} {...rest} />;
};
```

3. **styled-componentsでの使用**
```typescript
const StyledComponent = styled.div<StyledProps>`
  ${cssSize({ /* 設定 */ })}
  ${cssVariant({ /* 設定 */ })}
  // その他のスタイル
`;
```

これらの関数とコンポーネントを適切に組み合わせることで、一貫性のある、メンテナンス性の高いUIコンポーネントを作成することができます。
