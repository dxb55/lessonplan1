import { useState } from 'react'
import { TextInput, NumberInput, Select, Textarea, Button, Paper, Stack, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { generateLessonPlan } from '../services/geminiService'
import LessonPlanPreview from './LessonPlanPreview'

export default function LessonPlanForm() {
  const [generatedPlan, setGeneratedPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      subject: '',
      topic: '',
      gradeLevel: '',
      duration: 45,
      materials: ''
    },
    validate: {
      subject: (value) => !value ? 'Subject is required' : null,
      topic: (value) => !value ? 'Topic is required' : null,
      gradeLevel: (value) => !value ? 'Grade level is required' : null,
      duration: (value) => !value ? 'Duration is required' : null,
    }
  })

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const plan = await generateLessonPlan(values)
      setGeneratedPlan(plan)
    } catch (error) {
      console.error('Error generating lesson plan:', error)
    }
    setLoading(false)
  }

  return (
    <>
      <Paper shadow="xs" p="md" mb="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Select
              label="Subject"
              placeholder="Select a subject"
              data={[
                'Math',
                'Science',
                'English',
                'History',
                'Geography',
                'Art',
                'Music',
                'Physical Education'
              ]}
              required
              {...form.getInputProps('subject')}
            />

            <TextInput
              label="Topic/Unit Name"
              placeholder="Enter the topic or unit name"
              required
              {...form.getInputProps('topic')}
            />

            <Select
              label="Grade Level"
              placeholder="Select grade level"
              data={[
                'K',
                '1st',
                '2nd',
                '3rd',
                '4th',
                '5th',
                '6th',
                '7th',
                '8th',
                '9th',
                '10th',
                '11th',
                '12th'
              ]}
              required
              {...form.getInputProps('gradeLevel')}
            />

            <NumberInput
              label="Duration (minutes)"
              placeholder="Enter lesson duration"
              min={1}
              required
              {...form.getInputProps('duration')}
            />

            <Textarea
              label="Required Materials/Resources"
              placeholder="List required materials and resources"
              minRows={3}
              {...form.getInputProps('materials')}
            />

            <Group justify="flex-end">
              <Button type="submit" loading={loading}>
                Generate Lesson Plan
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>

      {generatedPlan && <LessonPlanPreview plan={generatedPlan} />}
    </>
  )
}
