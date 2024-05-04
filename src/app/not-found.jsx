"use client";
import { useEffect } from "react";

// Next
import { useRouter } from "@/navigation";

const PageNotFound = () => {
  const navigation = useRouter();

  useEffect(() => {
    navigation.replace("/", { locale: "en" });
  }, []);

  return null;
};

export default PageNotFound;
