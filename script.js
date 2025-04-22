const apiKey = "AIzaSyCKiGVT41_KLiZDh8IHSeWF50z-srr61EQ"; 
const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
const theme=document.getElementById("theme")
const icon=document.getElementById("icon")
theme.addEventListener("click",()=>{
document.body.classList.toggle("sunTheme")
document.body.classList.toggle("moonTheme")

if (document.body.classList.contains("moonTheme"))
{
  icon.classList.remove("fa-sun")
  icon.classList.add("fa-moon")
}
else{
  icon.classList.add("fa-sun")
  icon.classList.remove("fa-moon")
}
})

async function generateEmail()
   {
    const message=document.querySelector("#message").value
    const tone=document.querySelector("#emotion").value
    const language=document.querySelector("#language").value
    const prompt = `You are an assistant that writes email replies. Generate a full, well-written email reply in ${language} with a ${tone} tone, based on the message below:\n\n"${message}"\n\nOnly return the email. Do not include explanations, options, or any extra formatting.`;

    if (!message) {
      alert("Please enter email content!");
      return;
    }
    if (!tone){
      alert("Plesse select an emotion/tone!");
      return;
    }
    if (!language){
        alert("Please select a language!");
        return;
      }
    output.value="Typing..."
    output.style.color="gray"
      try{
        const requestBody= {
          contents: [
            {
              parts: [
                {
                  text: prompt 
                }
              ]
            }
          ]
        };

      const response= await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated."
      const outputClass = document.getElementById("output")
      outputClass.classList.add("visible")
      outputClass.value = reply
      outputClass.style.color=""
      const copy = document.getElementById("copy")
      copy.style.display = "block"
      outputClass.scrollIntoView({ behavior: "smooth", block: "start" })
  } else {
      alert("Failed to generate reply. Please try again.");
  }
}
catch(error) {
  console.error("Error:", error);
  alert("An error occurred while generating the reply.");
}};

document.getElementById("copy").addEventListener("click", () => {
  const replyText = document.getElementById("output").value;
  const message=document.querySelector("#message").value
  navigator.clipboard.writeText(replyText).then(() => {
    if (!message)
        alert("Please enter email content!")
    else if (!replyText)
      alert(`Please generate a reply first!`)
    else
      alert("Copied to clipboard!");
  }).catch((error) => {
      console.error("Error copying text:", error);
  });
});

const toneColors = {
  apologetic: "rgb(223, 106, 123)",     
  appreciative: "rgb(150, 123, 182)",   
  formal: "rgb(47, 79, 79)",           
  friendly: "rgb(25, 115, 205)",       
  professional: "rgb(148, 54, 14)"
};

document.getElementById("emotion").addEventListener("change", function () {
  const tone = this.value;
  const changes = document.querySelectorAll(".changes");
  changes.forEach(function(element){
  if (toneColors[tone]) {
    element.style.backgroundColor = toneColors[tone];
  } else {
    element.style.backgroundColor = "";
  }
});
})
