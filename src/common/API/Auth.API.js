import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup ,GoogleAuthProvider  } from "firebase/auth";
import { auth, provider } from "../../firebase/Firebase";
import { setAlert } from "../../redux/action/AlertAction";


export const signUpApi = (data) => {
  // console.log("SignupApi", data);

  return new Promise((resolve, reject) => {

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {

        const user = userCredential.user;

        console.log(user);
        onAuthStateChanged(auth, (user) => {
          sendEmailVerification(user)
            .then(() => {
              // resolve({ payload: "Check your E-mail address" })
              // yield put(setAlert({text:"check your E-mail address"}))
            })
            .catch((e) => {
              reject({ payload: e })
              // yield put(setAlert({text:e.payload}))
            })
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
          resolve({ payload: "This E-mail address is already exist" })
          // console.log("This E-mail is already exist");
        } else {
          reject({ payload: errorMessage })
        }

        reject({payload : "This mail is already exits "})
      });
  })


}

export const signInApi = (data) => {
  console.log("signInApi", data);

  return new Promise((resolve, reject) => {

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          resolve({ payload:user })
        } else {
          reject({payload:"error"})
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
          reject({ payload: "Successfully Login" })
          // console.log("Successfully login");
        } else {
          reject({ payload: errorMessage })
        }
        reject({payload :error.code})
      });

  })
}

export const signOutApi = () => {
  return new Promise((resolve ,reject) => {

  })
}

export const googleSignInApi = () => {

  return new Promise ((resolve ,reject) => {
  const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    resolve({payload:user})
    
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    reject({payload:errorCode})
  });
  })
}