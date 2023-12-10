"use client";

import { createRoomAction } from "../../_lib/action";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Llm, SubmitData, Character } from "../../types/Llm";

export default function Create() {
  const [ispending, setIspending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🤨isPendingがtrueの時にローディングUIを出そうとするとredirectしなくなってしまう
  async function handleSubmit(formData: FormData) {
    setIspending(true);
    setError(null);

    const [name, description] = [
      formData.get("name"),
      formData.get("description"),
    ];

    for (const item of Llm) {
      // チェックボックスがチェックされている場合のみ値を取得
      if (item.checked) {
        const value = formData.get(item.id);
      }
    }

    if (
      !name ||
      typeof name !== "string" ||
      !description ||
      typeof description !== "string"
    ) {
      setError("");
      setIspending(false);
      return;
    }

    const room = await createRoomAction(
      name as string,
      description as string,
      Llm,
      Character
    );
    setIspending(false);
    redirect(`/room/${room.id}`);
  }

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

  //チェックボックスを表示
  const handleCheckboxChange = (id: string) => {
    setLlm((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

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

  return (
    <div className="mx-4 my-10 flex bg-white mt-12">
      <div className="border-double border-4 border-indigo-600  mt-12 rounded-lg w-[800px]">
        <form className="flex basis-1/2 flex-col gap-10" action={handleSubmit}>
          {error && (
            <div>
              <p className="text-red-500">{error}</p>
            </div>
          )}
          <div className="">
            <div className="pt-5">
              <label htmlFor="name" className="pl-8 font-bold">
                🍊ルームの名前<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="flex justify-center w-full">
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                className="w-11/12 rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring border-solid border-2 border-indigo-600"
                placeholder="メッセージを入力..."
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="pl-8 font-bold">
              🍊どんなルームですか？<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center w-full">
              <textarea
                id="description"
                name="description"
                autoComplete="off"
                className="h-40 w-11/12 rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring border-solid border-2 border-indigo-600"
                placeholder="メッセージを入力..."
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="pl-8 font-bold">
              🍊LLMを選択<span className="text-red-500">*</span>
            </label>
            <div className="pl-8 pt-4">
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
            </div>
          </div>
          {/* <CheckBox /> */}
          <div className="pb-4 mx-auto">
            <button
              type="submit"
              disabled={ispending}
              className="rounded-full w-[150px] bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
            >
              ルームをつくる
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
