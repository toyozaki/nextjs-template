import Image from 'next/image'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'

const queryClient = new QueryClient()

interface RandomFoodishResponse {
  image: string
}

const getRandomFoodish = async () => {
  return fetch('https://foodish-api.herokuapp.com/api/').then(async res => {
    const json = await res.json()
    return Promise.resolve({
      image: json['image'],
    } as RandomFoodishResponse)
  })
}

export function ReactQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <RandomCoffee />
    </QueryClientProvider>
  )
}

function RandomCoffee() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery('randomCoffee', getRandomFoodish)

  //   // Mutations
  //   const mutation = useMutation(postTodo, {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries('todos')
  //     },
  //   })

  if (isLoading) {
    return (
      <div>
        <p>Loading!</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <p>Error!</p>
      </div>
    )
  }

  return (
    <div>
      <Image alt="randomFoodish" src={data?.image!} width={300} height={300} />
    </div>
  )
}
