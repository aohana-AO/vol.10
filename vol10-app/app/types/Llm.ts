//CheckBox.tsx用の型定義ファイル
export type Llm = {
    id: string;
    name: string;
    checked: boolean;
    disabled: boolean;
  };
export type SubmitData={
    Llm: string|string[];
}   
export type Character={
    id: string;
    name: string;
    selected: boolean;
}