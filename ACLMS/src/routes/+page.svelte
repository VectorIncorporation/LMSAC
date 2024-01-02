<script>
    import { userStore } from "sveltefire";
    import { auth } from "../lib/Firebase";

    let user = userStore(auth);
</script>

<main>
    <div class="mx-auto max-w-7xl p-6 hero">
        <h1 class="my-5 text-5xl font-bold title">Welcome to the ICT Portal of Ananda College, Colombo 10</h1>
        <div class="cta-links">
                <a href="/Upload" class="px-10 mx-20 py-2  bg-gold rounded-md hover:rounded-full transition-all ease-in-out delay-20 hover:bg-opacity-90 duration-200">Upload</a>
            
            {#if $user}
                <a href="/chooseGrade" class="px-10 mx-20 py-2  bg-gold rounded-md hover:rounded-full transition-all ease-in-out delay-20 hover:bg-opacity-90 duration-200">Begin...</a>
            {:else}
                <a href="/signIn" class="px-10 mx-20 py-2 bg-gold rounded-md hover:rounded-full transition-all ease-in-out delay-20 duration-200">Sign In</a>
            {/if}
        </div>
    </div>
</main>

<style>
    main{
        background-color: #1e1e1e;
    }
    .title{
        color: #fff;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        font-size: 60px;
    }
    .cta-links{
        align-items: center;
        justify-content: center;
        font-family: 'Open Sans', sans-serif;
        font-weight: 500;
    }
</style>