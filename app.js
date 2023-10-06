document.addEventListener("DOMContentLoaded", function() {
let bottom = document.querySelector(".bottom");
   let input = document.querySelector("#txt");
   let sendbtn = document.querySelector(".uil-message");
   let ul = document.querySelector("#list_cont");
const api = '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';
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
   const options = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + api,
    },
    body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": input.value }]
    })
    }
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
      $(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight); fetch('https://api.openai.com/v1/chat/completions', options)
        .then(res => res.json())
        .then(data => {
        let i = 0;
const intervalId = setInterval(() => {
    if (i < data.choices[0].message.content.length) {
        li2.textContent += data.choices[0].message.content[i];
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
            li2.textContent=error;
         ul.appendChild(li2);
         $(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight);
        });
   }
   } sendbtn.addEventListener("click",ChatGPT);
});
