import Link from "next/link";
import Image from "next/image";
import React from "react";
import logo from "@/public/spacex.png";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const data = useSelector((data: Record<string, any>) => data.user);
  return (
    <div className="border-r-2 border-gray-900 h-screen w-[20%]  md:items-center hidden  md:flex md:flex-col md:justify-evenly">
      <Image src={logo} alt="logo.png" width={500} height={500}></Image>
      <Link href={"/homepage"}>
        <h1 className="cursor-pointer text-gray-700 hover:text-gray-900">
          Launches
        </h1>
      </Link>
      <Link href={"/rockets"}>
        <h1 className="cursor-pointer text-gray-700 hover:text-gray-900">
          Rockets
        </h1>
      </Link>
      <Dialog>
        <DialogTrigger className="cursor-pointer text-gray-700 hover:text-gray-900">
          Profile
        </DialogTrigger>
        <DialogContent className="h-[70%] w-full">
          <DialogHeader>
            <DialogTitle className="cursor-pointer text-gray-700 hover:text-gray-900">
              Profile Information
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center justify-start p-[1em] gap-8">
              <Image
                className="rounded-full h-[100px] w-[100px] mt-5"
                src={data.imageUrl}
                alt="profile image"
                width={500}
                height={500}
              />
              <p>FirstName : {data.fname}</p>
              <p>LastName : {data.lname}</p>
              <p>UserName : {data.username}</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <h1 className="cursor-pointer text-gray-700 hover:text-gray-900">
        <button onClick={() => signOut(() => router.push("/"))}>SignOut</button>
      </h1>
    </div>
  );
};

export default Sidebar;
