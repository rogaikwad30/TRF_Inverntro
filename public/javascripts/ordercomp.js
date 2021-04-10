var fetchButton = document.getElementById("fetchButton");
var fetchComponent = document.getElementById("fetchComponent");
var subCategories = document.getElementById("subCategories"); 


fetchButton.addEventListener("click", () => {
    if (fetchComponent.value) {
        const data = { name: fetchComponent.value };
        fetch('http://localhost/searchcomponents', {
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
                    newDiv.innerHTML = subCategory+availability + `<div><button id='${_id}' onclick="place(this)">Order</button><input type="number" id='${_id}quant'></div>`
                    subCategories.appendChild(newDiv);
                    console.log(newDiv);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
})


function place(params) {
    console.log(params.id);
    const quant= document.getElementById(params.id+"quant").value;
    const data = {"id":params.id,"name":fetchComponent.value,"num":quant}

    // console.log(JSON.stringify(data))
    // console.log(typeof(quant))
        fetch('http://localhost/checkorder', {
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