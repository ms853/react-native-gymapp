
//emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const validator = (text) => {

    emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ //Email can contain numbers must follow the convention of example@mail.com
    passCheck = /(?=.{8,})/ //Password string must be at least 8 characters long or longer.
   // if(type == 'email'){
        if(emailValid.test(text)){
            console.log('Correct user input');
        }else{
            alert("Invalid email address");
        }
    
}
//RegEx
