var fetchButton = document.getElementById("fetchButton");
var fetchComponent = document.getElementById("fetchComponent");
var subCategories = document.getElementById("subCategories"); 


fetchButton.addEventListener("click", () => {
    if (fetchComponent.value) {
        const data = { name: fetchComponent.value };
        fetch('http://localhost/addComponent', {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                data.forEach(element => {
                    var {availability,_id,subCategory ,lastUpdated} = element;
                    var newDiv = document.createElement("div");
                    newDiv.innerHTML = subCategory+availability + `<button id='${_id}' onclick="UpdateAvail(this)">`+"+1"+"</button";
                    subCategories.appendChild(newDiv);
                    console.log(newDiv);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
})


function UpdateAvail(params) {
    console.log(params.id);

    const data = { id:params.id , name : fetchComponent.value };
        fetch('http://localhost/updateComponent', {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                
            })
            .catch((error) => {
                console.error(error);
            });
}