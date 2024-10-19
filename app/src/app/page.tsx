'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
useEffect(()=>{
  const token = localStorage.getItem('token');
  if(token){
    router.push('/vehicles')
  }else{
    router.push('/auth/signin')
  }
},[])
  return (
  <div>
    <h1>Test</h1>
  </div>
  );
}
