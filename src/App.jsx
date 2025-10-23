import { useState } from 'react';
import './output.css'
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { FaClipboard } from "react-icons/fa6";
import { FaRegClipboard } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";

function App() {
  const [theme , setTheme] = useState('light')
  const [loading , setloading] = useState(false)
  const [copied , setcopied] = useState(false)
  

  function handle_copy(){
    const output = document.getElementById('output-text').value
    if (output === 'Summary' || output === ''){
      alert('Nothing to copy')

    }else {
      setcopied(true)
      navigator.clipboard.writeText(output)
      setTimeout(() => setcopied(false) , 1500)
    }

  }

  function change_theme(){
    const root = document.querySelector('html')
    if(theme === 'light'){
      setTheme('dark')
      root.classList.add('dark')
      root.classList.remove('light')
    }else if (theme === 'dark'){
      setTheme('light')
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }


  function setSummary(summary) {
    setloading(false)
    const output = document.getElementById('output-text');
    output.disabled = false
    output.value = summary
  }

  async function get_summarized_text() {
    setloading(true)
    const input = document.getElementById('input-text');
    const text = input.value
    if (text !== ''){
      const resp = await fetch(
        "/api/summarize",
        
        {
          method: 'POST',
          headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({text})
        }
      )
  
      const data = await resp.json();
      console.log(data)
      setSummary(data[0].summary_text)
    }else {
      alert("Please enter something to summarize")
    }
  }

  return <div>

      <div className='flex justify-end'>
        <button className='p-2 rounded-2xl dark:text-white text-4xl font-medium m-4' onClick={change_theme}>
          {(theme === 'light')? <MdDarkMode className='hover:scale-150 transition 300 '/> : <MdLightMode className='hover:scale-150 transition'/>}
        </button>
      </div>

      <div>
        <h1 className='text-center text-4xl font-extrabold dark:text-white'>
          Ai Text Summarizer!
        </h1>
        <p className='text-center mt-7 text-2xl font-bold dark:text-white'>
          Enter your text below to summarize
        </p>
      </div>

      <div className='grid mt-10 justify-items-center p-4 max-w-[1300px] mx-auto'>
        <div className=' shadow-lg bg-white rounded-2xl min-h-[50vh] mt-10 sm:w-[90%] sm:grid-cols-2
        grid w-full'>
          <textarea name="input" id="input-text" placeholder='Enter your Text' className='border rounded-l-lg h-full focus:placeholder:scale-0 p-4 dark:bg-[#202024] dark:border-white dark:text-white sm:border-r-0 0' >
          </textarea>
      

          <textarea disabled name="output" id="output-text" placeholder='Summary' className='border rounded-r-lg h-full p-4 dark:bg-[#202024] dark:border-white dark:text-white'>
            
          </textarea>
        </div>

        <div className='grid grid-cols-2 gap-7'>
          <button
            className='mt-10 mb-10 text-1xl bg-gray-600 rounded-[10px] p-2 font-medium hover:text-gray-200 text-white hover:scale-105 transition 300' onClick={get_summarized_text}>

              {(loading === true)? <VscLoading className='animate-spin'/> : "Summarize"}
          </button>

          <button className='text-4xl' onClick={handle_copy}>
            {(theme === 'light')? <FaClipboard className='text-gray-600 hover:scale-110 transition'/> : <FaRegClipboard className='text-white hover:scale-110 transition' />}
          </button>
        </div>


      </div>


    </div>
}

export default App;
