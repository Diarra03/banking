import React from 'react'
import { Control, FieldPath } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { authFormSchema } from '../../lib/utils'


const formSchema = authFormSchema('sign-up');


interface CustomInput {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder?: string,
  type?: string,
}

const CustomInput = ({ control, name, label, placeholder, type = "text" }: CustomInput) => {
  return (
    <FormField
      control={control}  
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              // Définition du type selon le champ
              type={name === 'password' ? 'password' : type} 
              placeholder={placeholder}
              className="input-class"
              {...field}  
            />
          </FormControl>
          <FormMessage className="form-message mt-2"/>
        </FormItem>
      )}
    />
  )
}

export default CustomInput
