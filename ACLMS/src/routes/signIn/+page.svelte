<script>
    import { signInWithPopup, GoogleAuthProvider, getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { goto } from "$app/navigation"
    import { auth, db } from "../../lib/Firebase"
    import { collection, addDoc } from "firebase/firestore";

    //const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    let user;
    let email;
    let password;
    //let selectedValue;

    const signInUser = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredrntial) => {
          user = userCredrntial.user
          console.log(user)
          goto('/')
        })
        .catch((error) => {
          console.error(error)
        })
    }


    const googlesignin = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                goto('/')
            }).catch((error) => {
                console.error(error)
            })
    }
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 login-page">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
          <div class="mt-2">
            <input bind:value={email} id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md py-1.5 placeholder:text-gray-400 sm:text-sm sm:leading-6">
          </div>
        </div>
  
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
            <div class="text-sm">
              <a href="/" class="font-semibold text-gold hover:text-gold">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input bind:value={password} id="password" name="password" type="password" autocomplete="current-password" class="block w-full rounded-md py-1.5 placeholder:text-gray-400 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
          <button on:click={signInUser} type="submit" class="flex w-full justify-center rounded-md bg-gold px-3 py-1.5 text-sm font-semibold leading-6 text-[#1e1e1e] shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Sign in</button>
        </div>
    </div>
  
      <p class="mt-10 text-center text-sm text-gray-300">
        Not a member?
        <a href="/signup" class="font-semibold leading-6 text-gold hover:opacity-75">Sign Up Now</a>
      </p>
    </div>
  </div>

<style>
.login-page{
  background-color: #1e1e1e;
}
#email{
  background-color: #1e1e1e;
  border: 1px solid gold;
  padding-right: 10px;
  padding-left: 10px;
  color: #fff;
}
#email:focus{
  outline: none;
}
#password{
  background-color: #1e1e1e;
  border: 1px solid gold;
  padding-right: 10px;
  padding-left: 10px;
  color: #fff;
}
#password:focus{
  outline: none;
}
</style>