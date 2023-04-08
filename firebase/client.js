// Import the functions you need from the SDKs you need
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, deleteDoc, query, where } from 'firebase/firestore'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCbAdvbEsLT25ycELKDT1APrh_pqiNofdw',
  authDomain: 'alan-page.firebaseapp.com',
  projectId: 'alan-page',
  storageBucket: 'alan-page.appspot.com',
  messagingSenderId: '452208408948',
  appId: '1:452208408948:web:e11f7768bfac0b56499421'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth()

export const onAuthStateChanged = (setState) => {
  return auth.onAuthStateChanged((user) => {
    user ? setState(user) : setState(false)
  })
}

export const iniciarSesion = async ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const cerrarSesion = async () => {
  await auth.signOut()
}

export const agregarTatuaje = async ({ nombre, descripcion, estilos, duracion, lugar, tags, imagesData, homeVisible }) => {
  try {
    const docRef = await addDoc(collection(db, 'tatuajes-hechos'), {
      nombre, descripcion, tags, imagesData, estilos, duracion, lugar, homeVisible
    })
    return docRef
  } catch (e) {
    throw new Error(e)
  }
}
export const agregarDesign = async ({ nombre, descripcion, estilos, tags, imageUrl, path, precio }) => {
  try {
    const docRef = await addDoc(collection(db, 'designs'), { nombre, descripcion, tags, estilos, imageUrl, path, precio })
    return docRef
  } catch (e) {
    throw new Error(e)
  }
}

export const subirArchivo = async (file, filename) => {
  const storage = getStorage()
  const tatuajesRef = ref(storage, filename || file.name)
  console.log(tatuajesRef)
  return await uploadBytesResumable(tatuajesRef, file)
}

export const getImagesUrls = async (image1, image2) => {
  const storage = getStorage()
  const Image1URL = await getDownloadURL(ref(storage, `${image1.ref.name}`))
  const Image2URL = await getDownloadURL(ref(storage, `${image2.ref.name}`))

  return { original: Image1URL, compressed: Image2URL }
}
export const getImageUrl = async image => {
  const storage = getStorage()
  const Image1URL = await getDownloadURL(ref(storage, `${image.ref.name}`))
  return Image1URL
}

export const getTattoos = async () => {
  return getDocs(collection(db, 'tatuajes-hechos'))
    .then(snapshot => {
      return snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })
    })
}
export const getHomeTattoos = async () => {
  const collectionRef = collection(db, 'tatuajes-hechos')
  const q = query(collectionRef, where('homeVisible', '==', true))
  console.log(q)

  return getDocs(q).then(snapshot => {
    console.log(snapshot)
    return snapshot.docs.map(doc => {
      const data = doc.data()
      const id = doc.id
      return { id, ...data }
    })
  })
}

export const getDesigns = async () => {
  return getDocs(collection(db, 'designs'))
    .then(snapshot => {
      return snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })
    })
}

export const getSingleTattoo = async (id, collection = 'tatuajes-hechos') => {
  const docRef = doc(db, collection, id)
  return getDoc(docRef)
    .then(snap => {
      const data = snap.data()

      return { id: snap.id, ...data }
    })
}

export const deleteTattoo = async (id, imagesData) => {
  const storage = getStorage()
  try {
    const originalRef = ref(storage, imagesData.original.path)
    const compressedRef = ref(storage, imagesData.preview.path)

    await deleteObject(originalRef)
    await deleteObject(compressedRef)

    await deleteDoc(doc(db, 'tatuajes-hechos', id))
    return true
  } catch (err) {
    return new Error(err)
  }
}
export const deleteDesign = async (id, path) => {
  const storage = getStorage()

  const reference = ref(storage, path)

  await deleteObject(reference)
  await deleteDoc(doc(db, 'designs', id))
  return true
}
