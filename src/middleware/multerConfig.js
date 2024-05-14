import multer from 'multer'

// Configura multer para manejar la carga de archivos
const storage = multer.memoryStorage() // Almacena los archivos en memoria
const upload = multer({ storage: storage })

export default upload
