import multer from 'multer'

const storage = multer.diskStorage({})

const upload = multer({ storage})

export default upload

// image jo h wah ram me buffer ke form me save ho raha h n ki diskstorage me