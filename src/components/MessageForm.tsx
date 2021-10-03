import React, {FormEvent, useEffect, useRef, useState} from "react"

const Message = (props: { message: string }) => (
  <div>{props.message}</div>
)

const MessageList = (props: { messages: string[] }) => (
  <>{props.messages.map((message, i) => <Message key={i} message={message}/>)}</>
)

const MessageInput = (props: { addMessage: (message: string) => void }) => {
  const [message, setMessage] = useState("")
  const input = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setMessage("")
    props.addMessage(message)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} ref={input} onChange={e => setMessage(e.target.value)}/>
      <input type="submit" value="Send" onClick={ignored => input.current?.focus()} disabled={message.trim().length === 0}/>
    </form>
  )
}

export const MessageForm = () => {
  const [messages, setMessages] = useState<string[]>([])

  const addMessage = (message: string) => {
    setMessages([...messages, message])
  }

  useEffect(() =>{
    document.title = `${messages.length} messages`
  })

  return (
    <div>
      <MessageList messages={messages}/>
      <MessageInput addMessage={addMessage}/>
    </div>
  )
}
