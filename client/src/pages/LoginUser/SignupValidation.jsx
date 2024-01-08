function validation(values) {
    const error = {};
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (values.full_name === "") {
        error.full_name = "Name should not be empty";
    } 

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        error.email = "Invalid email format";
    } 

    if (values.password === "") {
        error.password = "Password should not be empty";
    } 

    if (values.address === "") {
        error.address = "Address should not be empty";
    }

    return error;
}

export default validation;
