"use client"
import React from "react";
import Sidebar from "@/components/Sidebar"; 
import { redirect } from "next/navigation";

const Page = () => {
  redirect("/dashborad");
  return (
    <>
      <Sidebar /> 
       
    </>
  );
};

export default Page;
