import type { NextPage } from "next";
import { useState } from "react";
import { Llm, SubmitData, Character } from "../../../types/Llm";
import { useForm, SubmitHandler } from "react-hook-form";

export const CheckBox: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SubmitData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<SubmitData> = (data: SubmitData) => {
    /* API送信 */
  };
  //チェックボックスの中身
  const [Llm, setLlm] = useState<Llm[]>([
    {
      id: "ChatGPT",
      name: "ChatGPT",
      checked: false,
      disabled: false,
    },
    {
      id: "Claude2",
      name: "Claude2",
      checked: false,
      disabled: false,
    },
    {
      id: "PaLM2",
      name: "PaLM2",
      checked: false,
      disabled: false,
    },
    {
      id: "LLaMA",
      name: "LLaMA",
      checked: false,
      disabled: false,
    },
  ]);
  //チェックボックスを選択した時に表示される性格の中身
  const [Character, setCharacter] = useState<Character[]>([
    {
      id: "Character1",
      name: "Character1",
      selected: false,
    },
    {
      id: "Character2",
      name: "Character2",
      selected: false,
    },
    {
      id: "Character3",
      name: "Character3",
      selected: false,
    },
  ]);
  //チェックボックスを表示
  const handleCheckboxChange = (id: string) => {
    setLlm((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <>
      <div>
        <label htmlFor="name" className="pl-8 font-bold">
          🍊LLMを選択<span className="text-red-500">*</span>
        </label>
        <div className="pl-8 pt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              {Llm.map((item) => {
                return (
                  <div key={item.id} className="flex-col pr-6">
                    <div>
                      <input
                        id={item.id}
                        type="checkbox"
                        defaultChecked={item.checked}
                        disabled={item.disabled}
                        onChange={() => handleCheckboxChange(item.id)}
                        // {...register("Llm", {
                        //   validate: {
                        //     atLeastOneRequired: (value) =>
                        //       (value && value.length >= 1) ||
                        //       "1つ以上選択してください",
                        //   },
                        // })}
                      />
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    <div>
                      {item.checked && (
                        <>
                          <select>
                            {Character.map((item) => {
                              return (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* このボタンを押すとAPI送信になってしまう→「ルームを作る」ボタンにこれを含めたい */}
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              決定
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
