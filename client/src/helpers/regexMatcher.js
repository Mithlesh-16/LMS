import toast from 'react-hot-toast';

export function isValidEmail(email){
    if(!email?.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        toast.error("InValid Email");
        return false;
    }
    return true;
}

export function isValidPassword(password){
    if(!password?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        toast.error("Password should be atleast 8 chars, and should contain atleast 1 uppercase, 1 lowercase, 1 numerical char");
        return false;
    }
    return true;
}

export function isValidName(name){
    if(name?.length < 3) {
        toast.error("Name should be atleast 3 chars.");
        return false;
    }
    return true;
}