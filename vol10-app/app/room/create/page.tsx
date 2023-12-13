"use client";


import { createRoomAction } from "../../_lib/action";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Llm, SubmitData, Character } from "../../types/Llm";


export default function Create() {
  const [ispending, setIspending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const llms = [
    { id: "chatgpt", name: "ChatGPT" },
    { id: "palm", name: "PaLM2" },
    { id: "llama", name: "LLaMA" },
    { id: "claude", name: "Claude2" }
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setIspending(true);
    setError(null);

    const formData = new FormData(e.target);
    const [name, description] = [
      formData.get("name"),
      formData.get("description"),
    ];

    if (
      !name ||
      typeof name !== "string" ||
      !description ||
      typeof description !== "string"
    ) {
      setError("1文字以上の文字列を入力してください");
      setIspending(false);
      return;
    }

    const llmValues = {
      chatgpt: formData.get("chatgpt") ? parseInt(formData.get("character-chatgpt")) : 0,
      palm: formData.get("palm") ? parseInt(formData.get("character-palm")) : 0,
      llama: formData.get("llama") ? parseInt(formData.get("character-llama")) : 0,
      claude: formData.get("claude") ? parseInt(formData.get("character-claude")) : 0,
    };

    const room = await createRoomAction(
      name as string,
      description as string,
      llmValues.chatgpt,
      llmValues.palm,
      llmValues.llama,
      llmValues.claude
    );
    setIspending(false);
    redirect(`/room/${room.id}`);
  }

  return (
    <div className="mx-4 my-10 flex flex-col-reverse bg-white md:flex-row">
      <form className="flex basis-1/2 flex-col gap-10" onSubmit={handleSubmit}>
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <div>
          <label htmlFor="name">
            🍊ルームの名前<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            className="w-full rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="ルーム名を入力..."
          />
        </div>
        <div>
          <label htmlFor="description">
            🍊どんなルームですか？<span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            autoComplete="off"
            className="h-40 w-full rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="ルームの説明を入力..."
          />
        </div>

        {llms.map((llm) => (
          <div key={llm.id}>
            <label htmlFor={llm.id}>{llm.name}</label>
            <input type="checkbox" id={llm.id} name={llm.id} />
            <select name={`character-${llm.id}`}>
              <option value="0">なし</option>
              <option value="1">性格1</option>
              <option value="2">性格2</option>
              <option value="3">性格3</option>
            </select>
          </div>
        ))}

        <button
          type="submit"
          disabled={ispending}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
        >
          ルームをつくる
        </button>
      </form>
    </div>
  );
}
