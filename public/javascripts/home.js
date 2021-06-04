const { defaultValueSchemable } = require("sequelize/types/lib/utils")

window.addEventListener("DOMContentLoaded", ()=>{
    const deleteButtons = document.querySelector(".deleteButton")
    console.log(deleteButtons.length)
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener('click',()=>{
            console.log("GOT SO MANY BUTTONS")
        })
    }
})

// addEventListener('click',()=>{
//     console.log("BUTTONS ON BUTTONS")

// })
// async(e)=>{
//     console.log("button button button button button clickin ery were ")
//     const list = document.querySelector(`#${e.target.id}`)
//     console.log(list)
//     const res = await fetch(`http://localhost:8080/lists/${e.target.id}`,
//     {
//         method: "DELETE",
//         body: JSON.stringify({ list }),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     const data = res.json()
// console.log(data)
