import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'prop-types'
import moment from 'moment'
import "./index.css"

const FileList = ({files}) => (
  <table className='file-list'>
    <tbody>
      {files.map((file) => (
        <FileListItem key={file.id} file={file}/>
      ))}
    </tbody>
  </table>
)
FileList.propTypes = {
  files: propTypes.array,
}

const FileListItem = ({file}) => (
  <tr className='file-list-item' key={file.id}>
    <FileName file={file}/>
    <CommitMessage commit={file.latestCommit}/> 
    <td className='age'>
      <Time time={file.updated_at}/>
    </td>
  </tr>
)
FileListItem.propTypes = {
  file: propTypes.object.isRequired,
}

// FileName component
// Use Fragment Syntax to wrap two elements in the return
const FileName = ({file}) => {
  return (
    <>
      <FileIcon file={file} />
      <td className='file-name'>{file.name}</td>
    </>
  )
}
FileName.propTypes = {
  file: propTypes.object.isRequired,
}

const FileIcon = ({file}) => {
  let icon = 'fa-file-text-o'
  if(file.type === 'folder') {
    icon = 'fa-folder'
  }
  return (
    <td className='file-icon'>
      <i className={`fa ${icon}`} />
    </td>
  )
}
FileIcon.propTypes = {
  file: propTypes.object.isRequired,
}

//Time component

const Time = ({time}) => {
  const timeString = moment(time).fromNow()
  return <span className="time">{timeString}</span>
}

//CommitMessage Component
const CommitMessage = ({commit}) => (
  <td className='commit-message'>{commit.message}</td>
)
CommitMessage.propTypes = {
  commit: propTypes.object.isRequired,
}

const testFiles = [
  {
    id: 1,
    name: 'src',
    type: 'folder',
    updated_at: '2016-07-11 21:24:00',
    latestCommit: {
      message: 'Initial commit',
    },
  },
  {
    id: 2,
    name: 'tests',
    type: 'folder',
    updated_at: '2016-07-11 21:24:00',
    latestCommit: {
      message: 'Initial commit',
    },
  },
  {
    id: 3,
    name: 'README',
    type: 'file',
    updated_at: '2016-07-18 21:24:00',
    latestCommit: {
      message: 'Added a readme',
    },
  }
]

ReactDOM.render(<FileList files={testFiles}/>, document.querySelector('#root'))
