import { ref, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../../lib/Firebase';

/** @type {import('./$types').PageLoad} */
export async function load({ params }){

    let downloadURL;
    let downloadError;
//
    const docRef = doc(db, "Materials", params.slug)
    //const docSnap = await getDoc(docRef);
    //
    const pathRef = ref(storage, `Materials/${params.slug}.pdf`)
    try {
        const dURL = await getDownloadURL(pathRef)
        downloadURL = dURL;
    } catch (error) {
        console.log(error)
        downloadError = error;
    }

    

    if(docSnap.exists()){
        console.log(docSnap.data())
    } else{
        console.log('no data')
    }

    return{
        paper:{
            id: params.slug,
            data: {...docSnap.data()},
            url: downloadURL,
            error: downloadError
        }
    }
}