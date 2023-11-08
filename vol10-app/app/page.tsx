import Image from "next/image";
import Link from "next/link";
import { getUser } from "./_lib/clerk";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="m-4">
      <div>
        <p className="mt-4 text-2xl font-semibold">
          こんにちは！{" "}
          {user ? (
            <Link
              href="/account"
              className="text-orange-400 hover:border-b-2 hover:border-b-orange-400 "
            >
              {user?.firstName}
              {user?.lastName}
            </Link>
          ) : (
            <span className="text-orange-400">ゲスト</span>
          )}
          さん
        </p>
      </div>
      {!user && (
        <div className="my-6">
          <Link
            href="/sign-in"
            className="rounded bg-blue-500 p-3 text-white hover:bg-blue-400"
          >
            サインイン
          </Link>
        </div>
      )}
      {user && user.profileImageUrl && (
        <Image
          src={user.profileImageUrl}
          width={100}
          height={100}
          alt="プロフィール画像"
          className="my-4"
        />
      )}
    </div>
  );
}