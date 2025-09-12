import React from 'react'

const Lightbg = () => {
  return (
    <div className='py-24 w-full px-24  flex flex-col justify-center text-center items-center bg-white'>
       <h1 className={`text-[31px]  font-semibold  text-[#61dcdf]`}>
       Text blockquotes light background{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        </span>{" "}
      </h1>

      <div className='h-45 flex flex-col gap-3 text-left border-l-2 mt-30 w-full px-6 border-blue-500'>
        <div className='flex'>
            <span className='text-4xl font-bold mt-6 text-blue-500'>"</span>
            <p className='mt-5 text-lg leading-relaxed tracking-wide text-gray-500'>When you’re a carpenter making a beautiful chest of drawers, you’re not going to use a piece of plywood on the back, even though it faces the wall and nobody will ever see it. You’ll know it’s there, so you’re going to use a beautiful piece of wood on the back. </p>
        </div>
            
          <p>Steve Jobs</p>
      </div>
    </div>
  )
}

export default Lightbg
