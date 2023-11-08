import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const getChatsNumByRoomId = (id: number) => {
    const count = prisma.chat.count({
        where: {
            roomId: id,
        },
    });
    return count;
};