import React from 'react'
import { FileUpload } from 'primereact/fileupload'

const Uploader = ({mode,label, name,accept, onChange}) => {
  return (
    <FileUpload chooseOptions={{
        style:{
            backgroundColor:'#44cef5',
            width:'100%',
            borderRadius:50,
            borderWidth:0
        }
    }}
     removeIcon
     
    chooseLabel={label}
    accept={accept}
    onSelect={(e) => onChange(e.files[0])}
    mode="basic" name={name}  maxFileSize={1000000}/>)
}

export default Uploader