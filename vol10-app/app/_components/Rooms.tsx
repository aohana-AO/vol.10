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
    <div className="flex flex-wrap justify-centers px-4 py-7 w-full">
      {rooms.map((room) => (
        <Link
          href={`/room/${room.id}`}
          className="flex h-full mb-9 mr-5 ml-5 flex-col justify-between rounded-3xl border text-left shadow hover:bg-gray-100 "
          key={room.id}
        >
          <div className="h-300 w-400 ">
            <div className="flex rounded-t-3xl bg-blue-200">
              <p className="mr-2 text-sm font-semibold text-blue-500 md:text-base p-4">
                {room.name}
              </p>
              <JumpIcon />
            </div>
            <main className="flex justify-center items-center">
              <iframe
                id="Chatroom"
                title="Chatroom"
                width="400"
                height="300"
                src={`http://localhost:3000/room/${room.id}`}
                className="rounded-b-3xl"
              ></iframe>
            </main>
            {/* <p className="text-sm text-gray-500 pl-4">{room.description}</p> */}
            {/* <ChatsNum id={room.id} /> */}
          </div>
        </Link>
      ))}
    </div>
  );
}
