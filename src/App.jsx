import { Container, Title } from '@mantine/core'
import LessonPlanForm from './components/LessonPlanForm'

export default function App() {
  return (
    <Container size="md" py="xl">
      <Title order={1} mb="lg">Lesson Plan Generator</Title>
      <LessonPlanForm />
    </Container>
  )
}
