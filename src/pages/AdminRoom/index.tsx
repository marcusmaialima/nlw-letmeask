import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '@hooks';

import { Button, RoomCode, Question } from '@components';
import logoImg from '@assets/images/logo.svg';
import deleteImg from '@assets/images/delete.svg';
import { database } from '@services/firebase';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const questionsQuantity = questions.length;
  const history = useHistory();

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    })

    history.push('/');
  }

  return (
    <React.Fragment>
      <section id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="Logo da LetMe Ask" />
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
            </div>
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

          <div className="question-list">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Ícone de remover pergunta" />
                  </button>
                  </Question>
              )
            })}
          </div>

        </article>
      </section>
    </React.Fragment>
  )
}