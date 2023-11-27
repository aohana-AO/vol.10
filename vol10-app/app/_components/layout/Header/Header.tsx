import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import LinkList from "./LinkList";
import Sidebar from "../Sidebar/Sidebar"
export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-slate-800 fixed top-0 left-0 right-0">
            <nav className="flex justify-between p-2">
                <div className="flex">
                <Sidebar />
                    <Link href={"/"} className="p-2 text-sm font-semibold md:text-2xl text-green-300">
                        💻 3AI寄れば文殊の知恵
                    </Link>
                    <LinkList />
                </div>
                <SignedIn>
                    <UserButton
                        afterSignOutUrl="/"
                    />
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <button className="rounded bg-blue-500 px-2 text-white hover:bg-blue-400">
                            サインイン
                        </button>
                    </SignInButton>
                </SignedOut>
            </nav>
        </header>
    );
}