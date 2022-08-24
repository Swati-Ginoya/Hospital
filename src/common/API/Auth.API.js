import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/Firebase";


export const signUpApi = (data) => {
  console.log("SignupApi", data);

  return new Promise((resolve, reject) => {

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log(user);
        onAuthStateChanged(auth, (user) => {
          sendEmailVerification(user)
            .then(() => {
              resolve({ payload: "Check your E-mail address" })
        
            })
            .catch((e) => {
              reject({ payload: e })
              
            })
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
          reject({ payload: "This E-mail address is already exist" })
          console.log("This E-mail is already exist");
        } else {
          reject({ payload: errorMessage })
          console.log("Something went wrong");
        }
      });
  })


}