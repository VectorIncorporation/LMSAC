<script>
    export let user;
    export let dropped;
    export let isTeacher;
</script>

<div class="flex flex-col">
    <a href="/papers" class="text-sm font-semibold leading-6 text-gray-900">Papers</a>
    <a href="/" class="text-sm font-semibold leading-6 text-gray-900">About</a>
    {#if $user}
        <div class="relative inline-block text-left" >
        <button class="p-4 bg-orange-600 rounded-full" id="menu-button" aria-expanded="true" aria-haspopup="true"></button>
        {#if dropped}
            <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                  {#if isTeacher}
                    <a href="/uploadpaper" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Upload Paper</a>
                  {/if}
                  <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                </div>
              </div>
        {/if}
        </div>
    {:else}
        <a href="/signIn" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
    {/if}
    </div>