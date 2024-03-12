function login() {

    let userName = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    const dataToSend = {
        username: userName,
        password: password
    };
    fetch('http://localhost:9090/users/login',
        {
            method: 'post'
            , headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
            , body: JSON.stringify(dataToSend)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data === -1) {
                window.alert('Username Or Password Is Wrong');
            } else {
                let user = {'name': data.name, 'id': data.id, 'roleName': data.roleName}
                localStorage.setItem('user', JSON.stringify(user))
                // saveOrder(data.id);
                if (data.roleName === 'person') {
                    window.location.replace( data.roleName + ".html")

                } else if (data.roleName === 'customer') {
                    window.location.replace( data.roleName +"/"+"index_panel_user.html")

                } else if (data.roleName === 'admin') {
                    window.location.replace(data.roleName + "/" + "index.html")
                }else
                    window.location.replace( data.roleName + "/" +"index_panel_user.html")
            }
        });

}