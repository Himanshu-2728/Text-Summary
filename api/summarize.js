
export default async function handle(req , res){
    const api_key = process.env.HF_KEY
    console.log(api_key)
    const text = req.body
    console.log(text)
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",

        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${api_key}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({inputs:text})
        }
    )

    const data = await response.json()
    res.json(data)
}