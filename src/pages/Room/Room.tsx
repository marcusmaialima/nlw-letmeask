import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@hooks/use-auth';
import { database } from '@services/firebase';

import { Button, RoomCode } from '@components';
import logoImg from '@assets/images/logo.svg';
import './styles.scss';

type FirebaseQuestions = Record<string, {
  content: string;
  author: {
    name: string;
    avatar: string;
  },
  isHighlighted: boolean;
  isAnswered: boolean;
}>

type Question = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  },
  isHighlighted: boolean;
  isAnswered: boolean;
}

type RoomParams = {
  id: string;
}

export function Room() {
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState<string>('');

  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const questionsQuantity = questions.length;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })
      
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      toast('Você precisa estar autenticado.');
      throw new Error('Você precisa estar autenticado.')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <React.Fragment>
      <section id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="Logo da LetMe Ask" />
            <RoomCode code={roomId} />
          </div>
        </header>
        <article>
          <div className="room-title">
            <h1>Sala - {title}</h1>
            {questionsQuantity > 0 && (
              <span>
                {questionsQuantity} {questionsQuantity > 1 ? 'perguntas' : 'pergunta'}
              </span>
            )}
          </div>
          <form onSubmit={handleSendQuestion}>
            <textarea 
              placeholder="O que você quer perguntar?"
              onChange={event => setNewQuestion(event.target.value)}
              value={newQuestion}
            />
            <footer className="form-footer">
              { user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={`Usuário ${user.name}`} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
              ) }
              <Button type="submit" disabled={!user}>Enviar pergunta</Button>
            </footer>
          </form>
        </article>
      </section>
      <Toaster
          position="top-right"
          toastOptions={{
            className: '',
            duration: 1000,
            style: {
              background: '#e74c3c',
              color: '#fff',
            },
            success: {
              duration: 500,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
    </React.Fragment>
  )
}