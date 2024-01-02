import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../lib/Firebase'

/**@type {import('./$types').PageLoad}*/
export async function load({params}){

    let papers = [];

    const querySnapshot = await getDocs(collection(db, "Papers"))
    querySnapshot.forEach((doc) => {
        let data = {
            //title: doc.data().title,
            //year: doc.data().year,
            //term: doc.data().term,
            //grade: doc.data().grade,
            //subject: doc.data().subject,
            description: doc.data().desc,
            ...doc.data(),
            id: doc.id
        }
        console.log(doc.id, ' => ', data)
        papers.push(data)
    })

    return { papers }
}