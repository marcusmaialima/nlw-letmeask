import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

import copyImg from '@assets/images/copy.svg'
import './styles.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code)
    toast('Código copiado com sucesso! :)')
  }

  return (
    <React.Fragment>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copiar o código da sala" />
        </div>
        <span>Sala #{code}</span>
      </button>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          duration: 1000,
          style: {
            background: '#2ecc71',
            color: '#fff'
          },
          success: {
            duration: 500,
            theme: {
              primary: 'green',
              secondary: 'black'
            }
          }
        }}
      />
    </React.Fragment>
  )
}
