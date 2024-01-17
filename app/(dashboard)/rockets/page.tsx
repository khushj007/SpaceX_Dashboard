"use client";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { fetchRockets } from "@/Redux/slices/RocketSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Extras from "@/components/Extras";
import { useEffect } from "react";

const Page = () => {
  const data = useSelector(
    (data: Record<string, any>) => data.rocketdata.rockets
  );
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  useEffect(() => {
    dispatch(fetchRockets());
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:justify-center items:start md:items-center">
      <Sidebar />
      <Extras />
      <div className="md:h-screen w-screen p-[1em] flex flex-col items-center justify-between md:w-[80%] flex-wrap">
        {data.map((value: Record<string, any>) => {
          return (
            <Card
              key={value.name}
              className="min-h-[300px] min-w-[250px] flex flex-col items-center p-1"
            >
              <CardHeader>
                <Image
                  className="rounded-full h-[100px] w-[100px]"
                  src={value.flickr_images[0]}
                  alt="photo"
                  width={100}
                  height={100}
                ></Image>
              </CardHeader>
              <CardContent className="h-[70%] flex flex-col items-center justify-between p-1 ">
                <p>Name : {value.name ?? "NA"}</p>
                <p>Weight: {value.mass.kg ?? "NA"} Kg</p>
                <p>Height : {value.height.meters ?? "NA"} meters</p>
                <Link
                  className="bg-black p-2 text-white rounded"
                  href={value.wikipedia}
                  target="_blank"
                >
                  {" "}
                  More
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
