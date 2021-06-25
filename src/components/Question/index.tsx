import './styles.scss'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: React.ReactNode
  isAnswered?: boolean
  isHighlighted?: boolean
}

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false
}: QuestionProps) {
  return (
    <div
      className={`
        question
        ${isAnswered && 'answered'}
        ${isHighlighted && 'highlighted'}
        `}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={`Imagem do usuário ${author.name}`} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  )
}
