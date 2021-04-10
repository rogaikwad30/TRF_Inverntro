function varifyorder(params) {
    const data = {"id":params.id}
        fetch('http://localhost/varifyorder', {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);  
            })
            .catch((error) => {
                console.log(error);
            });
}