import { Envelope, Lock } from 'phosphor-react';
import { Button } from './components/Button/Button';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Heading } from './components/Heading/Heading';
import { Logo } from './components/Logo/Logo';
import { Text } from './components/Text/Text'
import { TextInput } from './components/TextInput/TextInput';
import './styles/global.css';

export function App() {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-100">
      <header className="flex flex-col items-center">
        <Logo />
        <Heading size="lg" className="mt-4">
          Design System Lab
        </Heading>
        <Text size="lg" className="text-gray-400 mt-1">
          Sign-in and start using!
        </Text>
      </header>
      <form className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10">
        <label htmlFor="email" className="flex flex-col gap-3">
          <Text className="font-semibold">E-mail address</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input id="email" type="email" placeholder="Type your email" />
          </TextInput.Root>
        </label>
        <label htmlFor="password" className="flex flex-col gap-3">
          <Text className="font-semibold">Password</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input id="password" type="password" placeholder="********" />
          </TextInput.Root>
        </label>
        <label htmlFor="remember" className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Text size="sm" className="text-gray-200">
            Remember me for 30 days
          </Text>
        </label>
        <Button type="submit" className="mt-4">
          Login to the platform
        </Button>
      </form>
      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text asChild size="sm">
          <a href="#" className="text-gray-400 underline hover:text-gray-200 transition-colors">
            Forgot your password?
          </a>
        </Text>
        <Text asChild size="sm">
          <a href="#" className="text-gray-400 underline hover:text-gray-200 transition-colors">
            Don't have an account? create now
          </a>
        </Text>
      </footer>
    </div>
  )
}