"use client";
import { toast } from "react-toastify";
import logo from "@/public/spacex.png";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { useEffect, useState } from "react";
import { adduser } from "@/Redux/slices/UserSlice";
import {
  fetchAllUserData,
  fetchUpCommingUserData,
} from "@/Redux/slices/DataSlice";
import Extras from "@/components/Extras";
import Dateformater from "@/helpers/Dateformater";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DatePicker from "@/components/DatePicker";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import FilterDates from "@/helpers/FilterDates";

function Page() {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [startDate, setStartdate] = useState(new Date("2006-03-24"));
  const [endDate, setEnddate] = useState<Date>(new Date("2022-12-01"));

  const { isLoaded, user } = useUser();
  const statedata: any = useSelector((data) => data);

  useEffect(() => {
    if (isLoaded) {
      const data = {
        fname: user?.firstName,
        lname: user?.lastName,
        username: user?.username,
        userid: user?.id,
        userImage: user?.imageUrl,
      };
      dispatch(adduser(data));
    }
    dispatch(fetchAllUserData());
    dispatch(fetchUpCommingUserData());
  }, [user]);

  useEffect(() => {
    const data = statedata.eventdata.all;
    setData([...data]);
  }, [statedata]);

  function setValue(value: string) {
    setStartdate(new Date("2006-03-24"));
    setEnddate(new Date("2022-12-01"));
    if (value === "upcoming") {
      const data = statedata.eventdata.upcomming;
      setData([...data]);
    } else if (value === "latest") {
      const data = statedata.eventdata.latest;
      setData([...data]);
    } else {
      const data = statedata.eventdata.all;
      setData([...data]);
    }
  }
  function searchByDate() {
    const startdate = Dateformater(startDate);
    const enddate = Dateformater(endDate);
    if (startdate > enddate) {
      toast.error(
        "Start Date is greater then End Date please provide right date"
      );
      return;
    }
    const givingdata = statedata.eventdata.all;
    const rangeData = FilterDates([...givingdata], startdate, enddate);
    setData([...rangeData]);
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-center items:start md:items-center">
      {/* left */}
      <Sidebar />
      <Extras />

      {/* right */}
      <div className="h-screen w-screen p-[1em] flex flex-col items-start justify-center md:w-[80%] ">
        {/* //launchdata */}
        <div className="flex justify-start gap-2 flex-wrap items-center">
          <Select onValueChange={setValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>
          To:
          <DatePicker setdate={setStartdate} date={startDate} />
          From :<DatePicker setdate={setEnddate} date={endDate} />
          <button
            className="bg-black text-white rounded p-1"
            onClick={searchByDate}
          >
            Search
          </button>
        </div>

        <div className="h-[70%] mt-[2em] w-full overflow-scroll">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[170px]">Rocket Name</TableHead>
                <TableHead>Flight Number</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">WebCast</TableHead>
                <TableHead className="text-right">More Info</TableHead>
              </TableRow>
            </TableHeader>
            {data.map((value) => {
              return (
                <TableBody key={value.name}>
                  <TableRow>
                    <TableCell className="font-medium">{value.name}</TableCell>
                    <TableCell>{value.flight_number}</TableCell>
                    <TableCell>{value.date_utc}</TableCell>
                    <TableCell className="text-right">
                      {value.links.webcast ? (
                        <Link href={value.links.webcast} target="_blank">
                          Link
                        </Link>
                      ) : (
                        "No Link"
                      )}
                    </TableCell>
                    {/* moreinfo */}
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger className="bg-gray-900 p-2 rounded text-white">
                          Open
                        </DialogTrigger>
                        <DialogContent className="h-[70%] w-full">
                          <DialogHeader>
                            <DialogTitle>Information</DialogTitle>
                            <DialogDescription className="flex flex-col items-center justify-start p-[1em] gap-8">
                              <Image
                                className="rounded-full h-[100px] w-[100px] mt-5"
                                src={
                                  value?.links.patch.small
                                    ? value.links.patch.small
                                    : logo
                                }
                                alt="mission batch"
                                width={500}
                                height={500}
                              />

                              <p>Name : {value.name}</p>
                              <p>Rocket Id : {value.rocket}</p>

                              <p>Time : {value.date_utc}</p>
                              <p>Flight Number :{value.flight_number} </p>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </div>
      </div>
    </div>
  );
}
export default Page;
