import { Paper, Title, Text, Stack, Button, Group } from '@mantine/core'

export default function LessonPlanPreview({ plan }) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Paper shadow="xs" p="md" withBorder>
      <Stack>
        <Group justify="space-between" align="center">
          <Title order={2}>Lesson Plan Preview</Title>
          <Button onClick={handlePrint} variant="light">
            Print
          </Button>
        </Group>
        
        <div dangerouslySetInnerHTML={{ __html: plan }} />
      </Stack>
    </Paper>
  )
}
