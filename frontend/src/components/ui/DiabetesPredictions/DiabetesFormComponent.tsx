import React, { useState } from 'react'
import { Box, Button, Center, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { CgAssign } from 'react-icons/cg'
import axios from 'axios'

interface DiabetesForm {
    Pregnancies: number
    Glucose: number
    BloodPressure: number
    SkinThickness: number
    Insulin: number
    BMI: number
    DiabetesPedigreeFunction: number
    Age: number
}
interface Predictions {
    predictions: string,
    accuracy: number,
    message: string
}
const DiabetesFormComponent = () => {
    const [formData, setFormData] = useState<DiabetesForm>({
        Pregnancies: 0,
        Glucose: 0,
        BloodPressure: 0,
        SkinThickness: 0,
        Insulin: 0,
        BMI: 0,
        DiabetesPedigreeFunction:0,
        Age: 0
    })
    const [result, setResult] = useState<Predictions | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof DiabetesForm
        const sanitizedValue = e.target.value.replace(',', '.')
        const value = sanitizedValue === '' ? 0 : parseFloat(sanitizedValue) || 0
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const url = 'http://127.0.0.1:8000/api/prediction/result/'
        try {
            const response = await axios.post(
                url,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
                )
            // optional: store server response in state
            const data = response.data
            if (typeof data == 'string'){
                setResult({ predictions: data, accuracy: 0, message: '' })
            }else if (data && typeof data == 'object' && 'predictions' in data){
                setResult(data as Predictions)
            }else {
                setResult({ predictions: JSON.stringify(data), accuracy: 0, message: '' })
            }
            setFormData({
                Pregnancies: 0,
                Glucose: 0,
                BloodPressure: 0,
                SkinThickness: 0,
                Insulin: 0,
                BMI: 0,
                DiabetesPedigreeFunction:0,
                Age: 0
            })
        } catch (error: unknown) {
            const errMsg = axios.isAxiosError(error)
                ? error.response?.data ?? error.message
                : error instanceof Error
                ? error.message
                : String(error)
            console.error("error posting", errMsg)
        }
    }


  return (
    <Box>
        <VStack>
            <form onSubmit={handleSubmit}>
                <HStack>
                    <label htmlFor="Pregnancies">Pregnancies</label>
                    <Input
                        type='number'
                        step='0.01'
                        name='Pregnancies'
                        value={formData.Pregnancies}
                        onChange={handleChange}
                        placeholder='Pregnancies'
                        id='Pregnancies'
                    />
                </HStack>
                <HStack>
                    <label htmlFor="Glucose">Glucose</label>
                    <Input
                        type='number'
                        step='0.01'
                        name='Glucose'
                        value={formData.Glucose}
                        onChange={handleChange}
                        placeholder='Glucose'
                        id='Glucose'
                    />
                </HStack>
                <HStack>
                    <label htmlFor="BloodPressure">BloodPressure</label>
                    <Input
                        type='number'
                        step='0.01'
                        name='BloodPressure'
                        value={formData.BloodPressure}
                        onChange={handleChange}
                        placeholder='BloodPressure'
                        id='BloodPressure'
                    />
                </HStack>
                <HStack>
                    <label htmlFor="SkinThickness">SkinThickness</label>
                    <Input
                        type='number'
                        step='0.01'
                        name='SkinThickness'
                        value={formData.SkinThickness}
                        onChange={handleChange}
                        placeholder='SkinThickness'
                        id='SkinThickness'
                    />
                </HStack>
                <HStack>
                    <label htmlFor="Insulin">Insulin</label>
                    <Input
                        type='number'
                        step='0.01'
                        name='Insulin'
                        value={formData.Insulin}
                        onChange={handleChange}
                        placeholder='Insulin'
                        id='Insulin'
                    />
                </HStack>
                <HStack>
                    <label htmlFor="BMI">BMI</label>
                    <Input
                        type='number'
                        step='0.01'
                        name='BMI'
                        value={formData.BMI}
                        onChange={handleChange}
                        placeholder='BMI'
                        id='BMI'
                    />
                </HStack>
                <HStack>
                    <label htmlFor="DiabetesPedigreeFunction">DiabetesPedigreeFunction</label>
                    <Input
                        type='number'
                        step='0.01'
                        name='DiabetesPedigreeFunction'
                        value={formData.DiabetesPedigreeFunction}
                        onChange={handleChange}
                        placeholder='DiabetesPedigreeFunction'
                        id='DiabetesPedigreeFunction'
                    />
                </HStack>
                <HStack>
                    <label htmlFor="Age">Age</label>
                    <Input
                        type='number'
                        step='0.01'
                        name='Age'
                        value={formData.Age}
                        onChange={handleChange}
                        placeholder='Age'
                        id='Age'
                    />
                </HStack>
                <Button type='submit'>Submit</Button>
            </form>
            {result && (
                <Box>
                    <Text>Result: {result.predictions}</Text>
                    <Text>Accuracy: {result.accuracy}</Text>
                    <Text>{result.message}</Text>
                </Box>
            )}
        </VStack>
    </Box>
  )
}

export default DiabetesFormComponent