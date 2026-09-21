function card(event){
    if (event) event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let phone = document.getElementById("phone").value;

    let person = {
        name : name,
        age : age,
        email : email,
        pass : pass,
        phone : phone,

    };

    if (check_valid(person)){
        alert("Successfully submitted");
        return true;
    }
}

function check_valid(person){

    //name validation
    if (person.name == ""){
        alert("Please enter valid name");
        return false;
    }

    //age validation
    if (person.age < 16 || person.age > 60){
        alert("Invalid age must be between 16 and 60");
        return false;
    }

    //email validation
    let emailFormat = /@/;
    if (!emailFormat.test(person.email)){
        alert("Invalid email format");
        return false;
    }

    if (person.pass.length < 6){
        alert("Password must be 6 length");
        return false;
    }

    //phone validation
    let phoneformat = /^[0-9]{10}$/;
    if (!phoneformat.test(person.phone)){
        alert("invalid phone number");
        return false;
    }

    return true;

}
