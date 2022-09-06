import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail ,sendEmailVerification, signInWithEmailAndPassword, signInWithPopup ,GoogleAuthProvider, signOut  } from "firebase/auth";
import { auth} from "../../firebase/Firebase";


export const signUpApi = (data) => {
  console.log("SignupApi", data);

  return new Promise((resolve, reject) => {

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {

        const user = userCredential.user;

        console.log(user);
        onAuthStateChanged(auth, (user) => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
               resolve({ payload: "Check your E-mail address" })
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
        if (errorCode.localeCompare("auth/email-already-in-use") == 0) {
          reject({ payload: "This E-mail address is already verified" })
        } else {
          reject({ payload: errorCode })
        }
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
          resolve({payload:"Login successfully"})
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.localeCompare("auth/wrong-password") == 0) {
          reject({ payload: "Email or password wrong" })
          // console.log("Successfully login");
        } else {
          reject({ payload: errorCode })
        }
      });

  })
}

export const signOutApi = () => {
  return new Promise((resolve ,reject) => {
    signOut(auth)
    .then(() => {
      resolve({payload:"logout success"})
    })
    .catch(() => {
      reject({payload:"something is wrong"})
    })
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
    reject({payload:error})
  });
  })
}

export const forgetpwdApi = (data) => {
  console.log(data);

  return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, data.email)
          .then(() => {
              resolve({payload : "Forgot PassWord SuccessFully and Check Your Email"})
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              reject({payload : "Email Is Wrong"})
              console.log(errorCode);
          });
  })
}