
window.addEventListener('load', ()=>{
    let socket;
    window.onunload = () => socket.close();

    const $loginForm = document.getElementById('loginForm');
    const $nameInput = document.getElementById('nameInput');
    const $messageInput = document.getElementById('messageInput');
    const $form = document.getElementById('messageForm');
    const $messagesContainer = document.getElementById('messagesContainer');
    

    $loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name =  $nameInput.value;
        login(name);
    })

    function login(name) {
        socket = io();

        socket.emit('login', name)
            // Recieve Message 
        socket.on('message', (data)=>{
            if(data.from != name){
                say(data.from , data.message)
            }else{
                say('me', data.message)
            }
        
        }); 
        $loginForm.remove();
            $form.classList.remove('hidden')

    }


    //Send Message

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        let message = $messageInput.value;
        $messageInput.value = '';

        // send
        socket.emit('message', message);

    })




        function say(name, message){
        $messagesContainer.innerHTML +=
        `<div class="chat-message">
            <span style="color:red; font-weight:bold;" >
                ${name}: 
            </span>${message}
            </div>
        `
        $messagesContainer.scrollTop = $messagesContainer.scrollHeight
        }
})














