$(document).ready(function(){
    $(".deleteUser").on("click", deleteUser)
    $(".deleteProfile").on("click", deleteUser)
})

function deleteProfile(){
    alert("Are you sure?")
}

//old delete function using Ajax calls, legacy since switching to mongoose
// function deleteUser(){
//     var confirmation = confirm("Are you sure?")
//     if(confirmation){
//         $.ajax({
//             type: "DELETE",
//             url: "/users/delete/"+$(this).data("id")
//         }).done(function(response){
//             window.location.replace("/dashboard")
//         })
//         window.location.replace("/dashboard")
//     }else {
//         return false
//     }
// }