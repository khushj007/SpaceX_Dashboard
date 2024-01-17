import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logo from "@/public/spacex.png";
import Link from "next/link";
import Image from "next/image";
import { List } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { useSelector } from "react-redux";

const Extras = () => {
  const data = useSelector((data: Record<string, any>) => data.user);
  return (
    <div className="md:hidden mt-[1em] ml-[1em]">
      <Sheet>
        <SheetTrigger>
          <List />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="h-screen w-[100%] items-center  flex flex-col justify-evenly md:hidden">
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
              <SignOutButton>SignOut</SignOutButton>
            </h1>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Extras;
