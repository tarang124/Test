document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    if(name && message){
        // Display message locally
        const messagesList = document.getElementById('messagesList');
        const messageEl = document.createElement('div');
        messageEl.className = 'user-message';
        messageEl.innerHTML = `<strong>${name}:</strong> ${message}`;
        messageEl.style.animation = 'fadeIn 0.8s ease forwards';
        messagesList.appendChild(messageEl);
        
        // SEND EMAIL via PHP
        fetch('mailer.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message)
        })
        .then(response => response.text())
        .then(data => {
            console.log('Email Response:', data);
            document.getElementById('messageForm').reset();
        })
        .catch(error => console.error('Error:', error));
    }
});