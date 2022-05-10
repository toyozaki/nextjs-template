import styled from 'styled-components'

const Title = styled.p`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`

export const Sample01 = () => {
  return (
    <Wrapper>
      <Title>Hello World!</Title>
    </Wrapper>
  )
}

interface ButtonProps {
  primary?: boolean
}

const Button = styled.button<ButtonProps>`
  background: ${props => (props.primary ? 'white' : 'palevioletred')};
  color: ${props => (props.primary ? 'palevioletred' : 'white')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

export const Sample02 = () => {
  return (
    <div>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </div>
  )
}
