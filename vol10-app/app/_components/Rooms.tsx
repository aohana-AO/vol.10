import { prisma } from "../_lib/prisma";
import Link from "next/link";
import ChatsNum from "./ChatsNum";
import { JumpIcon } from "./ui/Icon";
import Image from "next/image";

export default async function Rooms() {
  const rooms = await prisma.room.findMany(); //Roomテーブルから全てのルームを取得
  if (!rooms || rooms.length === 0)
    return <div className="my-14">sorry... 参加可能なルームはありません🥹</div>;

  return (
    <div className="flex flex-wrap justify-around px-4 py-7">
      {rooms.map((room) => (
        <Link
          href={`/room/${room.id}`}
          className="flex h-full flex-col justify-between rounded-3xl border text-left shadow hover:bg-gray-100 "
          key={room.id}
        >
          <div className="h-100 w-50 ">
            <div className="flex rounded-t-3xl bg-green-200" >
              <p className="mr-2 text-sm font-semibold text-blue-500 md:text-base p-4">
                {room.name}
              </p>
              <JumpIcon />
            </div>
            <main className="flex justify-center items-center">
             <iframe
              id="Chatroom"
              title="Chatroom"
              width="200"
              height="100"
              src="">
            </iframe>
            </main>
            {/* <p className="text-sm text-gray-500 pl-4">{room.description}</p> */}
            {/* <ChatsNum id={room.id} /> */}
          </div>
        </Link>
      ))}
    </div>
  );
}
