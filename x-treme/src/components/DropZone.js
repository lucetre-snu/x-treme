import React, { useState, useEffect } from 'react';

const dragOver = (e) => {
    e.preventDefault();
}

const dragEnter = (e) => {
    e.preventDefault();
}

const dragLeave = (e) => {
    e.preventDefault();
}

const handleFiles = (files) => {
	for(let i = 0; i < files.length; i++) {
    if (validateFile(files[i])) {
        // add to an array so we can display the name of file
				setSelectedFiles(prevArray => [...prevArray, files[i]]);
    } else {
        // add a new property called invalid
				files\[i\]['invalid'] = true;
        // add to the same array so we can display the name of the file
				setSelectedFiles(prevArray => [...prevArray, files[i]]);
        // set error message
				setErrorMessage('File type not permitted');
    }
}
}

const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const fileType = (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
}

const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
        handleFiles(files);
    }
}

const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
        return false;
    }
    return true;
}

<div className="container">
    <div className="drop-container" 
			onDragOver={dragOver}
			onDragEnter={dragEnter}
			onDragLeave={dragLeave}
			onDrop={fileDrop}
		>
			<div className="drop-message">
				<div className="upload-icon"></div>
				Drag & Drop files here or click to upload
			</div>
    </div>
</div>

<div className="file-display-container">
    {
        validFiles.map((data, i) => 
            <div className="file-status-bar" key={i}>
                <div>
                    <div className="file-type-logo"></div>
                    <div className="file-type">{fileType(data.name)}</div>
										{data.invalid ?
                    	<span className='file-name file-error'}>{data.name}</span> :
                    	<span className='file-name'}>{data.name}</span>
										}
                    <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                </div>
                <div className="file-remove">X</div>
            </div>
        )
    }
</div>

const DropZone = () => {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [validFiles, setValidFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	return (
			<>
			</>
	)
}

useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
        const x = file.find(item => item.name === current.name);
        if (!x) {
            return file.concat([current]);
        } else {
            return file;
        }
    }, []);
    setValidFiles([...filteredArray]);

}, [selectedFiles]);

export default DropZone;