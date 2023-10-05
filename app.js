document.addEventListener("DOMContentLoaded", function() {
let bottom = document.querySelector(".bottom");
   let input = document.querySelector("#txt");
   let sendbtn = document.querySelector(".uil-message");
   let ul = document.querySelector("#list_cont");
   const apiKeys = [
    'd0de5dd3a6mshbed7ca140b05d9fp1e85fajsnea0ca386650f',
    '5b0e331060msh5b7ef31c8f248f9p106d8djsn7d1e8ddd38b7',
    '79cd07e5damsh16e82764c0d6f5dp1b7cd6jsn17aae8b6f8ef',
    '4367aac21cmshccd083dffd7e5efp15d9cfjsn9302e16e0a76',
    '632d0c2586msh331b740d201fd31p14eae6jsnf077e781af60',
    '616da4dcc7msh84336fad16f0bf4p1b34a9jsndc75006a57b1'
];
let apiKeyIndex = 0;

function rotateAPIKey() {
    apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;
}
    bottom.addEventListener("click",()=>{
        input.focus();
    });
    input.addEventListener("input",()=>{
      if(input.value.length>0){
      sendbtn.style.background="#11ba91";
      }else{
      sendbtn.style.background="transparent";
      }
    });
   function ChatGPT(){
   const apiKey = apiKeys[apiKeyIndex];
   const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
        },
        body: JSON.stringify({
            messages: [
                {
                role: 'user',
                content: `${input.value}`
                }
            ],
            web_access: false,
            stream: false
        })
    };
       if(input.value!=="" && input.value!==null && input.value.length>0 && input.value.trim()!==""){
sendbtn.style.background="transparent";       
let typingAnimationDiv = document.createElement("div");
typingAnimationDiv.className = "typing-animation";
for (var i = 0; i < 3; i++) {
    var dotSpan = document.createElement("span");
    dotSpan.className = "dot";
  typingAnimationDiv.appendChild(dotSpan);
}
        let li2 = document.createElement("li");
        li2.className="rchat";
        li2.appendChild(typingAnimationDiv);
        
        let li = document.createElement("li");
        li.className="schat";
        li.textContent=input.value;
         ul.appendChild(li);
         setTimeout(()=>{
            ul.appendChild(li2);
            $(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight);
         },500);
         input.value="";
         sendbtn.disabled=true;
      $(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight); fetch('https://open-ai21.p.rapidapi.com/conversationgpt35', options)
        .then(res => res.json())
        .then(data => {
        let i = 0;
const intervalId = setInterval(() => {
    if (i < data.BOT.length) {
        li2.textContent += data.BOT[i];
        $(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight);
        i++;
    } else {
        clearInterval(intervalId);
    }
}, 20);
ul.appendChild(li2);
sendbtn.disabled = false;
$(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight);
        }).catch(error=>{
            li2.textContent=JSON.stringify(data);
         ul.appendChild(li2);
         $(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight);
         rotateAPIKey();
        });
   }
   } sendbtn.addEventListener("click",ChatGPT);
});
