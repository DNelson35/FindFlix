import React from 'react'

function FormWrap({name, children}) {
  return (
    <section className='loginBackground'>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
           <div className="w-full rounded-lg shadow border mt-0 max-w-md xl:p-0 bg-gray-800/95  border-gray-700">
                <div className="p-6 space-y-4">
                  <div className='flex justify-center'>
                  <h1 className="font-bold text-2xl text-white">{name}</h1>
                  </div>
                    {children} 
                </div>
           </div>
        </div>
    </section>
  )
}

export default FormWrap