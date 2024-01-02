<script>
    import { userStore } from "sveltefire";
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
    import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
    //import { onAuthStateChanged } from "firebase/auth";
    import anandaLogo from '$lib/assets/anandaLogo.png'
    //import { minidenticonSvg } from 'https://cdn.jsdelivr.net/npm/minidenticons@4.2.0/minidenticons.min.js'
    import { minidenticon } from 'minidenticons'

    let user = userStore(getAuth());
    let dropped = false;
    let burger = false;
    let isTeacher;
    let mobileMenuActive = false; // Initialize the variable for mobile menu
    let photoSrc;


    //function userProfile(username){
    //  let srcString = 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon("Eshan"))
    //  return srcString
    //} 

    onAuthStateChanged(getAuth(), (user) => {
      if(user){
        console.log(user)
        photoSrc = 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(user.email))
        console.log(photoSrc)
      }
    })

    //console.log('data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon($user.email)))

    function toggleMobileMenu() {
      mobileMenuActive = !mobileMenuActive; // Toggle the mobile menu
    }

    const drop = () => {
        //console.log($user.uid)
        isTeacher = getUserRole()
        //console.log(dropped)
        dropped = !dropped
    }

    const dropBurger = () => {
      burger = !burger;
    }

    const getUserRole = async () => {
        const docRef = collection(getFirestore(), "Users")
        const q = query(docRef, where("uid", "==", $user.uid))
        const docSnap = await getDocs(q)
        docSnap.forEach((doc) => {
            if (doc.data().role == "teacher"){
                //console.log(doc.id, " => ", doc.data())
                return true
            }
            //console.log(doc.id, " => ", doc.data())
            return false
        })
    }

    const googleSignOut = () => {
        signOut(getAuth())
            .then(() => {
                console.log("Sign Out successful")
            })
            .catch((error) => {console.log("Sign Out failed")})
    }

</script>

<header class="header">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 z-20 sticky top-0" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="logo">
          <img src={anandaLogo} alt="ananda college logo">
          <div>
            <h2 class="text-xl font-bold">ONLINE ICT PORTAL</h2>
            <h3>Ananda College, Colombo 10</h3>
          </div>
        </a>
      </div>
      <div class="lg:hidden flex items-center">
        <button class="p-4 rounded-full" aria-expanded="true" aria-haspopup="true" on:click={toggleMobileMenu}>
          <!-- Burger menu icon (you can use an icon library or a custom icon) -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12 items-center links">
        <a href="/" class="text-sm font-semibold leading-6 text-white">Home</a>
        <a href="/chooseGrade" class="text-sm font-semibold leading-6 text-white">Begin</a>
        <a href="/About" class="text-sm font-semibold leading-6 text-white">About us</a>
        {#if $user}
            <div class="relative inline-block text-left" >
            <button on:click={drop}>
              <img src={photoSrc} width="50" height="50" alt="img"/>
            </button>
            {#if dropped}
                <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                      {#if isTeacher}
                        <a href="/uploadpaper" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Upload Paper</a>
                      {/if}
                      <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3" on:click={googleSignOut}>Sign out</button>
                    </div>
                  </div>
            {/if}
            </div>
        {:else}
            <a href="/signIn" class="login">Log in <span aria-hidden="true">&rarr;</span></a>
        {/if}
      </div>
  </nav>
  {#if mobileMenuActive}
        <div class="flex justify-center items-center flex-col w-full h-full absolute top-0 left-0 bg-white">
        <a href="/papers" class="text-sm font-semibold leading-6 text-white px-5">Papers</a>
        <a href="/" class="text-sm font-semibold leading-6 text-white px-5">About</a>
        {#if $user}
            <div class="relative inline-block text-left signedin" >
            <button class="p-4 bg-orange-600 rounded-full" id="menu-button" aria-expanded="true" aria-haspopup="true" on:click={drop}></button>
            {#if dropped}
                <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                      {#if isTeacher}
                        <a href="/uploadpaper" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Upload Paper</a>
                      {/if}
                      <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3" on:click={googleSignOut}>Sign out</button>
                    </div>
                  </div>
            {/if}
            </div>
        {:else}
            <a href="/signIn" class="login">Log in <span aria-hidden="true">&rarr;</span></a>
        {/if}
        </div>
      {/if}
</header>

<style>
  .header{
    background-color: #1E1E1E;
  }
  .logo{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo div{
    margin-left: 10px;
  }
  .logo div h2{
    color: gold;
    font-size: 25px;
    font-family: 'Open Sans', sans-serif;
  }
  .logo div h3{
    color: #B6B6B6;
    font-weight: 400;
    font-size: 15px;
  }
  .logo img{
    width: 45px;
  }
  .links a{
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
  }
  .links .login{
    padding: 8px 20px;
    background-color: gold;
    border-radius: 5px;
    color: #1E1E1E;
  }
  .links .login:hover{
    opacity: 0.9;
    transition: ease-in-out 200ms;
  }
</style>
