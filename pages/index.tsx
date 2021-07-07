import React from 'react'
import { useForm, SubmitHandler, Path, UseFormRegister, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox'

// Example
interface ExampleInputs {
  example: string
  exampleRequired: string
}

const Example = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExampleInputs>()
  const onSubmit: SubmitHandler<ExampleInputs> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register('example')} />

      <input {...register('exampleRequired', { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}

// Register
enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface RegisterExampleInputs {
  firstName: string
  gender: GenderEnum
}

const RegisterExample = () => {
  const { register, handleSubmit } = useForm<RegisterExampleInputs>()
  const onSubmit: SubmitHandler<RegisterExampleInputs> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register('firstName')} />

      <label>Gender Selection</label>
      <select {...register('gender')}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>

      <input type="submit" />
    </form>
  )
}

// Apply validation
interface ApplyValidationInputs {
  firstName: string
  lastName: string
  age: number
}

const ApplyValidation = () => {
  const { register, handleSubmit } = useForm<ApplyValidationInputs>()
  const onSubmit: SubmitHandler<ApplyValidationInputs> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName', { required: true, maxLength: 20 })} />
      <input {...register('lastName', { pattern: /^[A-za-z]+$/i })} />
      <input type="number" {...(register('age'), { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  )
}

// Integratig an existing form
interface ExistingFormInputs {
  'Fisrt Name': string
  Age: number
}

interface ExistingFormProps {
  label: Path<ExistingFormInputs>
  register: UseFormRegister<ExistingFormInputs>
  required: boolean
}

const ExistingFormInput = ({ label, register, required }: ExistingFormProps) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} />
  </>
)

const ExistingFormSelect = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<ExistingFormInputs>>
>(function SelectWithRef({ onChange, onBlur, name, label }, ref) {
  return (
    <>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </>
  )
})

const IntegratingExistingForm = () => {
  const { register, handleSubmit } = useForm<ExistingFormInputs>()
  const onSubmit: SubmitHandler<ExistingFormInputs> = data => {
    alert(JSON.stringify(data))
  }

  console.log(register('Age'))
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ExistingFormInput label="Fisrt Name" register={register} required />
      <ExistingFormSelect label="Age" {...register('Age')} />
      <input type="submit" />
    </form>
  )
}

// Interagting with UI libraries
interface IntegratingWithMaterialUIInputs {
  firstName: string
  lastName: string
  iceCreamType: { label: string; value: string }
}

const IntegratingWithMaterialUI = () => {
  const { control, handleSubmit } = useForm<IntegratingWithMaterialUIInputs>()
  const onSubmit: SubmitHandler<IntegratingWithMaterialUIInputs> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} />}
      />

      <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />
        )}
      />

      <input type="submit" />
    </form>
  )
}

// Integrating Controlled Inputs
interface IntegratingControlledInputs {
  TextField: string
  MyCheckbox: boolean
}

const IntegratingControlledInputs = () => {
  const { handleSubmit, control, reset } = useForm<IntegratingControlledInputs>()
  const onSubmit: SubmitHandler<IntegratingControlledInputs> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="MyCheckbox"
        control={control}
        defaultValue={true}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />}
      />
      <input type="submit" />
    </form>
  )
}

// Handle errors
interface HandleErrorsInputs {
  firstName: string
  lastName: string
}
const HandleErrors = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<HandleErrorsInputs>()
  const onSubmit: SubmitHandler<HandleErrorsInputs> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName', { required: true })} />
      {errors.firstName && 'First name is required'}

      <input {...register('lastName', { required: true })} />
      {errors.lastName && 'Last name is required'}

      <input type="submit" />
    </form>
  )
}

// Schema validation
interface SchemaValidationInputs {
  firstName: string
  age: number
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
})

const SchemaValidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaValidationInputs>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<SchemaValidationInputs> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} />
      <p>{errors.firstName?.message}</p>

      <input {...register('age')} />
      <p>{errors.age?.message}</p>

      <input type="submit" />
    </form>
  )
}

export default function Home() {
  // return <Example />
  // return <RegisterExample />
  // return <ApplyValidation />
  // return <IntegratingExistingForm />
  // return <IntegratingWithMaterialUI />
  // return <IntegratingControlledInputs />
  // return <HandleErrors />
  return <SchemaValidation />
}
