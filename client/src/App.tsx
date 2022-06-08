import { useEffect } from "react";
import { Container } from "./components/Container";
import { Layout, LayoutBottom, LayoutMain } from "./components/Layout";
import { MeesageInputForm } from "./components/MeesageInputForm";
import { Messages } from "./components/Messages";
import { globalCss } from "./stitches-config";
import { useChatMessages } from "./useChatMessages";
import { useUserId } from "./userId";

const globalStyles = globalCss({
  body: {
    fontSize: "$4",
    backgroundColor: "$backgroundBase",
  },
});

function App() {
  useEffect(() => {
    globalStyles();
  }, []);

  const userId = useUserId();
  const { addMessage, messages } = useChatMessages(userId);

  return (
    <Layout>
      <LayoutMain>
        <Container>
          <Messages userId={userId} messages={messages} />
        </Container>
      </LayoutMain>
      <LayoutBottom>
        <Container>
          <MeesageInputForm onSubmit={addMessage} />
        </Container>
      </LayoutBottom>
    </Layout>
  );
}

export default App;
