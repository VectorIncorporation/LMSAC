<script>
    import { getAuth } from "firebase/auth";
    import { userStore } from "sveltefire";
    import { collection, addDoc, getFirestore } from "firebase/firestore";
    import { getDownloadURL, getStorage, ref } from "firebase/storage";
    import { uploadBytes } from "firebase/storage";
    import { goto } from '$app/navigation';

    let unit;
    let grade;
    let title;
    
    let selectedFile;
    let fileUploading = false;

    

    const UploadPaper = async () => {
        if(!selectedFile){
            console.error("No file selected")
            return
        }
        const docRef = await addDoc(collection(getFirestore(), "Materials"), {
            title: title,
            grade: grade,
            unit : unit
        })
        console.log("Document Written with ID:", docRef.id)
        if(docRef.id){
          //if(!selectedFile){
          //    console.error("No file selected")
          //    return
          //}
          fileUploading = true;
          const storageRef = ref(getStorage(), `Materials/${docRef.id}.pdf`);

          try{
              await uploadBytes(storageRef, selectedFile)
              const downloadURL = await getDownloadURL(storageRef);
              console.log("file uploaded succesfully. Download url", downloadURL)
              fileUploading = false;
              selectedFile = null;

          }catch(error){
              fileUploading = false;
              console.error("Error uploading file", error)
          }
        }

            // 'file' comes from the Blob or File API
            //uploadBytes(storageRef, file).then((snapshot) => {
            //  console.log('Uploaded a blob or file!');
            //});
    } 

    function handleFileSelect(event){
        selectedFile = event.target.files[0];
        console.log(selectedFile)
    }

    const user = userStore(getAuth())

</script>

{#if $user}
    <form class="mx-auto max-w-7xl p-6">
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-white">Uploading Materials</h2>
        
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="title" class="block text-sm font-medium leading-6 text-white">Title</label>
                <div class="mt-2">
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gold sm:max-w-md">
                    
                    <input required bind:value={title} type="text" name="title" id="title" class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-white placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="2022 Second Term Science Paper">
                  </div>
                </div>
              </div>
              <div class="sm:col-span-3">
                <label for="term" class="block text-sm font-medium leading-6 text-white">Term</label>
                <div class="mt-2">
                  <select bind:value={unit} required id="term" name="term" autocomplete="country-name" class="block w-full bg-dark px-3 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gold sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="1">Unit 01</option>
                    <option value="2">Unit 02</option>
                    <option value="3">Unit 03</option>
                    <option value="4">Unit 04</option>
                    <option value="5">Unit 05</option>
                    <option value="6">Unit 06</option>
                    <option value="7">Unit 07</option>
                    <option value="8">Unit 08</option>
                    <option value="9">Unit 09</option>
                  </select>
                </div>
              </div>
                <div class="sm:col-span-3">
                    <label for="grade" class="block text-sm font-medium leading-6 text-white">Grade</label>
                    <div class="mt-2">
                      <select bind:value={grade} required id="grade" name="grade" autocomplete="country-name" class="block w-full rounded-md border-0 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gold bg-dark sm:max-w-xs sm:text-sm sm:leading-6">
                        <option>10</option>
                        <option>11</option>
                      </select>
                    </div>
                  </div>
              </div>
              <div class="col-span-full mt-5">
                <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Paper PDF</label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  {#if selectedFile}
                    <div class="text-center">
                      <p class="text-md text-gold">{selectedFile.name}</p>
                    </div>
                  {:else}
                    <div class="text-center">
                      <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                      </svg>
                      <div class="mt-4 flex text-sm leading-6 text-gray-600">
                        <label for="file-upload" class="relative cursor-pointer rounded-md bg-gray font-semibold text-gold hover:underline">
                          <span>Upload a file</span>
                          <input on:change={handleFileSelect} id="file-upload" name="file-upload" type="file" class="sr-only" accept=".pdf" required>
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
          {#if fileUploading}
            <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 mr-2 text-[#2d2d2d] animate-spin dark:text-gray-600 fill-gold" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          {/if}
          <button type="button" class="text-sm font-semibold leading-6 text-gray-300"><a href='/' class="text-sm font-semibold leading-6 text-gray-300">Cancel</a></button>
          <button on:click={UploadPaper} type="submit" class="rounded-md bg-gold px-3 py-2 text-sm font-semibold text-dark shadow-sm hover:opacity-90 hover:rounded-full">Upload</button>
        </div>
      </form>
{:else}
    <h1>You Cannot access this page</h1>
    <a href="/signIn">Sign In first to view this page</a>
{/if}

<style>
*:focus{
  outline: none;
}
</style>