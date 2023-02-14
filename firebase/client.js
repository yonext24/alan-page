// Import the functions you need from the SDKs you need
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, getDoc, doc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

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

export const iniciarSesion = ({ email, password }) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      console.log('salió bien', user)
    })
    .catch(err => {
      console.log(err)
    })
}

export const cerrarSesion = () => {
  auth.signOut()
    .then()
}

export const agregarTatuaje = async ({ nombre, descripcion, estilos, duracion, lugar, tags, imagesData }) => {
  try {
    const docRef = await addDoc(collection(db, 'tatuajes-hechos'), {
      nombre, descripcion, tags, imagesData, estilos, duracion, lugar
    })
    return docRef
  } catch (e) {
    throw new Error(e)
  }
}
export const agregarDesign = async ({ nombre, descripcion, estilos, tags, imageUrl }) => {
  try {
    const docRef = await addDoc(collection(db, 'designs'), { nombre, descripcion, tags, estilos, imageUrl })
    return docRef
  } catch (e) {
    throw new Error(e)
  }
}

export const subirArchivo = async (file, filename) => {
  const storage = getStorage()
  const tatuajesRef = ref(storage, filename || file.name)
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
    .catch(err => new Error(err))
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
    .catch(err => new Error(err))
}

export const getSingleTattoo = async (id) => {
  const docRef = doc(db, 'tatuajes-hechos', id)
  return getDoc(docRef)
    .then(snap => snap.data())
}
