"use client";
// FIXME: Move the products functionality to a separate file
// TODO: Create a responsive sidenav here in the dashboard so the user can move between pages
// TODO: User and Admin functionalities
import { useEffect, useState } from "react";
import axios from "axios";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { formSchema } from "./formSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/use-toast";

import { Toaster } from "@/components/ui/toaster";

interface Product {
  key: string;
  name: string;
  price: number;
}

const Page = () => {
  const { toast } = useToast();


  return (
    <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:pt-10 xl:pt-10 lg:pb-52">
      <h1>Dashboard</h1>
      <Toaster />
    </MaxWidthWrapper>
  );
};

export default Page;
