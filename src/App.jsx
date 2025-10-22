import './output.css'

function App() {

  function setSummary(summary) {
    const output = document.getElementById('output-text');
    output.disabled = false
    output.value = summary
  }

  async function get_summarized_text() {
    const input = document.getElementById('input-text');
    const text = input.value
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
  }

  return <>

      <div >
        <h1 className='text-center text-4xl mt-20 font-extrabold'>
          Ai Text Summarizer!
        </h1>
        <p className='text-center mt-7 text-2xl font-bold'>
          Enter your text below to summarize
        </p>
      </div>

      <div className='grid mt-10 justify-items-center p-4 max-w-[1300px] mx-auto'>
        <div className=' shadow-lg bg-white rounded-2xl min-h-[50vh] mt-10 sm:w-[90%] sm:grid-cols-2
        grid w-full'>
          <textarea name="input" id="input-text" placeholder='Enter your Text' className='border rounded-l-lg h-full focus:placeholder:scale-0 p-4'></textarea>

          <textarea disabled name="output" id="output-text" placeholder='Summary' className='border rounded-r-lg h-full p-4 '></textarea>
        </div>

        <button
          className='mt-10 mb-10 text-1xl bg-green-400 rounded-2xl p-2 font-medium hover:text-gray-600 hover:scale-105 transition 300 '

          onClick={get_summarized_text}
        >Summarize</button>

      </div>

  </>
}

export default App;
