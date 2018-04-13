
//emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const validator = (text, type) => {

    emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(type == 'email'){
        if(emailValid.test(text)){
            console.log('Correct user input');
        }else{
            alert("Invalid email address");
        }
    }
}