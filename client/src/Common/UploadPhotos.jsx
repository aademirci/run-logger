import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const UploadPhotos = ({ setFieldValue }) => {
    const [files, setFiles] = useState([])

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: window.URL.createObjectURL(file)
            })))
            setFieldValue("photos", acceptedFiles)
        }
    })

    const thumbs = files.map(file => (
        <div key={file.name} className="thumb">
            <div className="thumb-inner">
                <img src={file.preview} onLoad={() => { window.URL.revokeObjectURL(file.preview) }} />
            </div>
        </div>
    ))

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => window.URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="upload panel">
            <div {...getRootProps({className: "dropzone"})}>
                <input {...getInputProps()} />
                <p>Drag and drop some photos here, or click here to select photos</p>
            </div>
            {files.length !== 0 && <div className="thumbs-container">{thumbs}</div>}
        </div>
    )
}

export default UploadPhotos