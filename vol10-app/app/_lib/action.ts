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
    revalidatePath(`/room/${roomId}`);
};
export const createRoomAction = async (name: string, description: string) => {
    const room = await createRooms(name, description);
    return room;
};