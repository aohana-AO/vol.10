"use client";

import { createChatAction, upsertUserAction } from "@/app/_lib/action";

import { useRef, useState } from "react";

import Loading from "../../../loading";

export default function Form({
  roomId,
  uuid,
  username,
  profileImageUrl,
}: {
  roomId: number;
  uuid: string;
  username: string;
  profileImageUrl: string;
}) {
  const [ispending, setIspending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setIspending(true); // 送信ボタンを非活性にする
    setError(null);

    const message = formData.get("message");

    if (!message || typeof message !== "string") {
      setError("1文字以上の文字列を入力してください");
      setIspending(false);
      return;
    }

    // Server Actionの実行
    // PrismaのUserテーブルを更新または作成する
    const userData = await upsertUserAction(uuid, username, profileImageUrl);
    await createChatAction(roomId, userData.id, message);

    setIspending(false);
    formRef.current?.reset();
  }

  if (ispending) {
    return <Loading />;
  }

  return (
    <div className="my-10 bg-opacity-50 bg-slate-400 fixed bottom-0 mb-0 left-0 right-0 w-full">
      <form
        className="flex items-center border-t border-gray-200 p-4"
        action={handleSubmit}
        ref={formRef}
      >
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <input
          type="text"
          name="message"
          autoComplete="off"
          className="flex-grow rounded-3xl border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
          placeholder="メッセージを入力..."
        />
        <button
          type="submit"
          disabled={ispending}
          className="rounded-lg bg-green-400 hover:bg-green-300 px-2 md:px-4 py-2 text-white text-xs md:text-sm focus:border-blue-300 focus:outline-none focus:ring w-13 h-13"
        >
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
}
