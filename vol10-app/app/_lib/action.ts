"use server";

import { auth, clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createChat, createUser, createRooms } from "./prisma";

export async function deleteUserAction(userId: string) {
    if (!userId) return;
    await clerkClient.users.deleteUser(userId); // アカウント削除
}
export async function upsertUserAction(
    uuid: string,
    name: string,
    profileImageUrl: string
) {
    return await createUser(uuid, name, profileImageUrl);
}

export const createChatAction = async (
    roomId: number,
    userId: number,
    message: string
) => {
    await createChat(roomId, userId, message);

    // 応答メッセージを生成（ここでは簡単な例として"Hello!"という応答を使用）
    const responseMessage = "Hello!";
    // システムからの応答としてメッセージを送信
    // ここではシステムを表すユーザーIDを0とします（実際のアプリではシステムのユーザーIDに適切なものを設定する）
    await createChat(roomId, 100, responseMessage);
    await createChat(roomId, 101, responseMessage);
    await createChat(roomId, 102, responseMessage);
    await createChat(roomId, 103, responseMessage);
    // パスの再検証
    revalidatePath(`/room/${roomId}`);

};
export const createRoomAction = async (name: string, description: string) => {
    const room = await createRooms(name, description);
    return room;
};