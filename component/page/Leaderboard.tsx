'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Leaderboard() {
  const router = useRouter()
  return (
    <div className='w-full h-[100vh] gap-[5vh] flex flex-col justify-center items-center'>
      <div className='p-4 rounded-md outline-offset-4 outline outline-1 outline-orange-300  border border-slate-500 shadow-md text-3xl'>MOON COIN BALANCE</div>
      <div className='p-4 rounded-md outline-offset-4 outline outline-1 outline-orange-300  border border-slate-500 shadow-md text-3xl'>Claim 100$MOON</div>
      <div className='p-4 rounded-md outline-offset-4 outline outline-1 outline-orange-300  border border-slate-500 shadow-md text-3xl'>Stake MOON COIN</div>
      <div className='p-4 rounded-md outline-offset-4 outline outline-1 outline-orange-300  border border-slate-500 shadow-md text-3xl' onClick={() => router.push('/')}>LEADERBOARD</div>
    </div>
  )
}
