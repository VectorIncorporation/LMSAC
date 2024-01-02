<script>
    import { createUserWithEmailAndPassword } from "firebase/auth";
    import { addDoc, collection } from "firebase/firestore";
    import { auth, db } from "../../lib/Firebase";
    import { goto } from "$app/navigation";

    let user;
    let email;
    let password;
    let selectedValue;

    const createUser = () => {
      if (selectedValue == null){
        console.log('please choose a role')
        window.alert("please choose a role")
        return 
      }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                user = userCredential.user;
                console.log(selectedValue)
                console.log(user)
                createUserData()
                goto('/')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const createUserData = async () => {
      const docRef = await addDoc(collection(db, "Users"), {
        role: selectedValue,
        uid: user.uid,
      })
      console.log("document written with id", docRef.id)
    }
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-white text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm text-white font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input bind:value={email} id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
  
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white text-gray-900">Password</label>
            <!--<div class="text-sm">
              <a href="/" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>-->
          </div>
          <div class="mt-2">
            <input bind:value={password} id="password" name="password" type="password" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
        <div>
            <p class="block text-sm font-medium leading-6 text-gray-100">Who are you?</p>
            <div class="flex items-center mb-4">
                <input bind:group={selectedValue} type="radio" name="role" id="student" value="student" required>
                <label for="student" class="text-white">Student</label>
            </div>
            <div class="flex items-center">
                <input bind:group={selectedValue} type="radio" name="role" id="teacher" value="teacher" required>
                <label for="teacher" class="text-white">Teacher</label>
            </div>
        </div>
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" on:click={createUser}>Sign Up</button>
        </div>
    </div>
  
      <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?
        <a href="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In Now</a>
      </p>
    </div>
  </div>