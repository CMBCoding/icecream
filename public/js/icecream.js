// alert("Hello, iceceam!");

// Validate name

document.getElementById("icecream").onsubmit = () => {
    
    //Create a boolean validation variable
    let valid = true;

    //Call error clear to reset the error boxes
    errorClear();

    //Variables for all the inputs
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let flavors = document.getElementById("flavors").value;
    let cone = document.getElementsByName("cone");
    let coneSelected = false; //Default for cone selection

    //Validation for the name
    if (name === "") {
        valid = false;
        document.getElementById("req-name").style.display = "block";
    }

    //Validation for the email
    if (name === "") {
        valid = false;
        document.getElementById("req-email").style.display = "block";
    }

    //Validation for flavor selection
    if (flavors === "none") {
        valid = false;
        document.getElementById("req-flavors").style.display = "block";
    }

    //Validation for the cone selection
    for (i = 0; i < cone.length; i++) {
        if (cone[i].checked) {
            coneSelected = true;
        }
        if (!coneSelected) {
            valid = false;
            document.getElementById("req-cone").style.display = "block";
        }
    }

}

function errorClear() {
    let errors = document.getElementsByClassName("required");
    for (i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}