
import { Heading } from '@radix-ui/themes'
import './globals.css'
import Link from 'next/navigation';
import NavBar from './NavBar'

export default async function Home() {
  return (
    <div className="ml-10">
      <div className='mb-10 text-yellow-900' >
        <Heading size="9" as="h1">Taskmaster.</Heading>
        <div className="mb-6 ml-12 text-yellow-700">
        <Heading size="7" as="h1">Manage your tasks like a boss!</Heading>
        </div>
        <div className="">
          <a href='/tasks'>
            <button className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'>
              Start Tasking
            </button>
          </a> 
        </div>
      </div>
      <div className='image-container'>
    </div>
  </div>
  )
}