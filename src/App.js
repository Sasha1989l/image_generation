import './App.css';
import {Button, Card, InputGroup, Form, FloatingLabel} from "react-bootstrap";
import {useEffect} from "react";
import OpenAI from "openai";


function App() {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true
  });


  useEffect(() => {
    console.log(process.env.NODE_ENV)
    console.log(`Open ai key: ${process.env.REACT_APP_OPEN_AI_KEY}`)
  }, []);

  const generate_image = async () => {
    // const image = await openai.images.generate({ prompt: "A cute baby sea otter" });
    // console.log(image.data);

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion)
  }


  return (
    <div className="App">
      <Card style={{ width: '25rem' }} className="mx-auto my-3">
        <Card.Img variant="top" src="https://i.ytimg.com/vi/QE_AiPrRHZs/maxresdefault.jpg" />
        <Card.Body className="text-center">
          <InputGroup className="mb-3">
            <FloatingLabel label="Промпт">
              <Form.Control as="textarea" aria-label="Prompt" style={{ height: '150px' }} />
            </FloatingLabel>
          </InputGroup>
          <Button variant="primary" onClick={ generate_image }>Сгенерировать</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
