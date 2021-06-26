/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from '@hooks/use-auth'
import { database } from '@services/firebase'
import { useState, useEffect } from 'react'

type QuestionType = {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighlighted: boolean
  isAnswered: boolean
  likeCount: number
  likeId: string | undefined
}

type FirebaseQuestions = Record<
  string,
  {
    content: string
    author: {
      name: string
      avatar: string
    }
    isHighlighted: boolean
    isAnswered: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState<string>('')
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true)

  const { user } = useAuth()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', (room) => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => {
            if (key) {
              like.authorId === user?.id
            }
          })?.[0]
        }
      })

      setLoadingQuestions(false)
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  return { questions, title, loadingQuestions }
}
