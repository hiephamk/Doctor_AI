import DiabetesFormComponent from '../components/ui/DiabetesPredictions/DiabetesFormComponent'
import { Box, Center, Container } from '@chakra-ui/react'


const HomePage: React.FC = () => {
  return (
    <Container w={"100vw"} h={"100vh"} border={"1px solid"}>
        <Box justifyContent={"center"} alignItems={"center"}>
          <DiabetesFormComponent/>
        </Box>
    </Container>
  )
}

export default HomePage