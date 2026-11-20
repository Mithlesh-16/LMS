import toast from 'react-hot-toast';

export function isValidEmail(string){
    if(!string.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        toast.error("InValid Email");
        return;
    }
}

export function isValidPassword(string){
    if(!string.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        toast.error("Password should be atleast 8 chars, and should contain atleast 1 uppercase, 1 lowercase, 1 numerical char");
        return;
    }
    try{
        
    }catch(e){

    }
}

export function isValidName(string){
    if(string.len < 3) {
        toast.error("Name should be atleast 3 chars.");
        return;
    }
}