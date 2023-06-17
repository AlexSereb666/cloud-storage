import React from 'react';
import './file.css'
import dirLogo from '../../../../assets/img/dir.png'
import fileLogo from '../../../../assets/img/file.png'
import deleteLogo from '../../../../assets/img/delete.png'
import downloadLogo from '../../../../assets/img/download.png';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)

    function openDirHandler(file) {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (fileView === 'list') {
        return (
            <div className='file' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
                <div className="file__name">
                    {file.name.length > 50 ? `${file.name.slice(0, 40)}.....${file.name.slice(-5)}` : file.name}
                </div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' &&
                <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download">
                    <img src={downloadLogo} alt="" />
                </button>}
                <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">
                    <img src={deleteLogo} alt="" />
                </button>
            </div>
        );
    }
    if (fileView === 'plate') {
        return (
            <div className='file-plate' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
                <div className="file-plate__name">
                    {file.name.length > 20 ? `${file.name.slice(0, 10)}.....${file.name.slice(-5)}` : file.name}
                </div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                    <button onClick={(e) => downloadClickHandler(e)} className="file-plate__btn file-plate__download">
                        <img src={downloadLogo} alt="" />
                    </button>}
                    <button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete">
                        <img src={deleteLogo} alt="" />
                    </button>
                </div>
            </div>
        );
    }

};

export default File;