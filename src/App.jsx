import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [Length, setLength] = useState(8)
  const [Numberallow, setNumberallow] = useState(false)
  const [Charallow, setCharallow] = useState(false)
  const [Password, setPassword] = useState("")

  const passRef = useRef(null)

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (Numberallow) str += "0123456789";
    if (Charallow) str += "!@#$%&(){}[]=+-_~`";

    for (let i = 0; i < Length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [Length, Numberallow, Charallow, setPassword])

  const copyPasswordtoClip = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    passwordGen()
  }, [Length, Numberallow, Charallow, setPassword])

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-9  text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center mt-4'>
        Password Generator
      </h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4 py-5'>
          <input
           type="text"
           value={Password}
           className='outline-none w-full rounded-l-lg py-1 px-3'
           placeholder='password'
           readOnly
           ref={passRef}
           />
           <button
           onClick={copyPasswordtoClip}
           className='outline-none bg-blue-700 active:bg-blue-900 text-white rounded-r-lg px-3 py-0.5 shrink-0'
           >copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 mb-3'>
            <input 
            type="range" 
            min={8}
            max={100}
            value={Length}
            onChange={(e) => {setLength(e.target.value)}}
            className='cursor-pointer'
             />
             <label>Length: {Length}</label>
          </div>

          <div className='flex items-center gap-x-1 mb-3'>
          <input 
            type="checkbox" 
            defaultChecked={Numberallow}
            id='numberInput'
            onChange={() => {
              setNumberallow((prev) => !prev)
            }}
             />
             <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1 mb-3'>
          <input 
            type="checkbox" 
            defaultChecked={Charallow}
            id='charInput'
            onChange={() => {
              setCharallow((prev) => !prev)
            }}
             />
             <label htmlFor="charInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
