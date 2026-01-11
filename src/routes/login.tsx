import { createFileRoute } from '@tanstack/react-router'
import { useCoolifyApplicationLogs } from '@/hooks/api/useAuthLogin'
import { useForm } from 'react-hook-form'
import { useLoginStore } from '@/providers/login-provider'

export const Route = createFileRoute('/login')({
    component: LoginComponent,
})

export function LoginComponent() {
    const auth = useCoolifyApplicationLogs()
    const { register, handleSubmit } = useForm()
    const { isLoggedIn, login } = useLoginStore((store) => store)

    console.log('isLoggedIn', isLoggedIn)

    const handleFormSubmit = async ({ username, password }: { username: string, password: string }) => {
        await auth.mutate({ username, password }, {
            onSuccess(data) {
                login({ coolifyId: data.coolifyId })
            },
        })
    }

    const isLoggingIn = false

    return (
        <div className="p-2 grid gap-2 place-items-center">
            <h3 className="text-xl">Login page</h3>
            {/* @ts-expect-error ADD later */}
            <form className="mt-4 max-w-lg" onSubmit={handleSubmit(handleFormSubmit)}>
                <fieldset disabled={isLoggingIn} className="w-full grid gap-2">
                    <div className="grid gap-2 items-center min-w-[300px]">
                        <label htmlFor="username-input" className="text-sm font-medium">
                            Username
                        </label>
                        <input
                            className="border rounded-md p-2 w-full"
                            {...register('username')}
                        />
                    </div>
                    <div className="grid gap-2 items-center min-w-[300px]">
                        <label htmlFor="username-input" className="text-sm font-medium">
                            Password
                        </label>
                        <input
                            className="border rounded-md p-2 w-full"
                            {...register('password')}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500"
                    >
                        {isLoggingIn ? 'Loading...' : 'Login'}
                    </button>
                </fieldset>
            </form>
        </div>
    )
}