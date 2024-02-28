import './App.css';
import {Button, Card, InputGroup, Form, FloatingLabel, ToastContainer, Toast} from "react-bootstrap";
import {useEffect, useState} from "react";
import {EdenAiService} from "./API/EdenAiService";


function App() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState('https://eis.clientsimple.ru/upload/iblock/353/b0w2diy92mr6m409b1qsvc2l5gjjz2pp.jpg')
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false);

  const generate_image = async () => {
    if (!prompt){
      setShowToast(true)
      return
    }

    setIsLoading(true)

    let edenAiApi= new EdenAiService(process.env.REACT_APP_EDENAI_API_KEY)
    let data = await edenAiApi.generate(prompt, 512, 512)
    // let image_url = data?.replicate?.items[0]?.image_resource_url

    let base64String = data?.replicate?.items[0]?.image
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')

    setImage(`data:image/png;base64,${base64Data}`)
    setIsLoading(false)
  }

  return (
    <div className="App">
      <Card style={{ width: '25rem' }} className="mx-auto my-3">
        <Card.Img variant="top" src={image} />
        <Card.Body className="text-center">
          <InputGroup className="mb-3">
            <FloatingLabel label="Промпт">
              <Form.Control as="textarea"
                            aria-label="Prompt"
                            style={{ height: '150px' }}
                            value={prompt}
                            onChange={(e) => {setPrompt(e.target.value)}}
              />
            </FloatingLabel>
          </InputGroup>
          <Button variant="primary"
                  disabled={isLoading}
                  onClick={ generate_image }
          >
            {isLoading ? 'Загрузка…' : 'Сгенерировать'}
          </Button>
        </Card.Body>
      </Card>

      <ToastContainer className="position-fixed top-0 start-50 translate-middle-x mb-2">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="dark">
          <Toast.Body className="text-white">Введите промпт!!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
