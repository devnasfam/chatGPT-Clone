document.addEventListener("DOMContentLoaded", function() {
let bottom = document.querySelector(".bottom");
   let input = document.querySelector("#txt");
   let sendbtn = document.querySelector(".uil-message");
   let ul = document.querySelector("#list_cont");
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
         sendbtn.disabled=true;
      $(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight); 
      fetch(`https://WellinformedHeavyBootstrapping.yasirmecom.repl.co/ask?question=users new question :, ${input.value}`)
      .then(res => res.text())
        .then(data => {
        let i = 0;
const intervalId = setInterval(() => {
    if(i < data.length){
        li2.textContent += data[i];
        $(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight);
        i++;
    }else{
        clearInterval(intervalId);
        sendbtn.disabled=false;
    }
}, 20);
        }).catch(error=>{
            li2.textContent=`Not working`;
         ul.appendChild(li2);
         $(".msgs_cont").scrollTop($(".msgs_cont")[0].scrollHeight);
        });
   }
   input.value="";
   }
  sendbtn.addEventListener("click",ChatGPT);
});
