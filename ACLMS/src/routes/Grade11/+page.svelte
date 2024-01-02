<script>
    /***@type {import('./$types').PageData}*/
     export let data;
     import { page } from '$app/stores'
     import { getAuth } from "firebase/auth";
    import { userStore } from "sveltefire";
    import { collection, addDoc, getFirestore } from "firebase/firestore";
    import { getDownloadURL, getStorage, ref } from "firebase/storage";
    import { uploadBytes } from "firebase/storage";
    import { goto } from '$app/navigation';

    let selectedFile;
    let fileUploading = false;

    
    const downloadPaper = async () => {
        
       
          const storageRef = ref(getStorage(), `Materials/${data.paper.id}.pdf`);

          try{
             // await uploadBytes(storageRef, selectedFile)
              const downloadURL = await getDownloadURL(storageRef);
              console.log("file uploaded succesfully. Download url", downloadURL)
              fileUploading = false;
              selectedFile = null;
              goto(downloadURL)

          }catch(error){
              fileUploading = false;
              console.error("Error uploading file", error)
          }
        
       
    } 
    const user = userStore(getAuth())
   
 
 </script>
 
 <div class="mx-auto min-w-fit  p-6">
     {#each data.papers as paper, index (paper.id)}
       {#if ((paper.grade==11))}
         {#if (paper.unit==1)}
         <div class="pb-5 rounded-md bg-gold bg-opacity-5 m-1 shadow-2xl transition-all ease-in-out delay-50 hover:scale-95 duration-200">
            <h2>Unit 01</h2>
            <p class="text-xl font-bold p-2">{paper.title}
            <button class="rounded-md bg-gold py-1 px-3 float-right text-sm hover:rounded-full" on:click={downloadPaper}>Download</button></p>
          </div>
         {/if}
         {#if (paper.unit==2)}
         <div class="pb-5 rounded-md bg-gold bg-opacity-5 m-1 shadow-2xl transition-all ease-in-out delay-50 hover:scale-95 duration-200">
            <h2>Unit 02</h2>
            <p class="text-xl font-bold p-2">{paper.title}
            <button class="rounded-md bg-gold py-1 px-3 float-right text-sm hover:rounded-full" on:click={downloadPaper}>Download</button></p>
          </div>
         {/if}
         {#if (paper.unit==3)}
         <div class="pb-5 rounded-md bg-gold bg-opacity-5 m-1 shadow-2xl transition-all ease-in-out delay-50 hover:scale-95 duration-200">
            <h2>Unit 03</h2>
            <p class="text-xl font-bold p-2">{paper.title}
            <button class="rounded-md bg-gold py-1 px-3 float-right text-sm hover:rounded-full" on:click={downloadPaper}>Download</button></p>
          </div>
         {/if}
         {#if (paper.unit==4)}
         <div class="pb-5 rounded-md bg-gold bg-opacity-5 m-1 shadow-2xl transition-all ease-in-out delay-50 hover:scale-95 duration-200">
            <h2>Unit 04</h2>
            <p class="text-xl font-bold p-2">{paper.title}
            <button class="rounded-md bg-gold py-1 px-3 float-right text-sm hover:rounded-full" on:click={downloadPaper}>Download</button></p>
          </div>
         {/if}
         {#if (paper.unit==5)}
         <div class="pb-5 rounded-md bg-gold bg-opacity-5 m-1 shadow-2xl transition-all ease-in-out delay-50 hover:scale-95 duration-200">
            <h2>Unit 05</h2>
            <p class="text-xl font-bold p-2">{paper.title}
            <button class="rounded-md bg-gold py-1 px-3 float-right text-sm hover:rounded-full" on:click={downloadPaper}>Download</button></p>
          </div>
         {/if}
         {#if (paper.unit==6)}
         <div class="pb-5 rounded-md bg-gold bg-opacity-5 m-1 shadow-2xl transition-all ease-in-out delay-50 hover:scale-95 duration-200">
            <h2>Unit 06</h2>
            <p class="text-xl font-bold p-2">{paper.title}
            <button class="rounded-md bg-gold py-1 px-3 float-right text-sm hover:rounded-full" on:click={downloadPaper}>Download</button></p>
          </div>
         {/if}
       {/if}
     {/each}
     <!--/div-->
     <!--/ul-->
 </div>
 
 <style>
 p{
     color: #fff;
 }
 
 /*.filter_button{
     padding: 20px 5px;
     background-color: gold;
 }*/
 </style>