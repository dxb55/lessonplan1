import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyCIfpucfa-CpBY80DEqqlO4KhDhpcnkJQU')

export async function generateLessonPlan(formData) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `Create a detailed lesson plan for:
    Subject: ${formData.subject}
    Topic: ${formData.topic}
    Grade Level: ${formData.gradeLevel}
    Duration: ${formData.duration} minutes
    Materials: ${formData.materials}

    Please include:
    1. Learning Objectives
    2. Introduction/Hook
    3. Main Activities
    4. Assessment Methods
    5. Closure
    6. Extensions/Homework

    Format the response in HTML with appropriate headings and sections.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating lesson plan:', error)
    throw error
  }
}
